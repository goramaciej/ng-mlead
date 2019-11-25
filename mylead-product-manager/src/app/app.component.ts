import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { take } from 'rxjs/operators';

import { Product } from './products/shared/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mylead-product-manager';
  productsCollection: AngularFirestoreCollection<Product>;
  // products: Observable<Product[]>;
  products: any;

  productsDoc: AngularFirestoreDocument<Product>;
  selectedProduct: Observable<Product>;

  newEditProduct: Product = null;


  constructor(private fireStore: AngularFirestore) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.productsCollection = this.fireStore.collection('products');
    // this.products = this.productsCollection.valueChanges(); //when we don't need id
    /// to get some sort of data:
    // this.productsCollection = this.firestore.collection('products', ref => {
    //   ref.where('title', '==', 'product');
    // })
    this.products = this.productsCollection.snapshotChanges().map( actions => {
      return actions.map( item => {
        /*console.table(item.payload.doc.data());
        console.log(item.payload.doc.id);*/
        const productData = item.payload.doc.data() as Product;
        const id = item.payload.doc.id;
        return { id, productData };
      });
    });
  }

  editProduct(productId) {
    this.productsDoc = this.productsCollection.doc(productId);
    this.selectedProduct = this.productsDoc.valueChanges();
    const dep = this.selectedProduct.pipe(take(1)).subscribe(value => {
      this.newEditProduct = value;
    });
  }

  getProduct(productId) {
    this.productsDoc = this.productsCollection.doc(productId);
    this.selectedProduct = this.productsDoc.valueChanges();
  }

  deleteProduct(productId) {
    this.productsCollection.doc(productId).delete().then( () => console.log('deleted'));
  }
  addNewProduct() {
    this.newEditProduct = new Product();
    this.newEditProduct.initialize();
    this.newEditProduct.id = Math.floor(Math.random() * 10000000);
  }
  addCommited(ev) {
    const per = this.productsCollection.doc(this.newEditProduct.id.toString()).set({
      name: this.newEditProduct.name,
      id: this.newEditProduct.id,
      description: this.newEditProduct.description,
      imageURL: this.newEditProduct.imageURL,
      price: this.newEditProduct.price,
    }).then( () => {
      // console.log('product added');
      this.newEditProduct = null;
    });
  }
  addAbandoned(ev) {
    this.newEditProduct = null;
  }
}
