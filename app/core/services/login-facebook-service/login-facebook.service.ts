"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    user: any;
    constructor() {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        this.FB.getLoginStatus(function(response: any) {
            if (response.status === 'connected') {
              console.log('You are already logged in.');
              this.userID = response.authResponse.userID;
              return true;
            } else {
                if (this.FB) {
                    this.FB.login(function(response: any) {
                        if (response.authResponse) {
                            this.FB.api('/me', function(response: any) {
                                this.userID = response.id;
                                this.userName = response.name
                                console.log('You are logged in as: ', response.name);
                            });
                            return true;
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                            return false;
                        }
                    });
                }
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
