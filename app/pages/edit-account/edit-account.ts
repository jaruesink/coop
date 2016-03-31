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
    name: string;
    phone: string;
    email: string;
    constructor(public accountService:AccountService, private router:Router) {
        console.log("Edit account component loaded");
        this.username = accountService.me.username;
        this.name     = accountService.me.name;
        this.phone    = accountService.me.phone;
        this.email    = accountService.me.email;
        }
    saveProfile() {
        this.accountService.me.username = this.username;
        this.accountService.me.name     = this.name;
        this.accountService.me.phone    = this.phone;
        this.router.navigate(['/Home']);
    }
}
