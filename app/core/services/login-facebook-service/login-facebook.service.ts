"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    user: any;
    constructor(private router:Router) {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        this.FB.getLoginStatus(function(response: any) {
            if (response.status === 'connected') {
                console.log(response.authResponse.accessToken);
                alert('You are already logged in.');
            } else {
                this.FB.login(function(response: any) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        this.FB.api('/me', function(response: any) {
                            this.user = response;
                            console.log('Good to see you, ' + response.name + '.');
                        });
                        return true;
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                        return false;
                    }
                });
            }
        });
    }
    logoutOfFacebook() {
        this.FB.logout(function(response:any) {
            console.log('You are now logged out.');
        });
    }
    registerWithFacebook() {
        //to do
    }
}
