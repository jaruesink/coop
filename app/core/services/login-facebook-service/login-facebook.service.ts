"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    constructor(private router:Router) {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        this.FB.login(function(response: any) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                this.FB.api('/me', function(response: any) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
    logoutOfFacebook() {
        this.FB.logout(function(response:any) {
            console.log('You are now logged out.')
        });
    }
    registerWithFacebook() {
        //to do
    }
}
