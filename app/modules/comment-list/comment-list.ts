"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "comment-list",
    templateUrl: "../modules/comment-list/comment-list.template.html",
    directives: [RouterLink]
})
export class CommentList {
    @Input() commentList: Array<any>;
    constructor(private groupService: GroupService) {
        console.log("Comment list component loaded");
    }
}
