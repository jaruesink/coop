"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class AccountService {
    me: any = {};
    constructor() {
        console.log('Account service is loaded.');
        this.me.userNumber = '(512) 450-8236';
        this.me.fullName = 'Jake Ruesink';
        this.me.username = 'jaruesink';
        this.me.userEmail = 'jaruesink@gmail.com';
        this.me.photo_url = './images/profile_placeholder.png';
    }
}
