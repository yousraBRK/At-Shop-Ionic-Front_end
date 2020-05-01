import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ToastOptions, AlertController, AlertOptions, ModalController, PopoverController } from 'ionic-angular';
import { CommandPage } from '../command/command';
import { ItemCart } from '../../Models/interface-itemCart';
import {Storage} from '@ionic/Storage';
import { PostProvider } from '../../providers/post/post-to-bd';
import { MoreUserComponent } from '../../components/more-user/more-user';
import { SerachPage } from '../serach/serach';
import { MyProfilePage } from '../my-profile/my-profile';
import { Getfrombd } from '../../providers/get/get-from-bd';


/**
 * Generated class for the CartUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-user',
  templateUrl: 'cart-user.html',
})
export class CartUserPage {
  cartItems: any;
 totalPrice:number;
 isUser:boolean =false;
 cartEmpty:boolean;
 component:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl :ViewController , public storage: Storage,public toast :ToastController,public alertCtrl:AlertController ,public modal:ModalController,public postProvider:PostProvider,public popoverControler:PopoverController,public getfrombd:Getfrombd) 
  {
    
   
  
  }

 
  
  ngOnInit()
  {
   
    
  }
ionViewWillEnter() 
{
        this.storage.get('session_storage').then((res)=>
        {
         
            
            let  username=res.username;
           
            
            
            this.getfrombd.getCartProducts(username).subscribe((data)=>
           {
             
             if(Object.keys(data).length===0)
             {
              this.cartItems=[];
              this.cartEmpty=true;
             }
             else 
             {
               this.cartItems =data;
               
               this.cartEmpty=false;
             }
           }
            
           );
          }
        );
      
        this.component=MoreUserComponent;
  
}
openSearch()
 {
   console.log("je suis la"); 
  this.navCtrl.push(SerachPage);
   
 }


openMore(Myevent) {
  let popover =this.popoverControler.create(this.component);
  popover.present(
    {
      ev:Myevent
    }
  );
}
  closeModal() :void
  {
  this.viewCtrl.dismiss();
  }

  RemoveFromCart(item:ItemCart):void
  {
    const alertOptions :AlertOptions =
    {
    title: "Attention !",
    subTitle:"Etes vous sur de vouloir retirer "+ item['modele']+" du panier ?",
    buttons:
    [
      {
        text: "Annuler",
        role:"cancel"
      },

      {
        text: "Confirmer",
        handler: () => {
           this.RemoveItem(item);
           this.ionViewWillEnter();
        }
        
        },


    ],
    enableBackdropDismiss:false
}
   this.alertCtrl.create(alertOptions).present();
    }
    
  
RemoveItem(item)
{  
  /*this.storage.get('session_storage').then((res)=>
        {
          let body=
            {
             username:res.username,
             id_produit:item['id_produit'],
             prix:item['prix'],
             actions:"RemoveFromCart"
            }
            this.postProvider.postData(body,'register.php').subscribe((data)=>
           {
             
             
           }); 
        }
        );

    
    const options:ToastOptions=
   {
      message: "Produit supprimé du panier!",
    duration: 1500,
    showCloseButton:false,
    dismissOnPageChange:false
    }
    this.toast.create(options).present(); 
    
  */
}

openProfil()
 {
  this.navCtrl.push(MyProfilePage);
 }
  
 openCommand()
 {
   if(this.cartEmpty)
   {
    let alert = this.alertCtrl.create(
      {
     
     title:"ATTENTION",
     
     subTitle:"Votre panier est vide !",
     
     buttons: ['OK']
     
     }
     );
   
   alert.present();
   }
   else
   this.navCtrl.push(CommandPage);
 }
}
