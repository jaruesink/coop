"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class GroupService {
    groups: Array<any>;
    groupInfo: Object;
    constructor() {
        console.log('Group service is loaded.');
        this.groups = [
        {
            "id": "sampleID1",
            "name":"NeteGreek",
            "description":"This is just a test group, I'm trying to figure out how things will look.",
            "members": 2
        },
        {
            "id": "sampleID2",
            "name": "Wells Branch Renegades Softball",
            "description": "This is just a test group, I'm trying to figure out how things will look.",
            "members": 12
        }
        ];
        this.groupInfo = {
            "sampleID1": {
                "name": "NeteGreek",
                "description": "This is just a test group, I'm trying to figure out how things will look.",
                "members": ["Jake Ruesink", "Derek Wene"]
            },
            "sampleID2": {
                "name": "Wells Branch Renegades Softball",
                "description": "This is just a test group, I'm trying to figure out how things will look.",
                "members": ["Jake Ruesink", "Kenzie"]
            }
        };
    }
}
