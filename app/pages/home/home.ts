"use strict";

// import Angular 2
import {Component} from "angular2/core";
import {PhoneInput} from "../../core/commons/phoneInput/phoneInput";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [PhoneInput]
})
export class Home {
  phoneNumber: string;
  e: any;
	constructor() {
		console.log("Home component loaded");
    this.phoneNumber = '';
	}
  updateNumber() {
    console.log('this event is emitting: ');
  }
}
