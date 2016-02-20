///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";

// app pages
import {Login} from "../pages/login/login";
import {VerifyRegistration} from "../pages/verify-registration/verify-registration";
import {CreateAccount} from "../pages/create-account/create-account";
import {VerifyAccount} from "../pages/verify-account/verify-account";
import {EditAccount} from "../pages/edit-account/edit-account";
import {Home} from "../pages/home/home";
import {CreateGroup} from "../pages/create-group/create-group";

// app modules
import {AppHeader} from "../modules/app-header/app-header";

// app services
import {appServicesInjectables} from "../core/services/services";
import {LoginService} from "../core/services/login-service/login.service";

@Component({
    selector: "app",
    templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
    directives: [RouterOutlet, RouterLink, AppHeader]
})
@RouteConfig([
    { path: "/login", component: Login, as: "Login", data: undefined, useAsDefault: true },
    { path: "/verify-registration", component: VerifyRegistration, as: "VerifyRegistration", data: undefined },
    { path: "/create-account", component: CreateAccount, as: "CreateAccount", data: undefined },
    { path: "/verify-account", component: VerifyAccount, as: "VerifyAccount", data: undefined },
    { path: "/", component: Home, as: "Home", data: undefined },
    { path: "/create-group", component: CreateGroup, as: "CreateGroup", data: undefined },
    { path: "/edit-account", component: EditAccount, as: "EditAccount", data: undefined}
])
export class App {
    constructor(loginService:LoginService, router:Router, private location:Location) {
        console.log("Application bootstrapped!");
        if (!loginService.isLoggedIn) {
            router.navigate(['/Login']);
        } else if ( this.location.path() === '/login') {
            router.navigate(['/Home']);
        }
    }
}
