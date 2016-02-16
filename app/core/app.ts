"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

// app components
import {Login} from "../pages/login/login";
import {VerifyRegistration} from "../pages/verify-registration/verify-registration";
import {EditProfile} from "../pages/edit-profile/edit-profile";
import {Home} from "../pages/home/home";

// app services
import {appServicesInjectables} from "../core/services/services";
import {LoginService} from "../core/services/login-service/login.service";

@Component({
    selector: "app",
    templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    { path: "/", component: Login, as: "Login", data: undefined, useAsDefault: true },
    { path: "/verify-registration", component: VerifyRegistration, as: "VerifyRegistration", data: undefined },
    { path: "/home", component: Home, as: "Home", data: undefined },
    { path: "/edit-profile", component: EditProfile, as: "EditProfile", data: undefined}
])
export class App {
    constructor(loginService:LoginService, router:Router) {
        console.log("Application bootstrapped!");
        if (loginService.isLoggedIn) {
            router.navigate(['/Home']);
        } else {
            router.navigate(['/Login']);
        }
    }
}
