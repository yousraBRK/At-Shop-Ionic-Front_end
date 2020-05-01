import { Component } from '@angular/core';
import {Storage} from '@ionic/Storage';
import { HomePage } from '../../pages/home/home';
import { NavController, ToastController } from 'ionic-angular';
import { MenuPage } from '../../pages/menu/menu';

/**
 * Generated class for the MoreUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'more-user',
  templateUrl: 'more-user.html'
})
export class MoreUserComponent {

  text: string;

  constructor(private storage:Storage, public navCtrl: NavController,public toastCtrl :ToastController) {
    console.log('Hello MoreUserComponent Component');
    
  }
  logOut()
  {
    this.storage.set('session_storage',null);
    this.navCtrl.push(MenuPage);
      // je  pense que le problme est la si j'enleve set root ca bug pas mais la page matweliche ta3 un client 
    
     //lokan je fais setRoot home page les tabs ywelo maybanoche ni le menu..
    const toast=this.toastCtrl.create(
      {
    message:'Deconnexion...',
    duration:2000
      }
   );

     toast.present();
     
     //window.location.reload();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  openCommands()
  {

  }
}
