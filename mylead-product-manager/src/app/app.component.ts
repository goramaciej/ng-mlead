import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mylead-product-manager';
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;

  name: string;
  description: string;

  constructor(private fireStore: AngularFirestore) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.productsCollection = this.fireStore.collection('products');
    this.products = this.productsCollection.valueChanges();
  }
  async addProduct() {
    // this.fireStor.collection('products').add({'name': this.name, 'description': this.description});

    const per = this.fireStore.collection('products').doc('my-custom-id').set({'name': this.name, 'description': this.description})
      .then(() => console.log('product added'))
      .catch(() => console.log('problem'))
      .then(() => console.log(per));
  }
}
