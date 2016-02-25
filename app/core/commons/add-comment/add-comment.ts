"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {LoginService} from '../../services/login-service/login.service';
import {GroupService} from '../../services/group-service/group.service';

@Component({
	selector: "add-comment",
	templateUrl: "../core/commons/add-comment/add-comment.template.html",
	directives: [FORM_DIRECTIVES]
})
export class AddComment {
  constructor(public groupService: GroupService, public loginService: LoginService) {
		console.log("Add comment component loaded");
	}
  addComment(input:any) {
      var new_comment = {};
      var currentPostID = this.groupService.currentPostID;
      var randomID = (Math.random() + 1).toString(36).slice(2, 9);
      new_comment['id'] = randomID;
      new_comment['content'] = input.value;
      new_comment['author'] = this.loginService.fullName;
      this.groupService.postInfo[currentPostID].comments.push(new_comment);
      input.value = '';
  }
}
