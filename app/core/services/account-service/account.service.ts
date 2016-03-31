"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class AccountService {
    me: any = {};
    constructor() {
        console.log('Account service is loaded.');
        // Default User for dev
        this.me.name      = 'Jake Ruesink';
        this.me.username  = 'jaruesink';
        this.me.email     = 'jaruesink@gmail.com';
        this.me.phone     = '(512) 450-8236';
        this.me.photo_url = './images/profile_placeholder.png';
    }
    setUser(name:string, username:string, email:string, phone:string, photo_url?:string) {
        this.me.name      = name;
        this.me.username  = username;
        this.me.email     = email;
        this.me.phone     = phone;
        this.me.photo_url = photo_url;
    }
}
