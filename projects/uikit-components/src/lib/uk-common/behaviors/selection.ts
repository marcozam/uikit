import { EventEmitter } from '@angular/core';

export interface UkCanBeSelected {
    selectedChange: EventEmitter<boolean>;
    selected: boolean;
}