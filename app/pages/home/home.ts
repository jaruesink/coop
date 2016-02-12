"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {PhoneInput} from "../../core/commons/phoneInput/phoneInput";
import {AddMembersByPhone} from "../../core/services/addMembersByPhone/addMembersByPhone.service";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [PhoneInput]
})
export class Home {
  phoneNumber: string;
  e: any;
	constructor(public membersToAdd:AddMembersByPhone) {
		console.log("Home component loaded");
    console.log(membersToAdd);
    this.phoneNumber = '';
	}
}
