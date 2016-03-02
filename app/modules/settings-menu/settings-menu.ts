"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";
import {AccountService} from "../../core/services/account-service/account.service";
import {LoginService} from "../../core/services/login-service/login.service";
import {GroupService} from "../../core/services/group-service/group.service";
import {NgClass} from 'angular2/common';

@Component({
    selector: "settings-menu",
    templateUrl: "modules/settings-menu/settings-menu.template.html",
    directives: [ROUTER_DIRECTIVES, NgClass]
})
export class SettingsMenu {
    isOpen: boolean;
    constructor(public accountService: AccountService, public loginService: LoginService, public groupService: GroupService, private router: Router) {
        return;
    }
    toggleSettings() {
        this.isOpen = !this.isOpen;
    }
}
