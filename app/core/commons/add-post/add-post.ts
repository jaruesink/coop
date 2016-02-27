"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {LoginService} from '../../services/login-service/login.service';
import {GroupService} from '../../services/group-service/group.service';

@Component({
	selector: "add-post",
	templateUrl: "../core/commons/add-post/add-post.template.html",
	directives: [FORM_DIRECTIVES]
})
export class AddPost {
  constructor(public groupService: GroupService, public loginService: LoginService) {
		console.log("Add Post component loaded");
	}
  addPost(input:any) {
      var new_post = {};
      var randomID = (Math.random() + 1).toString(36).slice(2, 9);
      new_post['id'] = randomID;
      this.groupService.postInfo[randomID] = {};
      this.groupService.postInfo[randomID].id = randomID;
      new_post['content'] = input.value;
      this.groupService.postInfo[randomID].content = input.value;
      new_post['author'] = this.loginService.fullName;
      new_post['comments'] = [];
      this.groupService.postInfo[randomID].comments = [];
      this.groupService.postInfo[randomID].author = this.loginService.fullName;
      this.groupService.groupInfo[this.groupService.currentGroupID].posts.push(new_post);
      input.value = '';
  }
}
