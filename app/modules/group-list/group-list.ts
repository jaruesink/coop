"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "group-list",
    templateUrl: "../modules/group-list/group-list.template.html",
    directives: [RouterLink]
})
export class GroupList {

    constructor(private groupService: GroupService) {
        console.log("Group list component loaded");
    }
}
