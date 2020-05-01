import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ToastOptions } from 'ionic-angular';
import {Storage} from '@ionic/Storage';
import { PostProvider } from '../../providers/post/post-to-bd';
import { CartUserPage } from '../cart-user/cart-user';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConfirmercomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmercom',
  templateUrl: 'confirmercom.html',
})
export class ConfirmercomPage implements OnInit{

  Commande:any;
  username:any;
  name:any;
  firstName:any;
  numTel:any;
  wilaya:any;
  Cart:any;
  wilayaPrice:any;
  totalCommand:any;
  totalCart:any;
  wilayaData:any;
  adresse:any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public postProvider:PostProvider,public toast:ToastController) {
   this.Commande=this.navParams.get('body');
   console.log(this.Commande);
   this.name=this.Commande.Name;
   this.firstName=this.Commande.FirstName;
   this.numTel=this.Commande.NumTel;
   this.wilaya=this.Commande.Wilaya;
   this.username=this.Commande.username;
   this.adresse=this.Commande.Adresse;
  
    
  }
  ngOnInit()
  { 
    /*
    let body=
    {
      username:this.username,
      actions:"getTotalCard"
    }

    this.postProvider.postData(body,'register.php').subscribe((data)=>
    {
      this.Cart=data.panier;
      this.totalCart=this.Cart[0]['total'];


      let body2=
      {
        wilaya:this.wilaya,
        actions:"getWilayaPrice"
      }
      this.postProvider.postData(body2,'register.php').subscribe((data)=>
      {
      this.wilayaData=data.wilaya;
      this.wilayaPrice=this.wilayaData[0]['frais_liv'];
  
      this.totalCart=parseInt(this.totalCart, 10);
      this.wilayaPrice=parseInt(this.wilayaPrice, 10);
      this.totalCommand=this.wilayaPrice+this.totalCart;


    


      }
      );



      
    }
    );
    
   */
  }

  


  InsertCommand()
    {
      
      console.log(this.totalCommand);
      let body=
      {
        username:this.username,
        wilaya:this.wilaya,
        total:this.totalCommand,
        adresse:this.adresse,
        actions:'insertCommand'
      }
       this.postProvider.postData(body,'register.php').subscribe((data)=>
      
     {
         if(data!=null)
         {
            const options:ToastOptions=
            {
             message:"Votre commande à bien été enregistrer !",
             duration: 2000,
            showCloseButton:false,
           dismissOnPageChange:false
          }
         this.toast.create(options).present();
  
      }
      else
      {
        const options:ToastOptions=
            {
             message: "Oups, veuillez réesseyez s'il vous plait",
             duration: 2000,
             showCloseButton:false,
             dismissOnPageChange:false
          }
         this.toast.create(options).present();
      }


    }
      );
    this.navCtrl.push(HomePage);
    }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmercomPage');
  }

}
