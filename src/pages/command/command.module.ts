import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandPage } from './command';

@NgModule({
  declarations: [
    CommandPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandPage),
  ],
})
export class CommandPageModule {}
