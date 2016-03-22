"use strict";

import {Component}  from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {LoginService} from "../../core/services/login-service/login.service";
import {AccountService} from "../../core/services/account-service/account.service";
import {FacebookLoginService} from "../../core/services/login-service/login-facebook.service";
import {GoogleLoginService} from "../../core/services/login-service/login-google.service";
import {PasswordLoginService} from "../../core/services/login-service/login-password.service";

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
    passwordMatchError: boolean = false;
    constructor(public accountService: AccountService, public loginService: LoginService, private router: Router, private builder: FormBuilder, public facebookLoginService: FacebookLoginService, public googleLoginService: GoogleLoginService, public passwordLoginService: PasswordLoginService) {
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
    }
    ngOnInit() {
        console.log('testing');
    }
    createAccount() {
        var phonenumber = this.sanitizePhonenumber(this.create_account_form.value.phonenumber);
        if (this.loginService.loginType === 'facebook') {
            this.facebookLoginService.createAccountWithFacebook(this.create_account_form.value.name, this.create_account_form.value.username, this.create_account_form.value.email, phonenumber);
        }
        if (this.loginService.loginType === 'google') {
            this.googleLoginService.createAccountWithGoogle(this.create_account_form.value.name, this.create_account_form.value.username, this.create_account_form.value.email, phonenumber);
        }
        if (this.loginService.loginType === 'password') {
            if (this.passwordsMatch()) {
                this.passwordLoginService.createAccount(this.create_account_form.value.name, this.create_account_form.value.username, this.create_account_form.value.email, phonenumber);
            } else {
                this.passwordMatchError = true;
            }
        }
    }
    sanitizePhonenumber(phonenumber:any) {
        phonenumber.replace(/[\D]/g, '');
        if ( phonenumber.length === 10 ) {
            return phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        } else if ( phonenumber.length === 11 ) {
            return phonenumber.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
        } else if ( phonenumber.length === 12 ) {
            return phonenumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
        } else if ( phonenumber.length === 13 ) {
            return phonenumber.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
        } else if ( phonenumber.length === 14 ) {
            return phonenumber.replace(/(\d{4})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
        } else if ( phonenumber.length === 15 ) {
            return phonenumber.replace(/(\d{5})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
        } else {
            return 'phonenumber error';
        }
    }
    passwordsMatch() {
        if (this.create_account_form.value.password === this.create_account_form.value.password_verification) {
            this.passwordMatchError = false;
            return true;
        } else {
            this.passwordMatchError = true;
            return false;
        }
    }
}
