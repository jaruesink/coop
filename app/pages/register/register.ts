"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";
import {LoginService} from "../../core/services/login-service/login.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-register",
    templateUrl: "pages/register/register.template.html",
    directives: [PhoneInput, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register {
    FB: any = window.FB;
    userNumber: string;
    constructor(public loginService:LoginService, private router:Router, public facebookLoginService: FacebookLoginService) {
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
}
