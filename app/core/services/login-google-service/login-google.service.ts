"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleLoginService {
    goog: any = window.gapi;
    gAuth: any;
    user: any;
    id: string;
    token: string;
    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Google login service is loaded.');
    }
    loadAuth(doNext:any) {
        var load = new Promise((resolve:any, reject:any) =>  {
            if (this.gAuth) {
                this.gAuth = this.goog.auth2.getAuthInstance();
            } else {
                this.goog.load('auth2', () => {
                    this.gAuth = this.goog.auth2.init({
                        client_id: '460438236970-uecf0olbtirtp55r10a4cuev2ntiuep7.apps.googleusercontent.com',
                        scope: 'profile email'
                    });
                    if (this.gAuth) {
                        resolve('I have received info.');
                    } else {
                        reject(Error('I have not received info.'));
                    }
                });
            }
        });
        load.then((get_load_success) => {
            console.log(get_load_success);
            doNext();
        }, function(get_load_error){
            console.log(get_load_error);
        });
    }
    getUser(doNext:any) {
        var user = new Promise((resolve:any, reject:any) =>  {
            if (this.gAuth) {
                console.log('Already logged into Google');
                if (this.user && this.token) {
                    resolve('I have logged into Google.');
                } else {
                    reject(Error('I have not logged into Google.'));
                }
            } else {
                this.loadAuth(() => {
                    this.gAuth.signIn().then((response:any) => {
                        console.log('logged into Google, ', response);
                        this.user  = response.getBasicProfile();
                        this.token = response.getAuthResponse().id_token;;
                        this.id    = this.user.getId();
                        this.loginService.name = this.user.getName();
                        this.loginService.email = this.user.getEmail();
                        if (this.user && this.token) {
                            resolve('I have logged into Google.');
                        } else {
                            reject(Error('I have not logged into Google.'));
                        }
                    });
                });
            }

        });
        user.then((get_user_success:any) => {
            console.log(get_user_success);
            doNext();
        }, function(get_user_error:any){
            console.log(get_user_error);
        });
    }
    loginWithGoogle() {
        this.getUser(() => {
            this.loginService.userLogin('google');
        });
    }

    createAccountWithGoogle(name:string, username:string, email:string, phone:string) {
      console.log(this.loginService.loginType);
      var accountRequest:any = {};
      accountRequest['name']        = name;
      accountRequest['username']    = username;
      accountRequest['email']       = email;
      accountRequest['phone']       = phone;
      accountRequest['photo_url']   = '';
      accountRequest['credentials'] = {};
      accountRequest['credentials'].type  = this.loginService.loginType;
      accountRequest['credentials'].id    = this.id;
      accountRequest['credentials'].token = this.token;
      console.log('Account Request Object: ', accountRequest);
      accountRequest = JSON.stringify(accountRequest);
      console.log('Account Request String: ', accountRequest);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.loginService._postUrl, accountRequest, {
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
