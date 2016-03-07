"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    public userInfo: any;
    constructor(private router:Router, public loginService:LoginService) {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        if (this.FB) {
        var loginService = this.loginService;
          this.FB.getLoginStatus(function(response: any) {
              if (response.status === 'connected') {
                console.log('You are already logged in.');
                loginService.userLogin('fb');
              } else {
                  this.FB.login(function(response: any) {
                      if (response.authResponse) {
                          loginService.userLogin('fb');
                      } else {
                          console.log('User cancelled login or did not fully authorize.');
                      }
                  }, {scope: 'public_profile, email'});
              }
            });
        } else {
            this.router.navigate(['NotConnected']);
        }
    }
    getInfo(sendInfo: any) {
        if (this.FB) {
            this.FB.api('/me', (response: any) => {
                console.log('You are logged in as: ');
                console.log(JSON.stringify(response));
                this.userInfo = response;
                sendInfo(this.userInfo);
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
