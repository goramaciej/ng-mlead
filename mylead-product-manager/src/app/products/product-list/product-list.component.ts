import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

import { Product } from './../shared/product.model';
import { FilterService } from './../../services/filter.service';
import { ProductAddRemoveEdit } from './../../services/product-add-remove-edit.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private productsCollection: AngularFirestoreCollection<Product>;
  private subscription: any;
  products: any;
  productsLength = 1;

  constructor(private fireStore: AngularFirestore, private filter: FilterService,
    private productService: ProductAddRemoveEdit) {}

  addNewProduct() {
    this.productService.addNewProduct();
  }

  ngOnInit() {
    // preloader
    this.productsCollection = this.fireStore.collection('products');
    this.subscription = this.filter.getFilter().subscribe(
      res => {
        this.processData();
      }
    );
  }

  processData() {
    this.products = this.productsCollection.snapshotChanges().map( actions => {
      const mappedArr =  actions.map( item => {
        const productData = item.payload.doc.data() as Product;
        const id = item.payload.doc.id;
        this.filter.productPrice(productData.price);
        return { id, productData };
      });
      const filteredArr = this.filter.filterProducts( mappedArr );
      this.productsLength = filteredArr.length;
      return this.sortArray(filteredArr, this.filter.getSortingMethod());
    });
  }
  sortArray(arr, sortType: string) {
    switch (sortType) {
      case 'price':
          return arr.sort((a, b) => (a.productData.price > b.productData.price) ? 1 : -1);
      case 'price-desc':
          return arr.sort((a, b) => (a.productData.price < b.productData.price) ? 1 : -1);
      default: // by default sort by name
          return arr.sort((a, b) => (a.productData.name > b.productData.name) ? 1 : -1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
