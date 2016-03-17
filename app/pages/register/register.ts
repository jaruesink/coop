"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {LoginService} from "../../core/services/login-service/login.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {GoogleLoginService} from "../../core/services/login-google-service/login-google.service";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

@Component({
    selector: "page-register",
    templateUrl: "pages/register/register.template.html",
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Register {
    FB: any = window.FB;
    goog: any = window.gapi;
    fb_loading: boolean = false;
    goog_loading: boolean = false;
    username_form: ControlGroup;
    username: Control;
    form_submitted: boolean = false;
    constructor(public loginService:LoginService, private router:Router, private builder: FormBuilder, public facebookLoginService: FacebookLoginService, public googleLoginService: GoogleLoginService) {
        console.log("Register component loaded");
        
        this.username = new Control('',
          Validators.compose([
            Validators.required, 
            Validators.minLength(4), 
            Validators.maxLength(16)
          ])
        );
        this.username_form = builder.group({
          username: this.username
        });
        
        this.loginService.fb_loading.subscribe((isLoading:any) => {
          if(isLoading) {
              this.fb_loading = true;
          } else {
              this.fb_loading = false;
          }
        });
        this.loginService.goog_loading.subscribe((isLoading:any) => {
          if(isLoading) {
              this.goog_loading = true;
          } else {
              this.goog_loading = false;
          }
        });
    }
    checkUsername(username:string) {
      this.form_submitted = true;
      var username_exists = true;
      if ( username_exists ) {
        this.loginService.username = this.username_form.value.username;
        this.loginService.loginType = 'password';
        this.router.navigate(['CreateAccount']);
      }
    }
    facebookLogin() {
        if ( this.FB ) {
            this.facebookLoginService.loginWithFacebook();
        } else {
          this.router.navigate(['/NotConnected']);
        }
    }
    googleLogin() {
      if ( this.goog ) {
          this.googleLoginService.loginWithGoogle();
      } else {
        this.router.navigate(['/NotConnected']);
      }
    }
}
