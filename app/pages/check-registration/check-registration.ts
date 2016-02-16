"use strict";

import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "page-check-registration",
    templateUrl: "pages/check-registration/check-registration.template.html",
    directives: []
})
export class CheckRegistration {
    constructor(loginService:LoginService, private router:Router) {
        console.log("Check registration component loaded");
    }
    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/Home']);
        }, 4000);
    }
}
