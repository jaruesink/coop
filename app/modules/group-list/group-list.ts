"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "group-list",
    templateUrl: "../modules/group-list/group-list.template.html",
    directives: [FORM_DIRECTIVES]
})
export class GroupList {

    constructor(private groupService: GroupService) {
        console.log("Group list component loaded");
    }
}
