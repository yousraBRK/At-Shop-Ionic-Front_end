import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastOptions, ToastController, Searchbar, PopoverController } from 'ionic-angular';
import {Storage} from '@ionic/Storage';
import { ItemCart } from '../../Models/interface-itemCart';
import { PostProvider } from '../../providers/post/post-to-bd';
import { SerachPage } from '../serach/serach';
import { MoreComponent } from '../../components/more/more';
import { MoreUserComponent } from '../../components/more-user/more-user';
import { Getfrombd } from '../../providers/get/get-from-bd';



@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage implements OnInit {

  produitDetail :any;
  note:number;
  added:boolean =false;
  isUser:boolean= false;
  click:boolean=false;
  cartProducts:any;
  qte :number =1;
  component:any;
  onFavorite:any;
  dispo:boolean;
 

  constructor(public navCtrl: NavController, public navParams: NavParams ,public event:Events , public storage :Storage ,public  toast:ToastController,public postProvider:PostProvider, public popoverControler:PopoverController,public getfrombd :Getfrombd)  {
    this.produitDetail=this.navParams.get('produit');
   
    if(this.produitDetail['disponible']==='0')
    {
     this.dispo=false;
    }
    else 
    {
      this.dispo=true;
    }
   console.log(this.dispo);
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
     
     
       let username=res.username;
       let id_produit=this.produitDetail['id_produit'];
      
     
     
     this.getfrombd.getFavoriteById(username,id_produit).subscribe((data)=>
      {
          if(data[0]!=null)
          {
            this.onFavorite=true;
          }
          else 
           {
             this.onFavorite=false;
           }
       }
     );

    }

   }
    
   );

}


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
 
 
 ngOnInit()
 {
   this.isAUser();
  
 }
 
  goBack():void 
 {
   this.navCtrl.pop();
 }
 
