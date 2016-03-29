"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PasswordLoginService {

    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Password login service is loaded.');
    }
    login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var loginRequest:any = {};
        loginRequest['type'] = 'password';
        loginRequest['username'] = username;
        loginRequest['password'] = password;
        console.log('loginRequest', loginRequest);
        this.http.post(this.loginService._loginUrl, JSON.stringify(loginRequest), {
                        headers: headers
                    })
                    .map(response => response.json())
                    .subscribe(
                        // To Do: point this data to a login function and set loginService.isLoggedIn = data.auth_token
                        data => console.log(data),
                        err => console.log(err),
                        () => console.log('Login Request Complete')
                    );
    }
    createAccount(name:string, username:string, email:string, phone:string) {
      console.log(this.loginService.loginType);
      var accountRequest:any = {};
      accountRequest['name']        = name;
      accountRequest['username']    = username;
      accountRequest['email']       = email;
      accountRequest['phone']       = phone;
      accountRequest['photo_url']   = '';
      accountRequest['credentials'] = {};
      accountRequest['credentials'].type  = this.loginService.loginType;
      console.log('accountRequest: ', accountRequest);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.loginService._registerUrl, JSON.stringify(accountRequest), {
                    headers: headers
                    })
                    .map(response => response.json())
                    .subscribe(
                        // To Do: point this data to a login function and set loginService.isLoggedIn = data.auth_token
                        data => console.log(data),
                        err => console.log(err),
                        () => console.log('Account Creation Request Complete')
                    );
  }
}
