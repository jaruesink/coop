"use strict";
// way to create a list all injectable classes

import {LoginService} from '../services/login-service/login.service';
import {FacebookLoginService} from '../services/login-facebook-service/login-facebook.service';
import {GoogleLoginService} from '../services/login-google-service/login-google.service';
import {AccountService} from '../services/account-service/account.service';
import {GroupService} from '../services/group-service/group.service';

export let appServicesInjectables : Array<any> = [
	LoginService, AccountService, GroupService, FacebookLoginService, GoogleLoginService
];
