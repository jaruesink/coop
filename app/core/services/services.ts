"use strict";
// way to create a list all injectable classes

import {LoginService} from '../services/login-service/login.service';

export let appServicesInjectables : Array<any> = [
	LoginService
];

