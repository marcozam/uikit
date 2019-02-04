import { EventEmitter } from '@angular/core';

export interface UkCanBeActive {
    activeChange: EventEmitter<boolean>;
    active: boolean;
}