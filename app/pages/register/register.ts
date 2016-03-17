"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {LoginService} from "../../core/services/login-service/login.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {GoogleLoginService} from "../../core/services/login-google-service/login-google.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-register",
    templateUrl: "pages/register/register.template.html",
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register {
    FB: any = window.FB;
    goog: any = window.gapi;
    userNumber: string;
    constructor(public loginService:LoginService, private router:Router, public facebookLoginService: FacebookLoginService, public googleLoginService: GoogleLoginService) {
        console.log("Register component loaded");
    }
    facebookLogin() {
        if ( this.FB ) {
            this.facebookLoginService.loginWithFacebook();
        } else {
          // not connected to internet
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
