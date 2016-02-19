"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "page-home",
    templateUrl: "pages/home/home.template.html",
    directives: [ROUTER_DIRECTIVES, RouterLink]
})
export class Home {
    constructor(private groupService:GroupService) {
        console.log("Home component loaded");
    }
}
