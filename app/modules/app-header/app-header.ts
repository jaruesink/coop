"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";

@Component({
    selector: "app-header",
    templateUrl: "modules/app-header/app-header.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class AppHeader {
    constructor(public loginService:LoginService, router:Router) {
        return;
    }
}