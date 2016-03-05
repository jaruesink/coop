"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";


@Component({
    selector: "page-not-connected",
    templateUrl: "pages/not-connected/not-connected.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class NotConnected {
    constructor(private router: Router) {
        console.log("Not connected component loaded");
    }
    goBack()  {
      window.history.back();
    }
}
