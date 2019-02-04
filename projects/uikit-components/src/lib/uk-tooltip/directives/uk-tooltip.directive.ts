import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
    HostBinding,
    OnDestroy,
} from '@angular/core';

export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

let nextUniqueId: number = 0;

@Directive({
    selector: '[ukTooltip]',
    host: {
        'class': 'uk-tooltip-host',
    }
  })
  export class UkTooltipDirective implements OnDestroy {
    private _position: TooltipPosition = 'bottom';
    private _text: string;
    private _isActive = false;
    private _margin = 14;
    private tooltip: HTMLElement;
    // Timers
    private hideTimer: any;
    private delayLongpress: any;

    @Input()
    get ukTooltip(): string { return this._text; }
    set ukTooltip(value: string) {
        this._text = value;
        if (this.tooltip.firstChild) {
            this.renderer.removeChild(this.tooltip, this.tooltip.firstChild);
        }
        this.renderer.appendChild(this.tooltip, this.renderer.createText(this._text));
    }
    
    @Input()
    get ukTooltipPosition(): TooltipPosition { return this._position; }
    set ukTooltipPosition(value: TooltipPosition) {
        if (value !== this._position) {
            this.renderer.removeClass(this.tooltip, this._position);
            this._position = value;
            this.renderer.addClass(this.tooltip, this._position);
        }
    }
    
    @HostBinding('attr.aria-describedby')
    tooltipID: string;
    
    @HostListener('mouseover') onEnter() { this.show(); }
    
    @HostListener('mouseout') onLeave() { 
        clearTimeout(this.delayLongpress);
        this.hide();
    }

    @HostListener('mousedown') oMouseDown() {
        this.delayLongpress = setTimeout(() => { this.show(); }, 1300);
    }

    @HostListener('mouseup') onMouseUp() {
        this.hide();
        clearTimeout(this.delayLongpress);
    }
    
    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.tooltipID = `tooltip-${nextUniqueId++}`;
        this.createTooltip();
    }

    ngOnDestroy() {
        if(this._isActive) {
            clearTimeout(this.hideTimer);
        }
        this.renderer.removeChild(document.body, this.tooltip);
    }
    
    createTooltip(){
        this.tooltip = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltip, 'uk-tooltip');
        this.renderer.addClass(this.tooltip, this._position);
        this.renderer.addClass(this.tooltip, 'sr-only');
        this.renderer.setAttribute(this.tooltip, 'role', 'tooltip');
        this.renderer.setAttribute(this.tooltip, 'id', this.tooltipID);
        this.renderer.appendChild(document.body, this.tooltip);
    }
    
    show() {
        this._isActive = true;
        this.renderer.removeClass(this.tooltip, 'sr-only');
        this.renderer.setAttribute(this.tooltip, 'aria-hidden', 'false');
        const position = this.getPosition();
        this.renderer.setStyle(this.tooltip, 'top', position.top + 'px');
        this.renderer.setStyle(this.tooltip, 'left', position.left + 'px');
        // Add timeout to close tooltip
        this.hideTimer = setTimeout(() => { this.hide(); }, 5000);
    }
    
    hide() {
        if (this._isActive) {
            clearTimeout(this.hideTimer);
            this.renderer.setAttribute(this.tooltip, 'aria-hidden', 'true');
            this.renderer.addClass(this.tooltip, 'sr-only');
            this._isActive = false;
        }
    }
    
    getPosition(): {top: number, left: number} {
        const viewportOffset = this.element.nativeElement.getBoundingClientRect();
        let x = viewportOffset.x;
        let y = viewportOffset.y;
        switch (this.ukTooltipPosition) {
            case 'bottom':
                y = y + this.element.nativeElement.offsetHeight + this._margin;
                break;
            case 'top':
                y = y - this.tooltip.offsetHeight - this._margin;
                break;
            case 'right':
                x = x + this.element.nativeElement.offsetWidth + this._margin;
                break;
            case 'left':
                x = x - this.tooltip.offsetWidth - this._margin;
                break;
        }
        return { left: x, top: y };
    }
  }
