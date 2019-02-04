import { EventEmitter } from '@angular/core';

export interface UkCanDisabled {
    disabledChange: EventEmitter<boolean>;
    disabled: boolean;
}

// No Mixin required since it use @Input and @Output