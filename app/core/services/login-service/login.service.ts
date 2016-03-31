"use strict";

// import Angular 2
import {Injectable, EventEmitter} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {AccountService} from "../account-service/account.service";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = true;
    accountExists: boolean = false;
    fb_loading:  EventEmitter<any> = new EventEmitter();
    goog_loading: EventEmitter<any> = new EventEmitter();
    login_loading: EventEmitter<any> = new EventEmitter();
    register_url: string = 'auth/register';
    login_url: string = 'auth/login';
    loginType: string;
    phone: string;
    username: string;
    name: string;
    email: string;
    bad_login: boolean = false;
    bad_phone: boolean = false;
    constructor(public router: Router) {
        console.log('Login service is loaded.');
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
