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
    gAuth: any;
    user: any;
    token: string;
    constructor(private router:Router, public loginService:LoginService, public http: Http) {
        console.log('Google login service is loaded.');
    }
    loadAuth(doNext:any) {
        var load = new Promise((resolve:any, reject:any) =>  {
            this.goog.load('auth2', () => {
                this.gAuth = this.goog.auth2.init({
                    client_id: '460438236970-uecf0olbtirtp55r10a4cuev2ntiuep7.apps.googleusercontent.com',
                    scope: 'profile email'
                });
                if (this.gAuth) {
                    resolve('I have received info.');
                } else {
                    reject(Error('I have not received info.'));
                }
            });
        });
        load.then((get_load_success) => {
            console.log(get_load_success);
            doNext();
        }, function(get_load_error){
            console.log(get_load_error);
        });
    }
    getUser() {
        this.loadAuth(() => {
            this.gAuth.signIn().then((response:any) => {
              this.user  = response.getBasicProfile();
              this.token = response.getAuthResponse().id_token;;
              console.log(this.user);
              console.log(this.token);
            });
        });
    }
    loginWithGoogle() {
        this.getUser();
    }
}
