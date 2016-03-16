"use strict";

import {Component}  from "angular2/core";
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
    name: string;
    phonenumber: string;
    email: string;
    constructor(public accountService: AccountService, public loginService: LoginService, private router: Router, public facebookLoginService: FacebookLoginService) {
        console.log("Create account component loaded");
        if ( this.loginService.loginType ) {
            this.name  = this.loginService.name;
            this.email = this.loginService.email;
        } else {
            this.router.navigate(['Login']);
        }
        // Future: When we get phone numbers we need to sanitize them to (###) ###-#### and set them to this.userNumber
    }
    ngOnInit() {
        console.log('testing');
    }
    createProfile() {
        if (this.loginService.loginType === 'facebook') {
            this.facebookLoginService.createAccountWithFacebook(this.name, this.username, this.email, this.phonenumber);
        }
    }
}
