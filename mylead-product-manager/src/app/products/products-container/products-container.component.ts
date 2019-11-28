import { Component, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { take } from 'rxjs/operators';

import { Product } from '../shared/product.model';
import { FilterModel } from '../shared/filter.model';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})
export class ProductsContainerComponent implements OnInit {

  private productsCollection: AngularFirestoreCollection<Product>;
  products: any;

  constructor(private fireStore: AngularFirestore, private filter: FilterService) { }

  ngOnInit() {
    this.productsCollection = this.fireStore.collection('products');
  }

}
