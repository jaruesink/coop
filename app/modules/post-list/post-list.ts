"use strict";

import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES, Router, RouterLink} from "angular2/router";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {GroupService} from "../../core/services/group-service/group.service";
import {PostActionsMenu} from "../actions-menu/post-actions-menu";
import {CommentList} from '../../modules/comment-list/comment-list';
import {AddComment} from '../../core/commons/add-comment/add-comment';

@Component({
    selector: "post-list",
    templateUrl: "../modules/post-list/post-list.template.html",
    directives: [RouterLink, PostActionsMenu, CommentList, AddComment]
})
export class PostList {
    posts: Array<any>;
    currentGroupID: string;
    editingPost:boolean = false;
    edit_post_form: ControlGroup;
    post_content: Control;
    constructor(private groupService: GroupService, private builder: FormBuilder) {
        console.log("Post list component loaded");
        this.currentGroupID = this.groupService.currentGroupID;
        this.posts = this.groupService.groupInfo[this.groupService.currentGroupID].posts;
    }
    editPost(content:string) {
        this.editingPost = !this.editingPost;
        this.post_content = new Control(content, Validators.compose([Validators.required]));
        this.edit_post_form = this.builder.group({
          post_content: this.post_content
        });
    }
    savePost(index:number) {
        if (this.posts[index].content !== this.edit_post_form.value.post_content) {
            this.posts[index].content = this.edit_post_form.value.post_content;
            this.posts[index].edited = true;
        }
        this.editingPost = false;
    }
    cancelEdit() {
        this.editingPost = false;
    }
}
