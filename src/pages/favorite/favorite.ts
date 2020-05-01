import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post-to-bd';
import {Storage} from '@ionic/Storage';
import { SerachPage } from '../serach/serach';
import { MoreUserComponent } from '../../components/more-user/more-user';
import { MyProfilePage } from '../my-profile/my-profile';
import { GetProvider } from '../../providers/get/get';
import { Getfrombd } from '../../providers/get/get-from-bd';


@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  FavoriteProducts:any;
  FavoriteEmpty:boolean;
  component:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modal:ModalController,public getfrombd :Getfrombd ,public storage :Storage, public popoverControler:PopoverController,public postProvider:PostProvider) 
  {
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  openProfil()
 {
  this.navCtrl.push(MyProfilePage);
 }

 openSearch()
 {
   console.log("je suis la"); 
  this.navCtrl.push(SerachPage);
   
 }


 ionViewWillEnter() 
 {
         this.storage.get('session_storage').then((res)=>
         {
           
             
             let username=res.username;
             
             
             this.getfrombd.getFavoriteByUser(username).subscribe((data)=>
            {
              
             if(data===null)
              {
               this.FavoriteProducts=[];
               this.FavoriteEmpty=true;
              }
              else 
              {
                this.FavoriteProducts = data;
                console.log(data);
               // console.log(data[0]["id_produit"]);

                
                this.FavoriteEmpty=false;
              }
            });
         }
         );
         this.component=MoreUserComponent;
       
   
 
        

 }
 openMore(Myevent) {
  let popover =this.popoverControler.create(this.component);
  popover.present(
    {
      ev:Myevent
    }
  );
}


 RemoveFromFavorite(id)
 {
  this.storage.get("session_storage").then((res)=>
  {
   let body=
   {
     username:res.username,
     id_produit:id,
   
   }
   let url ="/DeleteFromFavorite";
   this.postProvider.postData(body,url).subscribe((data)=>
    {

     }
   );
  




  }
 );
 this.ionViewWillEnter();
 }
}


