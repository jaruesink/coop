"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = false;
    userNumber: string;
    username: string;
    fullName: string;
    userEmail: string;
    constructor(public router: Router) {
        console.log('Login service is loaded.');
        if (this.isLoggedIn) {
            this.userNumber = '(512) 450-8236';
            this.fullName = 'Jake Ruesink';
            this.username = 'jaruesink';
            this.userEmail = 'jaruesink@gmail.com';
        }
    }
    registerAccount() {
        //to do
    }
    userLogin() {
        this.isLoggedIn = true;
        this.router.navigate(['Home']);
    }
    userLogout() {
        this.isLoggedIn = false;
        this.router.navigate(['Login']);
    }
}
