"use strict";

import {Component, Renderer} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {PhoneInput} from "../../core/commons/phone-input/phone-input";

@Component({
    selector: "page-create-account",
    templateUrl: "pages/create-account/create-account.template.html",
    directives: [ROUTER_DIRECTIVES, PhoneInput]
})
export class CreateAccount {
    FB: any = window.FB;
    username: string;
    fullName: string;
    userNumber: string;
    email: string;
    constructor(public accountService: AccountService, public loginService: LoginService, private router: Router, public facebookLoginService: FacebookLoginService) {
        console.log("Create account component loaded");
        // To Do: Figure out the best way to load user info into the fields here.
        // Future: When we get phone numbers we need to sanitize them to (###) ###-#### and set them to this.userNumber
    }
    createProfile() {
        if (this.loginService.loginType === 'facebook') {
            this.facebookLoginService.createAccountWithFacebook(this.fullName, this.username, this.email, this.userNumber);
        }
    }
}
