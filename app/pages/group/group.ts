"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {RouteConfig, Route, RouterOutlet, RouterLink, Router, RouteParams} from "angular2/router";
import {GroupService} from '../../core/services/group-service/group.service';

@Component({
    selector: "page-group",
    templateUrl: "pages/group/group.template.html",
    directives: []
})
export class Group {
    groupName: string;
    groupDescription: string;
    constructor(private routeParams: RouteParams, public groupService: GroupService) {
        console.log("Group component loaded");
        var group_id = this.routeParams.get('group_id');
        this.groupName = this.groupService.groupInfo[group_id].name;
        this.groupDescription = this.groupService.groupInfo[group_id].description;
    }
}
