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
  checkNumber(e: any, this_input: any, next_input: any) {
    var min   = parseInt(this_input.attributes.min.value);
    var lower = parseInt(this_input.attributes.min.value.slice(1));
    if(this_input.value > min && e.keyCode >= 48 && e.keyCode <= 57) {
      e.preventDefault();
    }
    if(this_input.value > lower && this_input.value < min && e.keyCode >= 48 && e.keyCode <= 57) {
      if(next_input) {
        setTimeout(function() {
          next_input.focus();
        }, 10);
      }
      else{
        setTimeout(function() {
          this_input.blur();
        }, 10);
      }
    }
  }
  setNumber(a: any, b: any, c: any) {
    var current = a.value+b.value+c.value;
    if ( current.length === 10 ) {
      this.phoneNumber = new PhoneNumber(a.value, b.value, c.value);
      console.log('the phone number is: ', this.phoneNumber);
    }
  }
}

export class PhoneNumber {
  constructor(
  areaCode: string,
  firstThree: string,
  lastFour: string,
  public phoneNumber: string
  ) {
    this.phoneNumber = "("+areaCode+") "+firstThree+"-"+lastFour;
  }
}
