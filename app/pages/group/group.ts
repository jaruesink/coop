"use strict";

import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, RouteParams} from "angular2/router";
import {GroupService} from '../../core/services/group-service/group.service';
import {PostList} from '../../modules/post-list/post-list';
import {AddPost} from '../../core/commons/add-post/add-post';

@Component({
    selector: "page-group",
    templateUrl: "pages/group/group.template.html",
    directives: [PostList, AddPost]
})
export class Group {
    groupName: string;
    groupDescription: string;
    constructor(private routeParams: RouteParams, public groupService: GroupService) {
        console.log("Group component loaded");
        var group_id = this.routeParams.get('group_id');
        this.groupService.currentGroupID = group_id;
        this.groupName = this.groupService.groupInfo[group_id].name;
        this.groupDescription = this.groupService.groupInfo[group_id].description;
    }
}
