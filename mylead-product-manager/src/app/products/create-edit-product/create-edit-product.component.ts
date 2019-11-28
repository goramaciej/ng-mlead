import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
// import { tap, map } from 'rxjs/operators';
import { Product } from '../shared/product.model';
import { ProductAddRemoveEdit } from './../../services/product-add-remove-edit.service';


import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';



@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {
  @Input()
  product: Product;

  constructor(private productService: ProductAddRemoveEdit) {

  }
  // @Output()
  // abandon: EventEmitter<boolean> = new EventEmitter<boolean>();

  // @Output()
  // commit: EventEmitter<boolean> = new EventEmitter<boolean>();

  // id: number;
  // name: string;
  // description: string;
  // price: number;
  // imageURL: string;

  ngOnInit() {
    this.product = this.productService.getProductValue();
  }

  commitAdd(event) {
    this.productService.saveEditedProduct(this.product as Product);

    // console.table(this.product['name']);
    // this.commit.emit(true);
      // const newProduct = new Observable<Product>();
      // const per = this.productsCollection.add(newProduct)
      //   .then(() => console.log('product added'))
      //   .catch(() => console.log('problem'))
      //   .then(() => console.log(per));

    //
    // const per = this.productsCollection.doc('my-custom-id').set({name: this.name, description: this.description})

    /*const newProduct = new Product();
    const per = this.productsCollection.add(newProduct)
      .then(() => console.log('product added'))
      .catch(() => console.log('problem'))
      .then(() => console.log(per));*/
  }

  abandonAdd(ev){
    //this.abandon.emit(true);
    this.productService.abandonEdit();
  }

  dropped(ev) {
    const imageUrl = ev.dataTransfer.getData('text/html');
    const rex = /src="?([^"\s]+)"?\s*/;
    const url = rex.exec(imageUrl);
    this.product.imageURL = url[1];
    ev.preventDefault();
    ev.stopPropagation();
  }
  dragover(ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }
}
