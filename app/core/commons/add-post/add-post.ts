 "use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {AccountService} from '../../services/account-service/account.service';
import {GroupService} from '../../services/group-service/group.service';

@Component({
	selector: "add-post",
	templateUrl: "../core/commons/add-post/add-post.template.html",
	directives: [FORM_DIRECTIVES]
})
export class AddPost {
    add_post_form: ControlGroup;
    content: Control;
    isImportant: boolean = false;
    constructor(public groupService: GroupService, public accountService: AccountService, private builder: FormBuilder) {
		console.log("Add Post component loaded");
        this.content = new Control('', Validators.compose([Validators.required]));
        this.add_post_form = builder.group({
          content: this.content
        });
	}
    makeImportant() {
        this.isImportant = !this.isImportant;
    }
    addPost(input:any) {
        var new_post = {};
        var randomID = (Math.random() + 1).toString(36).slice(2, 9);
        new_post['id'] = randomID;
        new_post['isImportant'] = this.isImportant;
        new_post['content'] = input.value;
        new_post['author'] = {};
        new_post['author']['name'] = this.accountService.me.name;
		new_post['author']['username'] = this.accountService.me.username;
        new_post['author']['photo_url'] = this.accountService.me.photo_url;
        new_post['comments'] = [];
        this.groupService.groupInfo[this.groupService.currentGroupID].posts.unshift(new_post);
        setTimeout(() => {input.value = '';}, 0);
        this.isImportant = false;
    }
}
