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
      console.log('Account Request Object: ', accountRequest);
      accountRequest = JSON.stringify(accountRequest);
      console.log('Account Request String: ', accountRequest);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.loginService._postUrl, accountRequest, {
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
