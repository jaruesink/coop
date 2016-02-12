"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {PhoneInput} from "../../core/commons/phoneInput/phoneInput";
import {AddMembersByPhone} from "../../core/services/addMembersByPhone/addMembersByPhone.service";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [PhoneInput, FORM_DIRECTIVES]
})
export class Home {
  phoneNumber: string;
  invitedMembers: Array<string>;
	constructor(public membersToAdd:AddMembersByPhone) {
		console.log("Home component loaded");
    this.phoneNumber = '';
	}
  inviteMembers() {
    // making a cleaner list to send out
    var list = membersToAdd.phoneNumbers;
    var new_list:Array<string> = [];
    for (let i = 0; i < list.length; i++) {
      new_list.push(list[i].phoneNumber);
    }
    this.invitedMembers = new_list;
    // clear out membersToAdd
    delete membersToAdd.phoneNumbers;
  }
}
