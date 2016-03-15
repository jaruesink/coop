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
    token: string;
    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Google login service is loaded.');
    }

    getUser(doNext:any) {
      if (this.goog) {
        this.goog.load('auth2', () => {
          this.goog.auth2.init({
            client_id: '460438236970-uecf0olbtirtp55r10a4cuev2ntiuep7.apps.googleusercontent.com',
            scope: 'profile email'
          }).then(() => {
            this.goog.signIn().then(() => {
              this.user = this.goog.currentUser;
              doNext();
            });
          });
        });
      } else {
        this.router.navigate(['NotConnected']);
      }
    }
    getToken() {
      if (this.user) {
        this.token = this.user.getAuthResponse().id_token;
        console.log('Your Google token is: ', this.token);
      } else {
        this.getUser(() => {
          this.getToken();
        });
      }
    }

}
