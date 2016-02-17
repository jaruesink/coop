"use strict";

import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../core/services/login-service/login.service";

@Component({
    selector: "app-header",
    templateUrl: "modules/app-header/app-header.template.html",
    directives: []
})
export class AppHeader {
    constructor(loginService:LoginService, router:Router) {
     
    }
}
