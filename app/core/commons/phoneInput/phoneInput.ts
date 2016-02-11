"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup} from "angular2/common";

@Component({
	selector: "phone-input",
	templateUrl: "../core/commons/phoneInput/phoneInput.template.html",
	directives: [FORM_DIRECTIVES]
})
export class PhoneInput {
  phoneNumber: string;
	constructor() {
		console.log("Phone input component loaded");
	}
  focusInput(e: any, this_input: any, next_input: any, prev_input: any) {
    var min   = parseInt(this_input.attributes.min.value);
    var lower = parseInt(this_input.attributes.min.value.slice(1));
    // prevent anything more than 1 digit above the min value
    if(this_input.value > min && e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
    }
    // set focus on next input if at the end of an input
    if(this_input.value > lower && this_input.value < min && e.keyCode >= 48 && e.keyCode <= 57) {
      if(next_input.attributes.name.value !== "areaCode") {
        setTimeout( function() {
          next_input.focus();
        }, 1);
      }
    }
    //when deleting move focus to previous
    if(e.keyCode === 8 && prev_input.attributes.name.value !== "lastFour") {
      setTimeout( function() {
        if(!this_input.value) {
          prev_input.focus();
        }
      }, 1);
    }
  }
  checkNumber(a: number, b: number, c: number) {
    if( (a+b+c).toString().length === 10 && this.phoneNumber !== ('('+a+') '+b+'-'+c) ) {
      this.phoneNumber = '('+a+') '+b+'-'+c;
      console.log('added: ', this.phoneNumber);
    }
    if( (a+b+c).toString().length < 10 && this.phoneNumber) {
      console.log('removed: ', this.phoneNumber);
      this.phoneNumber = '';
    }
  }
}
