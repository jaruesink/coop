"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";
import {PostActionsMenu} from "../actions-menu/post-actions-menu";
import {CommentList} from '../../modules/comment-list/comment-list';

@Component({
    selector: "post-list",
    templateUrl: "../modules/post-list/post-list.template.html",
    directives: [RouterLink, PostActionsMenu, CommentList]
})
export class PostList {
    posts: Array<any>;
    currentGroupID: string;
    constructor(private groupService: GroupService) {
        console.log("Post list component loaded");
        this.currentGroupID = this.groupService.currentGroupID;
        this.posts = this.groupService.groupInfo[this.groupService.currentGroupID].posts;
    }
}
