"use strict";

import {Component, Renderer} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";

@Component({
    selector: "page-create-account",
    templateUrl: "pages/create-account/create-account.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class CreateAccount {
    FB: any = window.FB;
    username: string;
    fullName: string;
    userNumber: string;
    email: string;
    constructor(public accountService: AccountService, public loginService: LoginService, private router: Router, public facebookLoginService: FacebookLoginService) {
        console.log("Create account component loaded");
        var info = this.facebookLoginService.getInfo();
        console.log(info);
        //how do I get info to be an object returned by this.facebookLoginService.getInfo();
    }
    saveProfile() {
        this.accountService.username   = this.username;
        this.accountService.fullName   = this.fullName;
        this.accountService.userEmail = this.email;
        this.accountService.userNumber = this.userNumber;
        this.router.navigate(['/Home']);
    }
}
