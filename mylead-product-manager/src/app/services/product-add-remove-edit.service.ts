import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Product } from '../products/shared/product.model';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';


@Injectable()
export class ProductAddRemoveEdit {
  productsCollection: AngularFirestoreCollection<Product>;

  // private initialProduct: Product = new Product();
  private productTracker = new BehaviorSubject<Product>(null);

  currentProductToAddOrEdit: Product;


  constructor(private fireStore: AngularFirestore) {
    this.productsCollection = this.fireStore.collection('products');
  }

  editProduct(productId: number) {
    const productsDoc = this.productsCollection.doc(productId.toString());
    const selectedProduct = productsDoc.valueChanges();
    const dep = selectedProduct.pipe(take(1)).subscribe(value => {
      this.productTracker.next(value as Product);
    });
  }
  saveEditedProduct(product: Product) {
    const ob = {
      name: product.name,
      id: product.id,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price
    };
    this.productsCollection.doc(product.id.toString()).set(ob).then( () => this.resetProduct());
  }
  abandonEdit() {
    this.productTracker.next(null);
  }

  addNewProduct() {
    const prod = new Product();
    prod.initialize();
    prod.id = Math.floor(Math.random() * 10000000);
    this.productTracker.next(prod);
  }
  removeProduct(productId: number) {
    this.productsCollection.doc(productId.toString()).delete().then( () => console.log('deleted: ' + productId));
  }

  getProduct(): Observable<Product> {
    return this.productTracker.asObservable();
  }
  getProductValue(): Product {
    return this.productTracker.value as Product;
  }

  resetProduct(): void {
    this.productTracker.next(null);
  }
}
