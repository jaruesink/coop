"use strict";

import {Component}  from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {FacebookLoginService} from "../../core/services/login-facebook-service/login-facebook.service";
import {GoogleLoginService} from "../../core/services/login-google-service/login-google.service";

@Component({
    selector: "page-create-account",
    templateUrl: "pages/create-account/create-account.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class CreateAccount {
    FB: any = window.FB;
    create_account_form: ControlGroup;
    username: Control;
    name: Control;
    phonenumber: Control;
    email: Control;
    password: Control;
    password_verification: Control;
    constructor(public accountService: AccountService, public loginService: LoginService, private router: Router, private builder: FormBuilder, public facebookLoginService: FacebookLoginService, public googleLoginService: GoogleLoginService) {
        console.log("Create account component loaded");
        if ( this.loginService.loginType ) {
          this.name = new Control(this.loginService.name, Validators.compose([Validators.required]));
          this.email = new Control(this.loginService.email, Validators.compose([Validators.required]));
          this.phonenumber = new Control(this.loginService.phonenumber, Validators.compose([Validators.required]));
          this.username = new Control(this.loginService.username, Validators.compose([Validators.required]));
          if ( this.loginService.loginType === 'password' ) {
            this.password = new Control('', Validators.compose([Validators.required]));
            this.password_verification = new Control('', Validators.compose([Validators.required]));
          }
          this.create_account_form = builder.group({
            name:        this.name,
            email:       this.email,
            phonenumber: this.phonenumber,
            username:    this.username,
            password:    this.password,
            password_verification: this.password_verification
          });
        } else {
            this.router.navigate(['Login']);
        }
        // Future: When we get phone numbers we need to sanitize them to (###) ###-#### and set them to this.userNumber
    }
    ngOnInit() {
        console.log('testing');
    }
    createAccount() {
        if (this.loginService.loginType === 'facebook') {
            this.facebookLoginService.createAccountWithFacebook(this.create_account_form.value.name, this.create_account_form.value.username, this.create_account_form.value.email, this.create_account_form.value.phonenumber);
        }
        if (this.loginService.loginType === 'google') {
            this.googleLoginService.createAccountWithGoogle(this.create_account_form.value.name, this.create_account_form.value.username, this.create_account_form.value.email, this.create_account_form.value.phonenumber);
        }
    }
}
