"use strict";

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";
import {AccountService} from "../../core/services/account-service/account.service";
import {LoginService} from "../../core/services/login-service/login.service";
import {GroupService} from "../../core/services/group-service/group.service";
import {SettingsMenu} from "../settings-menu/settings-menu";

@Component({
    selector: "app-header",
    templateUrl: "modules/app-header/app-header.template.html",
    directives: [ROUTER_DIRECTIVES, SettingsMenu]
})
export class AppHeader {
    constructor(public accountService: AccountService, public loginService: LoginService, public groupService: GroupService, private location: Location, private router: Router) {
        return;
    }
    goBack() {
        if(this.groupService.currentPostID) {
            this.router.navigate(['Group', {group_id: this.groupService.currentGroupID}]);
        } else {
            this.router.navigate(['Home']);
        }
    }
}
