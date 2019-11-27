import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input()
  product: Product;

  @Input()
  adminMode = true;

  @Output()
  deleteProductEv: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  editProductEv: EventEmitter<number> = new EventEmitter<number>();

  logProduct() {
    console.table(this.product.id);
  }

  format(what: number): string {
    return what.toFixed(2).toString().replace('.', ',');
  }

  editProduct() {
    this.editProductEv.emit(this.product.id);
  }

  deleteProduct() {
    this.deleteProductEv.emit(this.product.id);
  }
}
