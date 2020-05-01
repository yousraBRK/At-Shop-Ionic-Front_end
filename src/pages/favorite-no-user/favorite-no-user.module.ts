import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoriteNoUserPage } from './favorite-no-user';

@NgModule({
  declarations: [
    FavoriteNoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoriteNoUserPage),
  ],
})
export class FavoriteNoUserPageModule {}
