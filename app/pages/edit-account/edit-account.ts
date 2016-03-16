"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AccountService} from "../../core/services/account-service/account.service";

@Component({
    selector: "page-edit-account",
    templateUrl: "pages/edit-account/edit-account.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class EditAccount {
    username: string;
    fullName: string;
    userNumber: string;
    email: string;
    constructor(public accountService:AccountService, private router:Router) {
        console.log("Edit account component loaded");
        this.username = accountService.username;
        this.fullName = accountService.fullName;
        this.userNumber = accountService.userNumber;
        this.email = accountService.userEmail;
        }
    saveProfile() {
        this.accountService.username   = this.username;
        this.accountService.fullName   = this.fullName;
        this.accountService.userNumber = this.userNumber;
        this.router.navigate(['/Home']);
    }
}
