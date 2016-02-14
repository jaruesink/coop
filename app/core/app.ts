///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

// app components
import {Login} from "../pages/login/login";

// app services
//import {appServicesInjectables} from "core/services/services";

@Component({
	selector: "app",
	templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
	directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
	{ path: "/", component: Login, as: "Login", data: undefined } // the as serves as alias for links, etc
])
export class App {
	constructor() {
		console.log("Application bootstrapped!");
	}
}

