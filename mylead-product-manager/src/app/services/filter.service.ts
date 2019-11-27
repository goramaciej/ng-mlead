import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from './../products/shared/filter.model';


@Injectable()
export class FilterService {

  constructor() { }

  private initialFilter: FilterModel = new FilterModel();
  private filterTracker = new BehaviorSubject<FilterModel>(this.initialFilter);

  /** Allows subscription to the behavior subject as an observable */
  getFilter(): Observable<FilterModel> {
    let obs = this.filterTracker.asObservable();
    return obs;
    // this.filterTracker.asObservable();
  }

  /**
   * Allows updating the current value of the behavior subject
   * @param val a number representing the current value
   * @param delta a number representing the positive or negative change in current value
   */
  setFilter(filter: FilterModel): void {
    this.filterTracker.next(filter);
  }

  /** Resets the count to the initial value */
  resetCount(): void {
    this.filterTracker.next(this.initialFilter);
  }
}
