import { Input, ViewChild, TemplateRef, HostBinding, EventEmitter, Output } from '@angular/core';
import { coerceBooleanProperty } from '../../../helpers';
import { 
    UkCanDisabled,
    UkCanBeActive,
    UkCanBeSelected
} from '../../behaviors';
// Components
import { UkGenericComponent } from './uk-generic.component';

export abstract class UkChildItemComponent extends UkGenericComponent
    implements UkCanDisabled, UkCanBeActive, UkCanBeSelected {

    index: number;

    constructor(componentName: string) { 
        super(componentName);
        this.index = -1; 
    }
    
    // ===> Manages UI <===
    @Input('label') textLabel: string;
    @ViewChild(TemplateRef) content: TemplateRef<any>;
    
    // ===> Manage Disable State <===
    protected _disabled = false;
    @Output() disabledChange: EventEmitter<boolean> = new EventEmitter();
    @Input() @HostBinding('attr.disabled')
    get disabled() { return this._disabled; }
    set disabled(value: boolean) {
        if (value !== this._disabled) {
            this._disabled = coerceBooleanProperty(value);
            this.disabledChange.emit(this.disabled);
        }
    }

    // ===> Manage Active State <===
    private _active: boolean;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();
    @Input() @HostBinding('class.uk-active')
    get active() { return this._active; }
    set active(value: boolean) {
        if (value !== this._active) {
            this._active = coerceBooleanProperty(value);
            this.activeChange.emit(this.active);
        }
    }

    // ===> Manage Selected State <===
    private _selected = false;
    @Output() selectedChange: EventEmitter<boolean> = new EventEmitter();
    @Input() @HostBinding('class.uk-selected')
    get selected() { return this._selected; }
    set selected(value: boolean) {
        if (value !== this._selected) {
            this._selected = coerceBooleanProperty(value);
            this.selectedChange.emit(this.selected);
        }
    }
}