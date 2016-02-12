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
  focusInput(e:any, this_input:any, next_input:any, prev_input:any) {
    var min   = parseInt(this_input.attributes.min.value) - 1;
    var lower = parseInt(min.toString().slice(1));
    // prevent anything more than 1 digit above the min value
    if(this_input.value > min && e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
      if(next_input && !next_input.value) {
        next_input.value = String.fromCharCode(e.keyCode);
        next_input.focus();
      }
    }
    // set focus on next input if at the end of an input
    if(this_input.value > lower && this_input.value < min && e.keyCode >= 48 && e.keyCode <= 57) {
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
  addMember(areaCode:any, firstThree:any, lastFour:any) {
    this.membersToAdd.phoneNumbers.push(new PhoneNumberModel(areaCode.value, firstThree.value, lastFour.value));
    areaCode.value = '';
    firstThree.value = '';
    lastFour.value = '';
    areaCode.focus();
  }
}

export class PhoneNumberModel {
  public phoneNumber:string = '';
  constructor(a:number, b:number, c:number) {
    this.phoneNumber = '('+a+') '+b+'-'+c;
  }
}
