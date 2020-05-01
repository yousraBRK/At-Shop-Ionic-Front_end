import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { SerachPage } from '../serach/serach';
import {Storage} from '@ionic/Storage';
import { CartPage } from '../cart/cart';
import { CartUserPage } from '../cart-user/cart-user';
import { MoreComponent } from '../../components/more/more';
import { MoreUserComponent } from '../../components/more-user/more-user';
import { PostProvider } from '../../providers/post/post-to-bd';




@IonicPage()
@Component({
  selector: 'page-list-product-filtre',
  templateUrl: 'list-product-filtre.html',
})
export class ListProductFiltrePage {
products:any;
find:boolean;
click:boolean=false;
component:any;
isUser:boolean;
productFav = new Object();

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage, public popoverControler:PopoverController,public postProvider:PostProvider) {
   this.products =this.navParams.get('produit');
   this.find=this.navParams.get('find');
   this.isAUser();
   if(this.find===true)
   {
    this.isFavorite();
   }
   
   
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProductFiltrePage');
  }

  ionViewWillEnter() 
  {
    this.storage.get('session_storage').then((res)=>{
      if(res ==null)
      {
        
        this.component=MoreComponent; 
      }
      else
      {
       this.component=MoreUserComponent;
      }
  
     }
      
     );
     this.isAUser();
     if(this.find===true)
     {
      this.isFavorite();
     }
    
     
  }

 


  isFavorite()
  {
    console.log("weee");
    this.storage.get("session_storage").then((res)=>
    {
      
      if(res!=null)
      {
          console.log("weeee2");
          let h =0;
          console.log(this.products);
          while(h<this.products.length)
           {
              console.log("weeee3");
              let id=this.products[h]['id_produit'];
              let bodyFav=
                 {
                 username:res.username,
                 id_produit:id,
                 actions:"IsOnFavorite"
                 }
              this.postProvider.postData(bodyFav,'register.php').subscribe((data)=>
                  {
                  this.productFav[id]=data;
                  console.log( this.productFav[id]);
                  console.log(data);
                  }
                );
                h++;
            }
         
      
      }    

      }  
    
    );
    
      
  
  }
  openCart()
  {
    this.storage.get('session_storage').then((res)=>{
      if(res ==null)
      {
        
        this.navCtrl.push(CartPage);
      }
      else
      {
        this.navCtrl.push(CartUserPage);
      }
  
     }
      
     );
  }
  openMore(Myevent) {
    let popover =this.popoverControler.create(this.component);
    popover.present(
      {
        ev:Myevent
      }
    );
  }


  isAUser()
  {
    this.storage.get('session_storage').then((res)=>{
      if(res ==null)
      {
      console.log("its not a user");
      this.isUser=false;   
      }
      else
      {
        this.isUser=true;
      }
  
     }
      
     );
  }     

  ViewDetails(prod) :void
  {
    this.navCtrl.push(DetailsPage,{produit : prod});
  }
  favorite(produit)
  {
    if(this.isUser ===false)
    { 
      if(this.click==false)
    {
      this.click=true;
    }else
    {
      this.click=false;
    }
        }  
        else
        {   
            if(this.productFav[produit['id_produit']]===false) //Ajouter aux favoris
             {
              this.storage.get("session_storage").then((res)=>
              {
               let body=
               {
                 username:res.username,
                 id_produit:produit['id_produit'],
                 actions:"insertIntoFavorite"
               }
               this.postProvider.postData(body,'register.php').subscribe((data)=>
                {
     
                 }
               );
              }
             );
             this.productFav[produit['id_produit']]=true;
             //console.log(this.productFav[30]);
             }
             else
             {
              this.storage.get("session_storage").then((res)=>
              {
               let body=
               {
                 username:res.username,
                 id_produit:produit['id_produit'],
                 actions:"DeleteFromFavorite"
               }
               this.postProvider.postData(body,'register.php').subscribe((data)=>
                {
     
                 }
               );
              
  
  
        
  
              }
             );
             this.productFav[produit['id_produit']]=false;
             //console.log(this.productFav[30]);
             
  
  
             }
          
  
      } 
  }

  openSearch()
 {
   
  this.navCtrl.push(SerachPage);
   
 }
}
