import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FilterModel } from '../products/shared/filter.model';
import { FilterService } from './../services/filter.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input()
  filterObject: FilterModel;

  currentFilter: FilterModel;

  subscription: any;
  constructor(private filter: FilterService) {

  }

  ngOnInit() {
    this.subscription = this.filter.getFilter().subscribe( res => {
      console.log(res);
    });
  }

  onSelectChange(value) {
    this.filter.setSortingMethod(value);
  }
  onSearchChange( searchValue: string) {
    this.filter.filterSetFilterString(searchValue);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
