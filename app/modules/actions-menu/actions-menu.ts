"use strict";

import {Component, Renderer, Input, EventEmitter, HostListener} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Route, RouterOutlet, RouterLink, Router, Location} from "angular2/router";
import {AccountService} from "../../core/services/account-service/account.service";
import {LoginService} from "../../core/services/login-service/login.service";
import {GroupService} from "../../core/services/group-service/group.service";

@Component({
    selector: "actions-menu",
    templateUrl: "modules/actions-menu/actions-menu.template.html",
    directives: [ROUTER_DIRECTIVES]
})
export class ActionsMenu {
    @Input() group:any;
    @Input() index:number;
    isOpen: boolean;
    localEvent: any;
    listener: any;

    @HostListener("click", ["$event"])
    onClick(event: any) {
        this.localEvent = event;
    }

    constructor(public accountService: AccountService, public loginService: LoginService, public groupService: GroupService, public router: Router, private renderer: Renderer) {

    }
    toggleActions() {
        this.isOpen = !this.isOpen;
        console.log('Toggling the actions menu.');
        if (this.isOpen) {
            this.listener = this.renderer.listenGlobal('document', 'click', (event: any) => {
                console.log(event);
                console.log(this.localEvent);
                if (event.target.tagName !== this.localEvent.target.tagName) {
                    this.handleClick(event);
                } else if ( event.target.className === "action-item" ) {
                  this.handleClick(event);
                }
            });
        } else {
            this.listener();
        }
    }
    handleClick(event:any) {
        this.toggleActions();
    }
    favoriteGroup(index:number) {
        this.groupService.groups[index].starred = !this.groupService.groups[index].starred;
    }
    logOut() {
        this.toggleActions();
        this.loginService.userLogout();
    }
}
