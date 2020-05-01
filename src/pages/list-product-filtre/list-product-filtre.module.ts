import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductFiltrePage } from './list-product-filtre';

@NgModule({
  declarations: [
    ListProductFiltrePage,
  ],
  imports: [
    IonicPageModule.forChild(ListProductFiltrePage),
  ],
})
export class ListProductFiltrePageModule {}
