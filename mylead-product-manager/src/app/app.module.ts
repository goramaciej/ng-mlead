import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CreateEditProductComponent } from './products/create-edit-product/create-edit-product.component';
import { ProductsContainerComponent } from './products/products-container/products-container.component';
import { ProductItemComponent } from './products/product-item/product-item.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAJWN3DywIZ1H9b9oNpar_oHeUiqqw28-4',
  authDomain: 'ng-mylead-products.firebaseapp.com',
  databaseURL: 'https://ng-mylead-products.firebaseio.com',
  projectId: 'ng-mylead-products',
  storageBucket: 'ng-mylead-products.appspot.com',
  messagingSenderId: '958129577292',
  appId: '1:958129577292:web:370c41a074b72865d603e9',
};


@NgModule({
  declarations: [
    AppComponent,
    CreateEditProductComponent,
    ProductsContainerComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