isAUser()
{
  this.storage.get('session_storage').then((res)=>{
    if(res ==null)
    {
    console.log("its not a user");
    this.isUser=false;     }
    else
    {
      this.isUser=true;
    }

   }
    
   );
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


addToCartNew()
{
  //Ajouter un produit au panier
   
   this.storage.get('session_storage').then((res)=>{
    let body =
    {
    username:res.username,
    id_produit:this.produitDetail["id_produit"],
    qte_produit:this.qte,
    
    }
    let url="/AddToCartNew";
    this.postProvider.postData(body,url).subscribe((data)=>
     {
       console.log("am on post for cart");
       if(data===null)
       {
         console.log("erreur");
       }
       else
       {
       let options :ToastOptions=
       {
         message: "Votre panier a été mis à jour !",
         duration: 1500,
         showCloseButton:true,
         closeButtonText:"Fermer"
        
       }
     this.toast.create(options).present();
     }
    }
  );  
}
);   
}
 getCartsProducts(): any
    {
     
     this.storage.get('session_storage').then((res)=>
      {
       
           let username=res.username;
         
          
        this.getfrombd.getCartProducts(username).subscribe((data)=>
         {
            if (Object.keys(data).length===null)
             { 
              this.cartProducts=null;
              return null;
        
             }
            else 
             {
              this.cartProducts=data;
              this.existOnCart(data)
             }
       });
     }
    );
 
 }

 existOnCart(cartProducts)
 {
   let id =null;
   let i =0 
   let find =false;
     while((i<cartProducts.length) && (find===false))
     {
       if(cartProducts[i]===this.produitDetail['id_produit'])
       {
         find=true;
         id=cartProducts[i];
       } 
     }
      console.log(find);
      
      
  }



 addToCart(produitDetail) 
  {
   
    if(this.isUser ===false)
    { 
       console.log("user = false");

         this.storage.get("cart").then((data:ItemCart[])=>
          
         {
             if(data===null || data.length ===0)
              {
               console.log("data =null");
               data=[];
               data.push(
                {
                item:produitDetail,
                qty:this.qte,
                amount:produitDetail['prix']
                }
                        );
              this.added=true;
             }
            else 
             { 
               console.log("data non null");
               console.log(data);
               let i=0;
               while (i<data.length && this.added ===false)
                {
                  const element :ItemCart=data[i];
                  if(element.item['id_produit']===produitDetail['id_produit'])
                  {
                   element.qty=element.qty+this.qte;
                   element.amount=element.amount+produitDetail['prix'];
                   this.added=true;
                   console.log("l'element existe dans le panier");
                  }
                  i++;
               }
               if(!this.added)
                {
                  console.log("l'element n'existe pas dans le panier est data non null");
                  data.push(
                  {
                   item:produitDetail,
                   qty:this.qte,
                  amount:produitDetail['prix']  
                  }
                          );
                  this.added=true;
                }
            }
          
         
        this.storage.set("cart",data).then
        (data => {
          let options :ToastOptions=
          {
            message: "Votre panier a été mis à jour !",
            duration: 1500,
            showCloseButton:true,
            closeButtonText:"Fermer"
           
          }
        this.toast.create(options).present();
        }
        )
        .catch (err => {
          console.log("Erreur" +err);
                      }
                )    
            }
        );
      }
     else // its a user
      {
       
         this.storage.get('session_storage').then((res)=>
           {
          
            let username=res.username;
            
            this.getfrombd.getCartProducts(username).subscribe((data)=>

              {
                console.log(data);
               if (Object.keys(data).length==0)
                { 
                  console.log("data nuk");
                 this.cartProducts=null;  
                 this.addToCartNew();
               }
               else 
               {
                console.log(data[0]["id_produit"],"here");
                 
                 let i=0; 
                 let find =false;
                 this.cartProducts=data;
                 
                 console.log(this.cartProducts[0]['id_produit']);
                 
                while((i<this.cartProducts.length) && (find===false))
                {
                  if(this.cartProducts[i]['id_produit']===this.produitDetail['id_produit'])
                  {
                    find=true;
                    
                  } 
                  i++;
                }
                console.log(find);
                if(find ===false)
                 {
                   this.addToCartNew();
                 }
                 else 
                 {
                   let body =
                   {
                     username:res.username,
                     id_produit:this.produitDetail['id_produit'],
                     qte_produit:this.qte
                     

                   }
                   let url="/UbdateCart";
                     this.postProvider.postData(body,url).subscribe((data=>
                      {
                       if(Object.keys(data).length!=null)
                        {
                           let options :ToastOptions=
                          {
                           message: "Votre panier à bien etait mis à jour !",
                           duration: 2000,
                          }
                          this.toast.create(options).present();
                        } 
                      }
                    )
                   );
                        
                     
                     
                 }
                
                 
               }
         });
       }
      );
  
       








     }

  this.added=false;

}
favorite()
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
          if(this.onFavorite===true) //delete from favorite
          {
            this.storage.get("session_storage").then((res)=>
            {
             let body=
             {
               username:res.username,
               id_produit:this.produitDetail['id_produit'],
              
             }
            let url= "/DeleteFromFavorite";
             this.postProvider.postData(body,url).subscribe((data)=>
              {
   
               }
             );

            }
           );
          }
          else
          {

            this.storage.get("session_storage").then((res)=>
            {
             let body=
             {
               username:res.username,
               id_produit:this.produitDetail['id_produit'],
             }
             let url="/AddFavorite";
             this.postProvider.postData(body,url).subscribe((data)=>
              {
   
               }
             );

            }
           );
          }
         this.ionViewWillEnter();
        
        }



}

plusQte()
{
  if(this.qte<10)
  {
    this.qte=this.qte+1;
    console.log(this.qte);
  }
  
}
minusQte()
{
  if(this.qte>1)
  {
    this.qte=this.qte-1;
    console.log(this.qte);
  }
 
}
}