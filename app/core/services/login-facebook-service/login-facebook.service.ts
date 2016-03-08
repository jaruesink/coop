"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
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
            var loginService = this.loginService;
            this.FB.getLoginStatus( (response: any) => {
                if (response.status === 'connected') {
                    console.log('You are already logged in.');
                    loginService.userLogin('facebook');
                    this.response = response;
                } else {
                    this.FB.login( (response: any) => {
                        if (response.authResponse) {
                            loginService.userLogin('facebook');
                            this.response = response;
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {scope: 'public_profile, email'});
                }
            });
            // Store info in service
            this.token = this.response.authResponse.accessToken;
            this.FB.api('/me?fields=name,email,id', (response: any) => {
                console.log('You are logged in as: ');
                this.name = response.name;
                this.email = response.email;
                this.id = response.id;
                console.log(JSON.stringify(response));
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
