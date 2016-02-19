"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";

@Injectable()
export class LoginService {
    isLoggedIn: string = 'string';
    accountExists: boolean =  false;
    userNumber: string;
    username: string;
    fullName: string;
    userEmail: string;
    constructor(private router:Router) {
        console.log('Login service is loaded.');
        if(this.isLoggedIn) {
            this.userNumber = '(512) 450-8236';
            this.fullName = 'Jake Ruesink';
            this.username = 'jaruesink';
            this.userEmail = 'jaruesink@gmail.com';
        }
    }
    checkAccount(userNumber:string) {
        this.userNumber = userNumber;
        if (this.accountExists) {
            this.router.navigate(['/VerifyAccount']);
        } else {
            this.router.navigate(['/VerifyRegistration']);
        }
    }
}
