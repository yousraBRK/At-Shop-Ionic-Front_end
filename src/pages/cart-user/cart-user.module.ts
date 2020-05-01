import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartUserPage } from './cart-user';

@NgModule({
  declarations: [
    CartUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CartUserPage),
  ],
})
export class CartUserPageModule {}
