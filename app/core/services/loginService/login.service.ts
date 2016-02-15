"use strict";

// import Angular 2
import {Injectable} from "angular2/core";

// app services
//import {appServicesInjectables} from "core/services/services";

@Injectable()
export class LoginService {
    isLoggedIn: boolean = true;
    constructor() {

    }
}
