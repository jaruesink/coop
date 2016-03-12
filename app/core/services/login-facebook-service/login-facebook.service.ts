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
    name: string;
    email: string;
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
            this.facebookLogin = new Promise((resolve:any, reject:any) => {
                this.FB.login( (response:any) => {
                    this.token = response.authResponse.accessToken;
                    this.id = response.authResponse.userID;
                    if ( this.token && this.id ) {
                        resolve('You are logged in, your id is: '+ this.id);
                    } else {
                        reject(Error('Logging in with Facebook failed.'));
                    }
                });
            })
            this.getFacebookStatus = new Promise((resolve:any, reject:any) => {
                this.FB.getLoginStatus( (response:any) => {
                    this.status = response.status;
                    if (response.status === 'connected') {
                        resolve('You are now connected.');
                    } else {
                        reject(Error('You are not connected.'));
                    }
                });
            });
            this.getFacebookInfo = new Promise((resolve:any, reject:any) => {
                this.FB.api('/me?fields=name,email,id', (response:any) => {
                    console.log('response from FB api ', response);
                    this.name = response.name;
                    this.email = response.email;
                    if ( this.name && this.email ) {
                        resolve('Facebook info retrieved.');
                    } else {
                        reject(Error('Failed to retrieve the facebook info.'));
                    }
                });
            });
            this.facebookLogin.then((login_success:any) => {
                console.log(login_success);
                this.FB.getLoginStatus( (response:any) => {
                    console.log('login status response', response);
                    this.getFacebookInfo.then((get_info_success:any) => {
                        console.log(get_info_success);
                        this.router.navigate(['CreateAccount']);
                    }, function(get_info_error:any){
                        console.log(get_info_error);
                    })
                });
            }, function(login_error:any){
                console.log(login_error);
            })
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
