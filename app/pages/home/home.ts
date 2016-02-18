"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "page-home",
    templateUrl: "pages/home/home.template.html",
    directives: [PhoneInput, ROUTER_DIRECTIVES]
})
export class Home {
    constructor(public loginService: LoginService, private router:Router) {
        console.log("Home component loaded");
        console.log("user is logged in: ", loginService.isLoggedIn);
        console.log('this_route = ', this.router.hostComponent.name)
    }
}
