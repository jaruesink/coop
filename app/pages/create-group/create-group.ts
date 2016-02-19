"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "page-create-group",
    templateUrl: "pages/create-group/create-group.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class CreateGroup {
    groupName: string;
    groupDescription: string;
    constructor(private router:Router, public groupService: GroupService) {
        console.log("Create group component loaded");
    }
    saveGroup() {
        var group = {};
        group['name'] = this.groupName;
        group['description'] = this.groupDescription;
        this.groupService.groups.push(group);
        this.router.navigate(['/Home']);
    }
}
