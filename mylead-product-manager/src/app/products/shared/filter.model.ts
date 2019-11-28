export class FilterModel {
  filterString: string;
  sortBy: string;
  priceMin: number;
  priceMax: number;
  constructor() {
    this.filterString = '';
    this.sortBy = 'name'; //price, price-desc
    this.priceMin = 0;
    this.priceMax = 1000000;
  }
}
