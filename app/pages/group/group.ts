"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-group",
    templateUrl: "pages/group/group.template.html",
    directives: []
})
export class Group {
    userNumber: string;
    constructor() {
        console.log("Group component loaded");
    }
}
