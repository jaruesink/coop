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
    response: any;
    token: string;
    id: string;
    account_request: any;
    _postUrl: string = 'http://3cf40ea9.ngrok.com/api/auth/register';
    error: any;

    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Facebook login service is loaded.');
    }

    getStatus(doNext:any, onFail?:any) {
      var status = new Promise((resolve:any, reject:any) => {
          this.FB.getLoginStatus((response:any) => {
              this.status = response.status;
              if ( this.status === 'connected' ) {
                  resolve('I am connected.');
              } else {
                  reject(Error('I am not connected.'));
                  this.loginService.fb_loading = false;
              }
          });
      });
      status.then((connected_success:any) => {
          console.log(connected_success);
          doNext();
      }, (connected_error:any) => {
          onFail();
          console.log(connected_error);
          this.loginService.fb_loading = false;
      });
    }

    getInfo(doNext:any) {
      var info = new Promise((resolve:any, reject:any) =>  {
          this.FB.api('/me?fields=name,email,id', (response:any) => {
              this.loginService.name = response.name;
              this.loginService.email = response.email;
              console.log('info received: ', response);
              if (this.loginService.name && this.loginService.email ) {
                  resolve('I have received info.');
              } else {
                  reject(Error('I have not received info.'));
                  this.loginService.fb_loading = false;
              }
          });
      });
      info.then((get_info_success) => {
          console.log(get_info_success);
          doNext();
      }, (get_info_error) => {
          console.log(get_info_error);
          this.loginService.fb_loading = false;
      });
    }

    loginWithFacebook() {
      this.getStatus(() => {
        // Connected
        this.getInfo( () => {
            this.loginService.userLogin('facebook');
        });
      }, () => {
        // Not Connected
        var facebookLogin = new Promise((resolve:any, reject:any) => {
            this.FB.login( (response:any) => {
                if ( response.authResponse.accessToken && response.authResponse.userID ) {
                  this.token = response.authResponse.accessToken;
                  this.id = response.authResponse.userID;
                  resolve('You are logged in, your id is: '+ this.id);
                } else {
                  reject(Error('Logging in with Facebook failed.'));
                }
            });
        });
        facebookLogin.then((login_success:any) => {
            console.log(login_success);
            this.loginWithFacebook();
        }, (login_error:any) => {
            console.log(login_error);
        });
      });
    }

    createAccountWithFacebook(name:string, username:string, email:string, phone:string) {
      console.log(this.loginService.loginType);
      var account_request:any = {};
      account_request['name']        = name;
      account_request['username']    = username;
      account_request['email']       = email;
      account_request['phone']       = phone;
      account_request['photo_url']    = '';
      account_request['credentials'] = {};
      account_request['credentials'].type  = this.loginService.loginType;
      account_request['credentials'].id    = this.id;
      account_request['credentials'].token = this.token;
      console.log('Account Request Object: ', account_request);
      account_request = JSON.stringify(account_request);
      console.log('Account Request String: ', account_request);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this._postUrl, account_request, {
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
