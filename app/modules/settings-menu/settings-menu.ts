"use strict";

import {Component, Renderer, Output, EventEmitter, HostListener} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";
import {AccountService} from "../../core/services/account-service/account.service";
import {LoginService} from "../../core/services/login-service/login.service";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "settings-menu",
    templateUrl: "modules/settings-menu/settings-menu.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class SettingsMenu {
    isOpen: boolean;
    localEvent: any;
    listener: any;

    @HostListener("click", ["$event"])
    onClick(event: any) {
        this.localEvent = event;
    }

    constructor(public accountService: AccountService, public loginService: LoginService, public groupService: GroupService, public router: Router, private renderer: Renderer) {

    }
    toggleSettings() {
        this.isOpen = !this.isOpen;
        console.log('Toggling the settings menu;');
        if (this.isOpen) {
            this.listener = this.renderer.listenGlobal('document', 'click', (event: any) => {
                if (event.target.tagName !== this.localEvent.target.tagName) {
                    event.preventDefault();
                    this.handleClick(event);
                } else if ( event.target.className === "dropdown-item" ) {
                  this.handleClick(event);
                }
            });
        } else {
            this.listener();
        }
    }
    handleClick(event:any) {
        console.log(event.target.className);
        this.toggleSettings();
    }
    logOut() {
        this.toggleSettings();
        this.loginService.userLogout();
    }
}
