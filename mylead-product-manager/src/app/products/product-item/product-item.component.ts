import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductAddRemoveEdit } from '../../services/product-add-remove-edit.service';

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

  constructor(private productService: ProductAddRemoveEdit) {

  }

  format(what: number): string {
    return what.toFixed(2).toString().replace('.', ',');
  }

  editProduct() {
    this.productService.editProduct(this.product.id);
  }

  deleteProduct() {
    this.productService.removeProduct(this.product.id);
  }
}
