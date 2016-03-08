"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    response: any;
    token: string;
    name: string;
    id: string;
    constructor(private router:Router, public loginService:LoginService) {
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
            this.FB.api('/me', (response: any) => {
                console.log('You are logged in as: ');
                this.name = response.name;
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
    registerWithFacebook() {
        //to do
    }
}
