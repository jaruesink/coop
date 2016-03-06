"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";
import {LoginService} from "../../core/services/login-service/login.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-register",
    templateUrl: "pages/register/register.template.html",
    directives: [PhoneInput, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register {
    userNumber: string;
    constructor(public loginService:LoginService, private router:Router) {
        console.log("Register component loaded");
    }
}
