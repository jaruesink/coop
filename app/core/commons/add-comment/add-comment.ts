"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {AccountService} from '../../services/account-service/account.service';
import {GroupService} from '../../services/group-service/group.service';

@Component({
	selector: "add-comment",
	templateUrl: "../core/commons/add-comment/add-comment.template.html",
	directives: [FORM_DIRECTIVES]
})
export class AddComment {
    @Input() index: number;
    add_comment_form: ControlGroup;
    content: Control;
    constructor(public groupService: GroupService, public accountService: AccountService, private builder: FormBuilder) {
        console.log("Add comment component loaded");
        this.content = new Control('', Validators.compose([Validators.required]));
        this.add_comment_form = builder.group({
          content: this.content
        });
    }
    addComment(input:any) {
        var new_comment = {};
        var currentGroupID = this.groupService.currentGroupID;
        var randomID = (Math.random() + 1).toString(36).slice(2, 9);
        new_comment['id'] = randomID;
        new_comment['content'] = input.value;
        new_comment['author'] = {};
        new_comment['author']['name'] = this.accountService.me.name;
        new_comment['author']['photo_url'] = this.accountService.me.photo_url;
        this.groupService.groupInfo[currentGroupID].posts[this.index].comments.push(new_comment);
        input.value = '';
    }
}
