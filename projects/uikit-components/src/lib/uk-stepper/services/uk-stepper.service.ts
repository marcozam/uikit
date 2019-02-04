import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UkStepperService {
    private moveTrigger: Subject<number> = new Subject();
    get trigger(): Observable<number> { return this.moveTrigger.asObservable(); }
    moveStep(position){ this.moveTrigger.next(position); }
}