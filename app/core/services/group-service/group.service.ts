"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class GroupService {
    groups: Array<any>;
    constructor() {
        console.log('Group service is loaded.');
        this.groups = [
        {
            "id": "test1",
            "name":"NeteGreek",
            "description":"This is just a test group, I'm trying to figure out how things will look.",
            "members": 2
        },
        {
            "id": "test2",
            "name": "Wells Branch Renegades Softball",
            "description": "This is just a test group, I'm trying to figure out how things will look.",
            "members": 12
        },
        ];
    }
}
