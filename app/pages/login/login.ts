"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {PhoneInput} from "../../core/commons/phoneInput/phoneInput";
import {LoginService} from "../../core/services/loginService/login.service";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-login",
    templateUrl: "pages/login/login.template.html",
    directives: [PhoneInput, FORM_DIRECTIVES]
})
export class Login {
    constructor(public loginService: LoginService) {
        console.log("Login component loaded");
        console.log("user is logged in: ", loginService.isLoggedIn);
    }
    userLogin() {
        console.log('hello');
    }
}
