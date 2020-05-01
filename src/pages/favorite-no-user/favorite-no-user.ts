import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MoreComponent } from '../../components/more/more';
import { LoginPage } from '../login/login';
import { SerachPage } from '../serach/serach';

/**
 * Generated class for the FavoriteNoUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite-no-user',
  templateUrl: 'favorite-no-user.html',
})
export class FavoriteNoUserPage {
  component:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverControler:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteNoUserPage');
  }

  ionViewWillEnter() 
  {
    this.component=MoreComponent; 
  }
  openProfil()
 {
  this.navCtrl.push(LoginPage);
 }


  openMore(Myevent) {
    let popover =this.popoverControler.create(this.component);
    popover.present(
      {
        ev:Myevent
      }
    );
  }

  openSearch()
 {
   console.log("je suis la"); 
  this.navCtrl.push(SerachPage);
   
 }

}
