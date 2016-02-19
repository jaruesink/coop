"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class AccountService {
    userNumber: string;
    username: string;
    fullName: string;
    userEmail: string;
    constructor() {
        console.log('Account service is loaded.');
        this.userNumber = '(512) 450-8236';
        this.fullName = 'Jake Ruesink';
        this.username = 'jaruesink';
        this.userEmail = 'jaruesink@gmail.com';
    }
}
