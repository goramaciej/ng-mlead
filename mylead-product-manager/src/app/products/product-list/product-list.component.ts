import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { take } from 'rxjs/operators';

import { Product } from './../shared/product.model';
import { FilterModel } from './../shared/filter.model';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private productsCollection: AngularFirestoreCollection<Product>;
  //productsDoc: AngularFirestoreDocument<Product>;
  products: any;
  private currentFilter: FilterModel;
  private subscription: any;

  constructor(private fireStore: AngularFirestore, private filter: FilterService) {}

  ngOnInit() {
    // preloader
    this.productsCollection = this.fireStore.collection('products');

    this.subscription = this.filter.getFilter().subscribe(
      res => {
        this.processData();
        //console.table(res);
      }
    );
    //
  }

  processData() {
    this.products = this.productsCollection.snapshotChanges().map( actions => {
      const mappedArr =  actions.map( item => {
        const productData = item.payload.doc.data() as Product;
        const id = item.payload.doc.id;
        return { id, productData };
      });
      const filteredArr = this.filter.filterProducts(mappedArr);

      return this.sortArray(filteredArr, 'name');
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
}
