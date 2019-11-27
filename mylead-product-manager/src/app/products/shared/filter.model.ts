export class FilterModel {
  filterString: string;
  sortBy: string;
  priceMin: number;
  priceMax: number;
  constructor() {
    this.filterString = '';
    this.sortBy = 'name';
    this.priceMin = 0;
    this.priceMax = 1000000;
  }
}

/* filter.subscribe( next: (params: ) ) */
