"use strict";

import {Component, OnInit, OnDestroy} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "page-verify-account",
    templateUrl: "pages/verify-account/verify-account.template.html",
    directives: []
})
export class VerifyAccount implements OnInit, OnDestroy {
    example_wait: any;
    constructor(public loginService:LoginService, private router:Router) {
        console.log("Check account component loaded");
    }
    ngOnInit() {
        this.example_wait = setTimeout(() => {
            this.router.navigate(['/Home']);
        }, 4000);
    }
    ngOnDestroy() {
        clearTimeout(this.example_wait);
    }
}
