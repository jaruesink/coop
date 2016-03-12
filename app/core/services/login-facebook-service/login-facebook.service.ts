"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    status: any;
    facebookLogin: Promise<any>;
    getFacebookInfo: Promise<any>;
    getFacebookStatus: Promise<any>;
    response: any;
    token: string;
    id: string;
    accountRequest: any;
    _postUrl: string = 'http://3cf40ea9.ngrok.com/api/auth/register';
    error: any;
    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        if (this.FB) {
            this.loginService.loginType = 'facebook';
            var facebookLogin = function(respone: any) {
                this.FB.login(function(fbResponse: any) {
                    this.token = fbResponse.authResponse.accessToken;
                    this.id = fbResponse.authResponse.userID;
                    if ( this.token && this.id ) {
                      respone();
                      console.log('You are logged in, your id is: '+ this.id);
                    } else {
                      console.log('Logging in with Facebook failed.');
                    }
                }.bind(this));
            }.bind(this);
            facebookLogin(function() {
              var getFacebookStatus = function(response: any) {
                  this.FB.getLoginStatus(function(fbResponse: any) {
                      this.status = fbResponse.status;
                      if ( this.status === 'connected' ) {
                        response();
                        console.log('I am connected.');
                      } else {
                        console.log('I am not connected.');
                      }
                  }.bind(this));
              }.bind(this);
                getFacebookStatus(function() {
                  var getFacebookInfo = function() {
                      this.FB.api('/me?fields=name,email,id', function(fbResponse: any) {
                          this.loginService.name = fbResponse.name;
                          this.loginService.email = fbResponse.email;
                          console.log('info received: ', fbResponse);
                          if (this.loginService.name && this.loginService.email ) {
                            this.router.navigate(['CreateAccount']);
                            console.log('I have received info.');
                          } else {
                            console.log('I have not received info.');
                          }
                      }.bind(this));
                  }.bind(this);
                  getFacebookInfo();
                }.bind(this));
            }.bind(this));
        } else {
            this.router.navigate(['NotConnected']);
        }
    }
    logoutOfFacebook() {
        if (this.FB) {
            if (this.FB.getAccessToken()) {
                this.FB.logout(function(response:any) {
                    console.log('You are now logged out.');
                });
            } else {
                console.log('You are already logged out.');
            }
        } else {
            this.router.navigate(['NotConnected']);
        }
    }
    createAccountWithFacebook(name:string, username:string, email:string, phone:string) {
        console.log(this.loginService.loginType);
        var accountRequest:any = {};
        accountRequest['name']        = name;
        accountRequest['username']    = username;
        accountRequest['email']       = email;
        accountRequest['phone']       = phone;
        accountRequest['photo_url']    = '';
        accountRequest['credentials'] = {};
        accountRequest['credentials'].type  = this.loginService.loginType;
        accountRequest['credentials'].id    = this.id;
        accountRequest['credentials'].token = this.token;
        console.log('Account Request Object: ', accountRequest);
        accountRequest = JSON.stringify(accountRequest);
        console.log('Account Request String: ', accountRequest);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this._postUrl, accountRequest, {
                    headers: headers
                    })
                    .map(response => response.json())
                    .subscribe(
                        // To Do: point this data to a login function and set loginService.isLoggedIn = data.auth_token
                        data => console.log(data),
                        err => console.log(err),
                        () => console.log('Account Creation Request Complete')
                    );
    }
}
