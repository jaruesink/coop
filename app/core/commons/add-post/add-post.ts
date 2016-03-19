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
        this.groupService.postInfo[randomID] = {};
        this.groupService.postInfo[randomID].id = randomID;
        new_post['isImportant'] = this.isImportant;
        this.groupService.postInfo[randomID].isImportant = this.isImportant;
        new_post['content'] = input.value;
        this.groupService.postInfo[randomID].content = input.value;
        new_post['author'] = this.accountService.fullName;
        new_post['comments'] = [];
        this.groupService.postInfo[randomID].comments = [];
        this.groupService.postInfo[randomID].author = this.accountService.fullName;
        this.groupService.groupInfo[this.groupService.currentGroupID].posts.unshift(new_post);
        input.focus();
        setTimeout(() => {input.value = '';}, 0)
        this.isImportant = false;
    }
}
