"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

// app services
//import {appServicesInjectables} from "core/services/services";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = false;
    accountExists: boolean = false;
    constructor(private router:Router) {
        console.log('Login service is loaded.');
    }
    checkAccount() {
        if (this.accountExists) {
            this.router.navigate(['/LoginLink']);
        } else {
            this.router.navigate(['/RegisterLink']);
        }
    }
}
