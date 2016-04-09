 "use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
 import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {CommentActionsMenu} from "../actions-menu/comment-actions-menu";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "comment-list",
    templateUrl: "../modules/comment-list/comment-list.template.html",
    directives: [RouterLink, CommentActionsMenu]
})
export class CommentList {
    @Input() comments: Array<any>;
    @Input() postIndex: number;
	edit_comment_form: ControlGroup;
	comment_content: Control;
    constructor(private groupService: GroupService, private builder: FormBuilder) {
        console.log("Comment list component loaded");
    }
	editComment(content:string, index:number) {
		this.comments[index].editingComment = !this.comments[index].editingComment;
		this.comment_content = new Control(content, Validators.compose([Validators.required]));
		this.edit_comment_form = this.builder.group({
			comment_content: this.comment_content
		});
	}
	saveComment(index:number) {
		if (this.comments[index].content !== this.edit_comment_form.value.comment_content) {
			this.comments[index].content = this.edit_comment_form.value.comment_content;
			this.comments[index].edited = true;
		}
		this.comments[index].editingComment = false;
	}
	cancelEdit(index:number) {
		this.comments[index].editingComment = false;
	}
}
