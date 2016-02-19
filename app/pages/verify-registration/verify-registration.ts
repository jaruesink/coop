"use strict";

import {Component, OnInit, OnDestroy} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "page-verify-registration",
    templateUrl: "pages/verify-registration/verify-registration.template.html",
    directives: []
})
export class VerifyRegistration implements OnInit, OnDestroy {
    example_wait: any;
    constructor(public loginService:LoginService, private router:Router) {
        console.log("Check registration component loaded");
    }
    ngOnInit() {
        this.example_wait = setTimeout(() => {
            this.router.navigate(['/CreateAccount']);
        }, 4000);
    }
    ngOnDestroy() {
        clearTimeout(this.example_wait);
    }
}
