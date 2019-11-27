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
    this.processData();
    this.showData();
  }

  showData() {
    let mapped = this.products.map( actions => {
      console.log(actions);
      return actions;
    });
  }

  processData(filter: string = null, sortType: string = 'name') {
    this.products = this.productsCollection.snapshotChanges().map( actions => {
      let mappedArr =  actions.map( item => {
        /*console.table(item.payload.doc.data());
        console.log(item.payload.doc.id);*/
        const productData = item.payload.doc.data() as Product;
        const id = item.payload.doc.id;
        return { id, productData };
      });
      if (filter) {
        const filteredArr = mappedArr.filter( item => item.productData.name.includes(filter) );
        mappedArr = filteredArr;
      }
      return this.sortArray(mappedArr, sortType);
    });
  }

  sortArray(arr, sortType) {
    switch (sortType) {
      case 'price':
          return arr.sort((a, b) => (a.productData.price > b.productData.price) ? 1 : -1);
      case 'price-desc':
          return arr.sort((a, b) => (a.productData.price < b.productData.price) ? 1 : -1);
      default: // default sort by name
          return arr.sort((a, b) => (a.productData.name > b.productData.name) ? 1 : -1);
    }
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
      // console.log('product added');
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
  filterMe() {
    this.processData(null, 'price');
  }

}
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
