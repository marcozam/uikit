import { EventEmitter } from '@angular/core';

export interface UkFocusable {
    focusedChange: EventEmitter<boolean>;
    focused: boolean;
}

// No Mixin required since it use @Input and @Output