import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from './../products/shared/filter.model';


@Injectable()
export class FilterService {
  private initialFilter: FilterModel = new FilterModel();
  private filterTracker = new BehaviorSubject<FilterModel>(this.initialFilter);

  lowestPrice: number = 10000;
  highestPrice: number = 0;

  constructor() { }

  /** Allows subscription to the behavior subject as an observable */
  getFilter(): Observable<FilterModel> {
    const obs = this.filterTracker.asObservable();
    return obs;
  }

  /**
   * Allows updating the current value of the behavior subject
   * @param val a number representing the current value
   * @param delta a number representing the positive or negative change in current value
   */
  /*setFilter(filter: FilterModel): void {
    this.filterTracker.next(filter);
  }*/

  filterProducts(products: any): any {
    return products.filter( item => {
      const ftValue = this.filterTracker.value;
      if (ftValue.filterString) {
        if (!item.productData.name.toLowerCase().includes(ftValue.filterString.toLowerCase())) {
          return false;
        }
      }
      if (item.productData.price > ftValue.priceMax || item.productData.price < ftValue.priceMin) {
        return false;
      }
      return true;
    });
  }
  filterSetFilterString(fString: string) {
    const ftValue = this.filterTracker.value;
    ftValue.filterString = fString;
    this.filterTracker.next(ftValue);
  }

  setSortingMethod(value: string) {
    const ftValue = this.filterTracker.value;
    ftValue.sortBy = value;
    this.filterTracker.next(ftValue);
  }
  getSortingMethod(): string{
    return this.filterTracker.value.sortBy;
  }
  setPriceMin(value) {
    const ftValue = this.filterTracker.value;
    ftValue.priceMin = value;
    this.filterTracker.next(ftValue);
  }
  setPriceMax(value) {
    const ftValue = this.filterTracker.value;
    ftValue.priceMax = value;
    this.filterTracker.next(ftValue);
  }

  productPrice(value: number){
    // get product price to set lowest and highest prices
    if (value > this.highestPrice) {
      this.highestPrice = value;
    }
    if (value < this.lowestPrice) {
      this.lowestPrice = value;
    }
    console.log(`min: ${this.lowestPrice} :: max: ${this.highestPrice}`);
  }

  resetFilter(): void {
    this.filterTracker.next(this.initialFilter);
  }
}
