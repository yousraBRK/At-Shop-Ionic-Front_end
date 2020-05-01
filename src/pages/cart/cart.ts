import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ToastOptions, AlertController, AlertOptions, ModalController, PopoverController } from 'ionic-angular';
import { ItemCart } from '../../Models/interface-itemCart';
import {Storage} from '@ionic/Storage';
import { PostProvider } from '../../providers/post/post-to-bd';
import { MoreComponent } from '../../components/more/more';
import { SerachPage } from '../serach/serach';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage implements OnInit {

 cartItems: any;
 totalPrice:number;
 cartEmpty:boolean;
 component:any;
 



  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl :ViewController , public storage: Storage,public toast :ToastController,public alertCtrl:AlertController ,public modal:ModalController,public postProvider:PostProvider,public popoverControler:PopoverController) 
  {
   
   
  
  }

  
  
  ngOnInit()
  {
   
    
  }



  

ionViewWillEnter() 
{
  
      this.storage.get("cart").then((data:ItemCart[]) =>
        {
          if(data.length!=0)
          {
          this.cartItems=data;
         
          this.totalPrice=0;
          for(let i=0;i<=this.cartItems.length;i++)
               {
                this.totalPrice=this.totalPrice+(this.cartItems[i].qty* this.cartItems[i].item['prix']);
              }
              this.cartEmpty=false;
       }
       else 
       {
         this.cartEmpty=true
       }
       }
          )
   .catch(Err => 
        {
        console.log("Erreur"+Err);
        }
        );
        this.component=MoreComponent; 
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

  closeModal() :void
  {
  this.viewCtrl.dismiss();
  }

  RemoveFromCart(item:ItemCart,index:number):void
  {
    const alertOptions :AlertOptions =
    {
    title: "Attention !",
    subTitle:"Etes vous sur de vouloir retirer "+ item.item['modele']+" du panier ?",
    buttons:
    [
      {
        text: "Annuler",
        role:"cancel"
      },

      {
        text: "Confirmer",
        handler: () => { this.RemoveItem(item,index); }
        
        },


    ],
    enableBackdropDismiss:false
}
   this.alertCtrl.create(alertOptions).present();
    }
    
  
RemoveItem(item,index)
{

   if(item.qty>1)  
   {
     this.cartItems[index].qty=this.cartItems[index].qty-1;
     this.storage.set("cart",this.cartItems).then((data)=>
      {
       const options:ToastOptions=
       {
       message: "Votre panier à  été mis à jour!",
      duration: 1500,
     showCloseButton:false,
     dismissOnPageChange:false
     }
     this.toast.create(options).present();
     this.totalPrice=this.totalPrice-this.cartItems[index].item['prix'];

   }
     );
  }else
    {
    
    this.cartItems.splice(index,1);
    this.storage.set("cart",this.cartItems).then((data)=>
    {
    const options:ToastOptions=
     {
    message: "Produit supprimé du panier!",
    duration: 1500,
    showCloseButton:false,
    dismissOnPageChange:false
    }
    this.toast.create(options).present();
    }
    )
    .catch((Err) =>
    {
      const options:ToastOptions=
     {
        message: "n'a pas pu etre supprimé : "+Err,
      duration: 1500,
      showCloseButton:false,
      dismissOnPageChange:false
      }
      this.toast.create(options).present();
      this.totalPrice=this.totalPrice-this.cartItems[index].item['prix'];
      }
    )
    }
}

openProfil()
 {
  this.navCtrl.push(LoginPage);
 }
  
 openCommand()
 {
  let alert = this.alertCtrl.create(
    {
   
   title:"Ops",
   
   subTitle:"Vous n'êtes pas connecté pour effectuer cette action !",
   
   buttons: ['OK']
   
   }
   );
 
 alert.present();
}
}