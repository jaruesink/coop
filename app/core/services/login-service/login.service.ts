"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = false;
    accountExists: boolean = false;
    loginType: string;
    phonenumber: string;
    username: string;
    name: string;
    email: string;
    constructor(public router: Router) {
        console.log('Login service is loaded.');
        if (this.isLoggedIn) {
            this.phonenumber = '(512) 450-8236';
            this.name = 'Jake Ruesink';
            this.username = 'jaruesink';
            this.email = 'jaruesink@gmail.com';
        }
    }
    userLogin(type:string) {
        this.loginType = type;
        if ( this.accountExists ) {
            this.isLoggedIn = true;
            this.router.navigate(['Home']);
        } else {
            this.router.navigate(['CreateAccount']);
        }
    }
    userLogout() {
        this.isLoggedIn = false;
        this.router.navigate(['Login']);
    }
}
