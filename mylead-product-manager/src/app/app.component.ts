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

import { Product } from './products/shared/product.model';
import { FilterModel } from './products/shared/filter.model';
import { FilterService } from './services/filter.service';

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

  filterObject: FilterModel = new FilterModel();

  constructor() {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

  }

  editProductEv(productId) {
    this.productsDoc = this.productsCollection.doc(productId.toString());
    this.selectedProduct = this.productsDoc.valueChanges();
    const dep = this.selectedProduct.pipe(take(1)).subscribe(value => {
      this.newEditProduct = value;
    });
    this.blockScroll();
  }

  getProduct(productId) {
    this.productsDoc = this.productsCollection.doc(productId);
    this.selectedProduct = this.productsDoc.valueChanges();
  }

  deleteProductEv(productId) {
    this.productsCollection.doc(productId.toString()).delete().then( () => console.log('deleted'));
  }
  addNewProduct() {
    this.newEditProduct = new Product();
    this.newEditProduct.initialize();
    this.newEditProduct.id = Math.floor(Math.random() * 10000000);
    this.blockScroll();
  }
  addCommited(ev) {
    console.log('addCommited');
    const per = this.productsCollection.doc(this.newEditProduct.id.toString()).set({
      name: this.newEditProduct.name,
      id: this.newEditProduct.id,
      description: this.newEditProduct.description,
      imageURL: this.newEditProduct.imageURL,
      price: this.newEditProduct.price,
    }).then( () => {
      this.newEditProduct = null;
      this.unBlockScroll();
    });
  }
  addAbandoned(ev) {
    this.newEditProduct = null;
    this.unBlockScroll();
  }

  blockScroll() {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    console.log(scrollY);
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
  }
  unBlockScroll() {
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, 250 * -1);
    // document.getElementById('dialog').classList.remove('show');
  }
}
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
