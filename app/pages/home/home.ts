"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "page-home",
    templateUrl: "pages/home/home.template.html",
    directives: [PhoneInput, FORM_DIRECTIVES]
})
export class Home {
    constructor(loginService: LoginService) {
        console.log("Home component loaded");
        console.log("user is logged in: ", loginService.isLoggedIn);
    }
}
