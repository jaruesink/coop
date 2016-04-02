"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {AccountService} from "../account-service/account.service";
import {ConnectService} from "../connect-service/connect.service";

@Injectable()
export class PasswordLoginService {

    constructor(private router:Router, public loginService:LoginService, private connect: ConnectService, private accountService: AccountService) {
        console.log('Password login service is loaded.');
    }
    login(username: string, password: string) {
        this.loginService.login_loading.emit(true);
        var loginRequest:any = {};
        loginRequest['type'] = 'password';
        loginRequest['username'] = username;
        loginRequest['password'] = password;
        console.log('loginRequest', loginRequest);
        this.connect.post(this.loginService.login_url, loginRequest,
            (response:any) => {
                if (response.auth_token) {
                    this.loginService.bad_login = false;
                    this.loginService.accountExists = true;
                    this.loginService.userLogin('password');
                    this.loginService.login_loading.emit(false);
                }
            },
            (fail:any) => {
                this.loginService.bad_login = true;
            }
        );
    }
    createAccount(name:string, username:string, email:string, phone:string, photo_url:string, password?:string) {
        console.log(this.loginService.loginType);
        var accountRequest:any = {};
        accountRequest['name']        = name;
        accountRequest['username']    = username;
        accountRequest['email']       = email;
        accountRequest['phone']       = phone;
        accountRequest['photo_url']   = photo_url;
        accountRequest['credentials'] = {};
        accountRequest['credentials'].type  = this.loginService.loginType;
        accountRequest['credentials'].username = username;
        accountRequest['credentials'].password = password;
        console.log('accountRequest: ', accountRequest);
        this.connect.post(this.loginService.register_url, accountRequest,
            (response:any) => {
                console.log(response);
                if (response.auth_token) {
                    this.accountService.setUser(name, username, email, phone, photo_url);
                    this.loginService.bad_phone = false;
                    this.loginService.accountExists = true;
                    this.loginService.userLogin('password');
                }
            },
            (fail:any) => {
                console.log(fail);
                if (fail.status === 422) {
                    this.loginService.bad_phone = true;
                }
            }
        );
  }
}
