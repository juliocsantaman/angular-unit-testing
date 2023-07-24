import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  subject$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private valueService: ValueService
  ) { }


  getValue() {
    return this.valueService.getValue();
  }

  setNumbers$(numbers: any) {
    this.subject$.next(numbers);
  }

  getNumbers$() {
    return this.subject$.asObservable();
  }

}
