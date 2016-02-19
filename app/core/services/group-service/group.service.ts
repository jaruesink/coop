"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class GroupService {
    groups: Array<any>;
    constructor() {
        console.log('Group service is loaded.');
        this.groups = [];
    }
}