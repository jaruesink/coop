"use strict";

import {Component} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, FormBuilder} from "angular2/common";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "page-create-group",
    templateUrl: "pages/create-group/create-group.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class CreateGroup {
    create_group_form: ControlGroup;
    group_name: Control;
    description: Control;
    constructor(private router:Router, public groupService: GroupService, private builder: FormBuilder) {
        console.log("Create group component loaded");
        this.create_group_form = builder.group({
          group_name:  this.group_name,
          description: this.description
        });
    }
    saveGroup() {
        var group = {};
        var randomID = (Math.random() + 1).toString(36).slice(2, 9);
        group['id'] = randomID;
        this.groupService.groupInfo[randomID] = {};
        group['name'] = this.create_group_form.value.group_name;
        this.groupService.groupInfo[randomID].name = this.create_group_form.value.group_name;
        group['description'] = this.create_group_form.value.description;
        this.groupService.groupInfo[randomID].description = this.create_group_form.value.description;
        group['members'] = 0;
        this.groupService.groupInfo[randomID].posts = [];
        this.groupService.groups.push(group);
        this.router.navigate(['/Home']);
    }
}
