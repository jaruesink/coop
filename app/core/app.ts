///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";

// app pages
import {Register} from "../pages/register/register";
import {Login} from "../pages/login/login";
import {NotConnected} from "../pages/not-connected/not-connected";
import {VerifyRegistration} from "../pages/verify-registration/verify-registration";
import {CreateAccount} from "../pages/create-account/create-account";
import {VerifyAccount} from "../pages/verify-account/verify-account";
import {EditAccount} from "../pages/edit-account/edit-account";
import {Home} from "../pages/home/home";
import {CreateGroup} from "../pages/create-group/create-group";
import {EditGroup} from "../pages/edit-group/edit-group";
import {Group} from "../pages/group/group";
import {Post} from "../pages/post/post";

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
    { path: "/get-started", component: Register, as: "Register", data: undefined, useAsDefault: true},
    { path: "/login", component: Login, as: "Login", data: undefined},
    { path: "/not-connected", component: NotConnected, as: "NotConnected", data: undefined},
    { path: "/verify-registration", component: VerifyRegistration, as: "VerifyRegistration", data: undefined},
    { path: "/create-account", component: CreateAccount, as: "CreateAccount", data: undefined},
    { path: "/verify-account", component: VerifyAccount, as: "VerifyAccount", data: undefined},
    { path: "/edit-account", component: EditAccount, as: "EditAccount", data: undefined},
    { path: "/", component: Home, as: "Home", data: undefined},
    { path: "/create-group", component: CreateGroup, as: "CreateGroup", data: undefined},
    { path: "/edit-group", component: EditGroup, as: "EditGroup", data: undefined},
    { path: "/:group_id", component: Group, as: "Group", data: undefined},
    { path: "/:group_id/:post_id", component: Post, as: "Post", data: undefined}
])
export class App {
    constructor(public loginService:LoginService, public router:Router, private location:Location) {
        console.log("Application bootstrapped!");
        if (!loginService.isLoggedIn) {
            router.navigate(['Register']);
        } else if ( this.location.path() === '/login' || this.location.path() === '/register') {
            router.navigate(['Home']);
        }
    }
}
