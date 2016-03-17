/// <reference path="../../../typings/custom.d.ts" />
"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {LoginService} from "../../core/services/login-service/login.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {GoogleLoginService} from "../../core/services/login-google-service/login-google.service";


@Component({
    selector: "page-login",
    templateUrl: "pages/login/login.template.html",
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Login {
    FB: any = window.FB;
    goog: any = window.gapi;
    fb_loading: boolean;
    goog_loading: boolean;
    constructor(public loginService: LoginService, public accountService: AccountService, private router: Router, public facebookLoginService: FacebookLoginService, public googleLoginService: GoogleLoginService) {
        console.log("Login component loaded");
        // Check if logged in
        if (this.loginService.isLoggedIn) {
            this.router.navigate(['Home']);
        }
        this.loginService.fb_loading.subscribe((isLoading:any) => {
          if(isLoading) {
              this.fb_loading = true;
          } else {
              this.fb_loading = false;
          }
        });
        this.loginService.goog_loading.subscribe((isLoading:any) => {
          if(isLoading) {
              this.goog_loading = true;
          } else {
              this.goog_loading = false;
          }
        });
    }
    facebookLogin() {
        if ( this.FB ) {
            console.log('loading', this.loginService.fb_loading);
            this.facebookLoginService.loginWithFacebook();
        } else {
          this.router.navigate(['/NotConnected']);
        }
    }
    googleLogin() {
      if ( this.goog ) {
          this.googleLoginService.loginWithGoogle();
      } else {
        this.router.navigate(['/NotConnected']);
      }
    }
}
