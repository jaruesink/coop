"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {ConnectService} from "../connect-service/connect.service";

@Injectable()
export class PasswordLoginService {

    constructor(private router:Router, public loginService:LoginService, private connect: ConnectService) {
        console.log('Password login service is loaded.');
    }
    login(username: string, password: string) {
        var loginRequest:any = {};
        loginRequest['type'] = 'password';
        loginRequest['username'] = username;
        loginRequest['password'] = password;
        console.log('loginRequest', loginRequest);
        this.connect.post(this.loginService.login_url, loginRequest,
            (response:any) => {
                if (response.auth_token) {
                    this.loginService.bad_login = false;
                }
            },
            (fail:any) => {
                this.loginService.bad_login = true;
            }
        );
    }
    createAccount(name:string, username:string, email:string, phone:string, password?:string) {
        console.log(this.loginService.loginType);
        var accountRequest:any = {};
        accountRequest['name']        = name;
        accountRequest['username']    = username;
        accountRequest['email']       = email;
        accountRequest['phone']       = phone;
        accountRequest['photo_url']   = '';
        accountRequest['credentials'] = {};
        accountRequest['credentials'].type  = this.loginService.loginType;
        accountRequest['credentials'].username = username;
        accountRequest['credentials'].password = password;
        console.log('accountRequest: ', accountRequest);
        this.connect.post(this.loginService.register_url, accountRequest,
            (response:any) => {
                console.log(response);
                if (response.auth_token) {
                    this.login(username, password);
                }
            }
        );
  }
}
