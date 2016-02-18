"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

@Component({
    selector: "page-create-group",
    templateUrl: "pages/create-group/create-group.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class CreateGroup {
    username: string;
    fullName: string;
    userNumber: string;
    constructor() {
        console.log("Create group component loaded");
    }
    saveGroup() {
        // this.router.navigate(['/InviteMembers']);
    }
}
