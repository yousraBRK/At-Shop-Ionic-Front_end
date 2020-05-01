import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/Storage';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
 
  rootFavorite;
  rootCart;
  rootHome='HomePage';

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage)
  {
      
  }
  
 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.storage.get('session_storage').then((res)=>{
      if(res ==null)
      {
      console.log("its not a user");
      this.rootCart='CartPage';   
      this.rootFavorite= 'FavoriteNoUserPage'
      }
      else
      {
        this.rootCart='CartUserPage';
       this.rootFavorite ='FavoritePage';
      }
  
     }
      
     );
  }
}
