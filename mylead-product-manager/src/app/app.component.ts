import { Component, OnInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
//import { take, map } from 'rxjs/operators';
import { ProductAddRemoveEdit } from './services/product-add-remove-edit.service';

import { Product } from './products/shared/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mylead-product-manager';
  productsCollection: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;
  selectedProduct: Observable<Product>;

  newEditProduct: Product = null;

  subscription: any;

  constructor(private productService: ProductAddRemoveEdit) {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subscription = this.productService.getProduct().subscribe( res => {
      this.newEditProduct = res;
      if (res){
        this.blockScroll();
      }else{
        this.unBlockScroll();
      }
    });
  }
  addNewProduct(){
    console.log('addNewProduct');
    this.productService.addNewProduct();
  }
  addCommited(ev) {
    // const per = this.productsCollection.doc(this.newEditProduct.id.toString()).set({
    //   name: this.newEditProduct.name,
    //   id: this.newEditProduct.id,
    //   description: this.newEditProduct.description,
    //   imageURL: this.newEditProduct.imageURL,
    //   price: this.newEditProduct.price,
    // }).then( () => {
    //   this.newEditProduct = null;
    //   this.unBlockScroll();
    // });
  }
  /*addAbandoned(ev) {
    this.newEditProduct = null;
    this.unBlockScroll();
  }*/

  blockScroll() {
    console.log('blockScroll');
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
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
// window.addEventListener('scroll', () => {
//   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
// });
