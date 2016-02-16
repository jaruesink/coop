"use strict";

import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";
import {AddMembersByPhone} from "../../../core/services/addMembersByPhone/addMembersByPhone.service";

@Component({
	selector: "phone-input",
	templateUrl: "../core/commons/phoneInput/phoneInput.template.html",
	directives: [FORM_DIRECTIVES],
})
export class PhoneInput {
  phoneNumber: any;
  membersToAdd: any;
	constructor(membersToAdd:AddMembersByPhone) {
		console.log("Phone input component loaded");
    this.membersToAdd = membersToAdd;
	}
  onKeyDown(e: any, this_input: any, next_input: any, prev_input: any) {
    var pattern    = new RegExp(this_input.attributes.pattern.value);
    var max_length = this_input.attributes.maxlength.value;
    // prevent anything more than 1 digit above the min value
    if(pattern.test(this_input.value) && e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
      if(next_input && !next_input.value) {
        next_input.value = String.fromCharCode(e.keyCode);
        next_input.focus();
      }
    }
    // set focus on next input if at the end of an input
    if(this_input.value.toString().length === max_length - 1 && e.keyCode >= 48 && e.keyCode <= 57) {
      if(next_input) {
        setTimeout( function() {
          next_input.focus();
        }, 1);
      }
    }
    //when deleting move focus to previous
    if(e.keyCode === 8 && prev_input) {
      setTimeout( function() {
        if(!this_input.value && prev_input.value) {
          prev_input.focus();
        }
      }, 1);
    }
  }
}

export class PhoneNumberModel {
  public phoneNumber:string = '';
  constructor(a:number, b:number, c:number) {
    this.phoneNumber = '('+a+') '+b+'-'+c;
  }
}
