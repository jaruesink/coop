"use strict";

import {Component, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

@Component({
	selector: "phone-input",
	templateUrl: "../core/commons/phone-input/phone-input.template.html",
	directives: [FORM_DIRECTIVES]
})
export class PhoneInput {
  phoneNumber: string;
  @Output() phoneNumberChanged = new EventEmitter<string>();
	constructor() {
		console.log("Phone input component loaded");
	}
  setNumber(areaCode: any, firstThree: any, lastFour: any) {
    if (areaCode.value.toString().length + firstThree.value.toString().length + lastFour.value.toString().length === 10) {
      this.phoneNumber = '('+areaCode.value+') '+firstThree.value+'-'+lastFour.value;
    } else {
      this.phoneNumber = '';
    }
    this.phoneNumberChanged.emit(this.phoneNumber);
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
        setTimeout(() => {
          next_input.focus();
        }, 1);
      }
    }
    //when deleting move focus to previous
    if(e.keyCode === 8 && prev_input) {
      setTimeout(() => {
        if(!this_input.value && prev_input.value) {
          prev_input.focus();
        }
      }, 1);
    }
  }
}
