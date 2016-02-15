"use strict";
// way to create a list all injectable classes

import {AddMembersByPhone} from '../services/addMembersByPhone/addMembersByPhone.service';
import {LoginService} from '../services/loginService/login.service';

export let appServicesInjectables : Array<any> = [
	AddMembersByPhone, LoginService
];

