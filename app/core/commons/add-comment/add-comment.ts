"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {AccountService} from '../../services/account-service/account.service';
import {GroupService} from '../../services/group-service/group.service';

@Component({
	selector: "add-comment",
	templateUrl: "../core/commons/add-comment/add-comment.template.html",
	directives: [FORM_DIRECTIVES]
})
export class AddComment {
    @Input() index: number;
    constructor(public groupService: GroupService, public accountService: AccountService) {
        console.log("Add comment component loaded");
    }
    addComment(input:any) {
        var new_comment = {};
        // var currentPostID = this.groupService.currentPostID;
        var currentGroupID = this.groupService.currentGroupID;
        var randomID = (Math.random() + 1).toString(36).slice(2, 9);
        new_comment['id'] = randomID;
        new_comment['content'] = input.value;
        new_comment['author'] = {};
        new_comment['author']['name'] = this.accountService.me.fullName;
        new_comment['author']['photo_url'] = this.accountService.me.photo_url;
        // this.groupService.postInfo[currentPostID].comments.push(new_comment);
        this.groupService.groupInfo[currentGroupID].posts[this.index].comments.push(new_comment);
        input.value = '';
    }
}
