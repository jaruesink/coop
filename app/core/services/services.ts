"use strict";
// way to create a list all injectable classes

import {ConnectService } from '../services/connect-service/connect.service';
import {LoginService} from '../services/login-service/login.service';
import {FacebookLoginService} from '../services/login-service/login-facebook.service';
import {GoogleLoginService} from '../services/login-service/login-google.service';
import {PasswordLoginService} from '../services/login-service/login-password.service';
import {AccountService} from '../services/account-service/account.service';
import {GroupService} from '../services/group-service/group.service';

export let appServicesInjectables : Array<any> = [
	ConnectService, LoginService, AccountService, GroupService, FacebookLoginService, GoogleLoginService, PasswordLoginService
];
