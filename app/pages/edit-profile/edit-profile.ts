"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";

@Component({
    selector: "page-edit-profile",
    templateUrl: "pages/edit-profile/edit-profile.template.html",
    directives: [ROUTER_DIRECTIVES, PhoneInput]
})
export class EditProfile {
    username: string;
    fullName: string;
    userNumber: string;
    email: string
    constructor(public loginService:LoginService, private router:Router) {
        console.log("Edit profile component loaded");
        this.username = loginService.username;
        this.fullName = loginService.fullName;
        this.userNumber = loginService.userNumber;
        this.email = loginService.userEmail;
        }
    saveProfile() {
        this.loginService.username   = this.username;
        this.loginService.fullName   = this.fullName;
        this.loginService.userNumber = this.userNumber;
        this.router.navigate(['/Home']);
    }
}
