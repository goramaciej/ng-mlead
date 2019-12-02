import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FilterModel } from '../products/shared/filter.model';
import { FilterService } from './../services/filter.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  minPrice: number;
  maxPrice: number;

  @Input()
  filterObject: FilterModel;
  currentFilter: FilterModel;

  subscription: any;
  constructor(private filter: FilterService) {

  }

  ngOnInit() {
    this.subscription = this.filter.getFilter().subscribe( res => {
      // console.log(res);
    });
  }

  onSelectChange(value: string) {
    this.filter.setSortingMethod(value);
  }
  onSearchChange( searchValue: string) {
    this.filter.filterSetFilterString(searchValue);
  }
  onMinPrice(value: number) {
    console.log(value < 1);
    this.filter.setPriceMin(value);
  }
  onMaxPrice(value: number) {
    let val = value;
    this.filter.setPriceMax(val);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
