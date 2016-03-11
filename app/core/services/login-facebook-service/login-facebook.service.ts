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
    status$: Observable<any>;
    login$: Observable<any>;
    info$: Observable<any>;
    promise$: any;
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
    checkFacebookLoginStatus() {
        if (this.FB) {
            var loginService = this.loginService;
            this.FB.getLoginStatus( (response:any) => {
                this.status$ = new Observable( (observer:any) => {
                    observer.next( response );
                });
                this.status$.subscribe(value => console.log(value));
            });
        } else {
            this.router.navigate(['NotConnected']);
        }
    }
    loginWithFacebook() {
        if (this.FB) {
            this.loginService.loginType = 'facebook';
            this.FB.login( (response:any) => {
                this.token = response.authResponse.accessToken;
                console.log(response);
                this.id = response.authResponse.userID;
                if (this.loginService.accountExists) {
                    this.router.navigate(['Home']);
                } else {
                    this.FB.api('/me?fields=name,email,id', (response: any) => {
                        // this.promise$ = new Promise( (resolve:any) => {
                        //     resolve(response);
                        // });
                        this.info$ = new Observable( (observer:any) => {
                            observer.next( response );
                        });
                        console.log('api info', response);
                        this.router.navigate(['CreateAccount']);
                    });
                }
            });
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
