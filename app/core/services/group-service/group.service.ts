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
            "starred": true,
            "description":"This is just a test group, I'm trying to figure out how things will look.",
            "members": 2
        },
        {
            "id": "sampleGroupID2",
            "name": "Wells Branch Renegades Softball",
            "starred": false,
            "description": "This is just a test group, I'm trying to figure out how things will look.",
            "members": 12
        }
        ];
        this.groupInfo = {
            "sampleGroupID1": {
                "name": "NeteGreek",
                "admins": [{"id": "1", "username": "jaruesink", "name": "Jake Ruesink", "photo_url": "http://photourl.com"}],
                "description": "This is just a test group, I'm trying to figure out how things will look.",
                "members": [{"username": "jaruesink", "name": "Jake Ruesink"}, {"username": "djrobotfreak", "name": "Derek Wene"}],
                "posts": [
                    {
                        "id": "samplePostID1",
                        "content": "This is a post.",
                        "author": {"name": "Jake Ruesink", "username":"jaruesink", "photo_url":"./images/profile_placeholder.png"},
                        "time_stamp": "Two Weeks Ago",
                        "photo_url": "./images/profile_placeholder.png",
                        "comments": [
                            {
                                "id": "sampleCommentID1",
                                "content": "This is a comment.",
                                "author": {"name": "Derek Wene", "username":"dwene","photo_url":"./images/profile_placeholder.png"},
                                "time_stamp": "Last Week"
                            }
                        ]
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
                        "author": {"name":"Jake Ruesink", "username":"jaruesink", "photo_url":"./images/profile_placeholder.png"},
                        "time_stamp": "Yesterday",
                        "comments": [
                            {
                                "id": "sampleCommentID2",
                                "content": "Stop making errors.",
                                "author": {"name": "Kenzie Muckway", "usename":"kenziem", "photo_url":"./images/profile_placeholder.png"},
                                "time_stamp": "5 Minutes Ago"
                            }
                        ]
                    }
                ]
            }
        };
        // this.postInfo = {
        //     "samplePostID1": {
        //         "content": "This is a post.",
        //         "author": {"name": "Jake Ruesink","photo_url":"./images/profile_placeholder.png"},
        //         "time_stamp": "Two Weeks Ago",
        //         "comments": [
        //             {
        //                 "id": "sampleCommentID1",
        //                 "content": "This is stupid.",
        //                 "author": {"name": "Derek Wene","photo_url":"./images/profile_placeholder.png"},
        //                 "time_stamp": "Last Week"
        //             }
        //         ]
        //     },
        //     "samplePostID2": {
        //         "id": "samplePostID2",
        //         "content": "Our game is tomorrow!",
        //         "author": {"name": "Jake Ruesink","photo_url":"./images/profile_placeholder.png"},
        //         "time_stamp": "Yesterday",
        //         "comments": [
        //             {
        //                 "id": "sampleCommentID2",
        //                 "content": "Stop making errors.",
        //                 "author": {"name": "Kenzie Muckway","photo_url":"./images/profile_placeholder.png"},
        //                 "time_stamp": "5 Minutes Ago"
        //             }
        //         ]
        //     }
        // };
    }
}
