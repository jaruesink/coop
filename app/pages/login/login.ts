/// <reference path="../../../typings/browser.d.ts" />
"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {LoginService} from "../../core/services/login-service/login.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";


@Component({
    selector: "page-login",
    templateUrl: "pages/login/login.template.html",
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Login{
    window: any;
    constructor(public loginService: LoginService, private router: Router, public facebookLoginService: FacebookLoginService) {
        console.log("Login component loaded");
    }
    facebookLogin() {
        this.facebookLoginService.loginWithFacebook();
    }
    facebookLogout() {
        this.facebookLoginService.logoutOfFacebook();
    }
}
