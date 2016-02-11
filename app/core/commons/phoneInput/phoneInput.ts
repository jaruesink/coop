"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

@Component({
	selector: "phone-input",
	templateUrl: "../core/commons/phoneInput/phoneInput.template.html",
	directives: [FORM_DIRECTIVES]
})
export class PhoneInput {
  phoneNumber: Object;
  areaCode: number;
  firstThree: number;
  lastFour: number;
	constructor() {
		console.log("Phone input component loaded");
	}
  checkNumber(e: any, this_input: any, next_input: any, prev_input: any) {
    // prevent anything more than 1 digit above the min value
    if(this_input.value > min && e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
    }
    // set focus on next input if at the end of an input
    var min   = parseInt(this_input.attributes.min.value);
    var lower =	parseInt(this_input.attributes.min.value.slice(1));
    if(this_input.value > lower && this_input.value < min && e.keyCode >= 48 && e.keyCode <= 57) {
      if(next_input) {
        setTimeout(function() {
          next_input.focus();
        }, 1);
      }
      else {
        setTimeout(function() {
          this_input.blur();
        }, 1);
      }
    }
    //when deleting move focus to previous
    if(e.keyCode === 8) {
      setTimeout(function() {
        console.log(this_input.value);
        if(!this_input.value){
          prev_input.focus();
        }
      }, 1);
    }
  }
}
