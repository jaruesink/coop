"use strict";

// import Angular 2
import {Injectable, Inject} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";
import {LoginService} from "../login-service/login.service";
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleLoginService {
    goog: any = window.gapi;
    user: any;
    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Google login service is loaded.');
    }
    getUser(doNext:any) {
      if (this.goog) {
        this.goog.signIn().then(() => {
          this.user = this.goog.currentUser;
          doNext();
        });
      } else {
        this.router.navigate(['NotConnected']);
      }
    }
    getToken() {
      if (this.user) {
        this.user.getAuthResponse().id_token;
      } else {
        this.getUser(() => {
          this.getToken();
        })
      }
    }

}
