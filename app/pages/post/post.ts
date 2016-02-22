"use strict";

import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, RouteParams} from "angular2/router";
import {GroupService} from '../../core/services/group-service/group.service';
import {CommentList} from '../../modules/comment-list/comment-list';

@Component({
    selector: "page-post",
    templateUrl: "pages/post/post.template.html",
    directives: [CommentList]
})
export class Post {
    postContent: string;
    constructor(private routeParams: RouteParams, public groupService: GroupService) {
        console.log("Post component loaded");
        var group_id = this.routeParams.get('group_id');
        var post_id = this.routeParams.get('post_id');
        this.groupService.currentGroupID = group_id;
        this.groupService.currentPostID = post_id;
        this.postContent = this.groupService.postInfo[post_id].content;
    }
}
