"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";

@Component({
    selector: "page-create-profile",
    templateUrl: "pages/create-profile/create-profile.template.html",
    directives: [ROUTER_DIRECTIVES, PhoneInput]
})
export class CreateProfile {
    username: string;
    fullName: string;
    userNumber: string;
    constructor(public loginService:LoginService, private router:Router) {
        console.log("Edit profile component loaded");
        this.userNumber = loginService.userNumber;
    }
    saveProfile() {
        this.loginService.username   = this.username;
        this.loginService.fullName   = this.fullName;
        this.loginService.userNumber = this.userNumber;
        this.loginService.isLoggedIn = 'random_token';
        this.router.navigate(['/Home']);
    }
}
