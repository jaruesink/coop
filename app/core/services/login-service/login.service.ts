"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";
import {FacebookLoginService} from "../login-facebook-service/login-facebook.service";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = true;
    accountExists: boolean = false;
    userNumber: string;
    username: string;
    fullName: string;
    userEmail: string;
    constructor(public router: Router, public facebookLoginService: FacebookLoginService) {
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
        //to do 
    }
    userLogout() {
        this.isLoggedIn = false;
        this.router.navigate(['Login']);
    }
}
