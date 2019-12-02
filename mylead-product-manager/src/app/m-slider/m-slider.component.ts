// import { ReactiveFormsModule } from '@angular/forms';

// import { FormGroup,FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-m-slider',
  templateUrl: './m-slider.component.html',
  styleUrls: ['./m-slider.component.scss']
})
export class MSliderComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 1500;
  options: Options = {
    floor: 0,
    ceil: 1500,
  };

  constructor(private filter: FilterService) {
    // this.options.floor = filter.lowestPrice;
    // this.options.ceil = filter.highestPrice;
    // this.minValue = filter.lowestPrice;
    // this.maxValue = filter.highestPrice;
   }

  ngOnInit() {

  }
  onUserChangeEnd(changeContext: ChangeContext): void {
    this.filter.setPriceMin(changeContext.value);
    this.filter.setPriceMax(changeContext.highValue);
  }
  setNewBoundaries(min: number = 0, hei: number = 100000) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = min;
    newOptions.ceil = hei;
    this.options = newOptions;
    this.minValue = min;
    this.maxValue = hei;
  }
}
