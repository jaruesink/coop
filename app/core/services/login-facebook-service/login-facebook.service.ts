"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class FacebookLoginService {
    FB: any = window.FB;
    constructor(private router:Router, public loginService:LoginService) {
        console.log('Facebook login service is loaded.');
    }
    loginWithFacebook() {
        var loginService = this.loginService
          this.FB.getLoginStatus(function(response: any) {
              if (response.status === 'connected') {
                console.log('You are already logged in.');
                loginService.userLogin();
                return true;
              } else {
                  if (this.FB) {
                      this.FB.login(function(response: any) {
                          if (response.authResponse) {
                              this.FB.api('/me', function(response: any) {
                                  console.log('You are logged in as: ', response.name);
                                  loginService.userLogin();
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
        if (this.FB.getAccessToken()) {
            this.FB.logout(function(response:any) {
                console.log('You are now logged out.');
            });
        } else {
            console.log('You are already logged out.');
        }
    }
    public registerWithFacebook() {
        //to do
    }
}
