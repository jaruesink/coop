"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "page-edit-group",
    templateUrl: "pages/edit-group/edit-group.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class EditGroup {
    name: string;
    description: string;
    constructor(public groupService:GroupService, private router:Router) {
        console.log("Edit group component loaded");
        if (this.groupService.currentGroupID) {
            this.name = this.groupService.groupInfo[this.groupService.currentGroupID].name;
            this.description = this.groupService.groupInfo[this.groupService.currentGroupID].description;
        } else {
            this.router.navigate(['Home']);
        }
    }
    saveGroup() {
        this.groupService.groupInfo[this.groupService.currentGroupID].name = this.name;
        this.groupService.groupInfo[this.groupService.currentGroupID].description = this.description;
        window.history.back();
    }
}
