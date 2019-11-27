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
    // this.subscription = this.filter.getFilter().subscribe(
    //   res => {
    //     console.table(res);
    //   });
    // this.subject$.next("a to jest kania maniania");
  }
  onSearchChange( searchValue: string) {
    console.log(searchValue);
    // console.log(this.filterString);
    // this.filterObject.filterString = searchValue;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
