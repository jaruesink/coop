"use strict";

// import Angular 2
import {Injectable} from "angular2/core";
import {LoginService} from "../login-service/login.service";

@Injectable()
export class GroupService {
    groups: Array<any>;
    groupInfo: Object;
    postInfo: Object;
    currentGroupID: string;
    currentPostID: string;
    constructor() {
        console.log('Group service is loaded.');
        this.currentGroupID = '';
        this.currentPostID = '';
        this.groups = [
        {
            "id": "sampleGroupID1",
            "name":"NeteGreek",
            "description":"This is just a test group, I'm trying to figure out how things will look.",
            "members": 2
        },
        {
            "id": "sampleGroupID2",
            "name": "Wells Branch Renegades Softball",
            "description": "This is just a test group, I'm trying to figure out how things will look.",
            "members": 12
        }
        ];
        this.groupInfo = {
            "sampleGroupID1": {
                "name": "NeteGreek",
                "description": "This is just a test group, I'm trying to figure out how things will look.",
                "members": ["Jake Ruesink", "Derek Wene"],
                "posts": [
                    {
                        "id": "samplePostID1",
                        "content": "This is a post.",
                        "author": "Jake Ruesink",
                        "time_stamp": "Two Weeks Ago",
                        "comments": 1
                    }
                ]
            },
            "sampleGroupID2": {
                "name": "Wells Branch Renegades Softball",
                "description": "This is just a test group, I'm trying to figure out how things will look.",
                "members": ["Jake Ruesink", "Kenzie"],
                "posts": [
                    {
                        "id": "samplePostID2",
                        "content": "Our game is tomorrow!",
                        "author": "Jake Ruesink",
                        "time_stamp": "Yesterday",
                        "comments": 1
                    }
                ]
            }
        };
        this.postInfo = {
            "samplePostID1": {
                "content": "This is a post content",
                "author": "Jake Ruesink",
                "time_stamp": "Two Weeks Ago",
                "comments": [
                    {
                        "id": "sampleCommentID1",
                        "content": "This is stupid.",
                        "author": "Derek Wene",
                        "time_stamp": "Last Week"
                    }
                ]
            },
            "samplePostID2": {
                "id": "samplePostID2",
                "content": "Our game is tomorrow!",
                "author": "Jake Ruesink",
                "time_stamp": "Yesterday",
                "comments": [
                    {
                        "id": "sampleCommentID2",
                        "content": "Stop making errors.",
                        "author": "Kenzie Muckway",
                        "time_stamp": "5 Minutes Ago"
                    }
                ]
            }
        };
    }
}
