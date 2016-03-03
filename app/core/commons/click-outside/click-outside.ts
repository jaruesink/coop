import {Directive, Output, EventEmitter, HostListener, Renderer} from "angular2/core";

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutside {
    event: any;
    localEvent: any;

    @Output() ClickedOutside = new EventEmitter<string>();

    @HostListener("click", ["$event"])
    onClick(event:any) {
        this.localEvent = event;
    }

    constructor(renderer: Renderer) {
        console.log("Click outside directive loaded");
        renderer.listenGlobal('document', 'click', (event:any) => {
            if (event !== this.localEvent) {
                this.ClickedOutside.emit(event);
            }
        });
    }
    trackEvent(event:any) {
        this.localEvent = event;
    }
}
