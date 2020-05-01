import { Component, OnInit } from '@angular/core';
import { NavController,IonicPage, ModalController, PopoverController, Refresher } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { PubArray} from '../../Models/interface-pubArray';
import { CartPage } from '../cart/cart';
import { SerachPage } from '../serach/serach';
import { MoreComponent } from '../../components/more/more';
import{Storage} from '@ionic/Storage';
import { MoreUserComponent } from '../../components/more-user/more-user';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Getfrombd } from '../../providers/get/get-from-bd';
import { PostProvider } from '../../providers/post/post-to-bd';
import { LoginPage } from '../login/login';
import { MyProfilePage } from '../my-profile/my-profile';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  
  pubEvent:PubArray;
  pubs:PubArray
  Categories:any;
  PortableProducts:any;
  component:any;
  promoProducts: any;
  productsByCat= new Array();
  click:boolean=false;
  isUser:boolean;
  productFav = new Object();
  productCat:any;
  

  constructor(public navCtrl: NavController,
   public modal :ModalController, public popoverControler:PopoverController, private storage:Storage,public menuCtrl:MenuController,public getfrombd:Getfrombd,public postProvider:PostProvider) 
    
   {

  
  }
  ionViewWillEnter() 
  {
    this.storage.get('session_storage').then((res)=>{
      if(res ==null)
      {
        
        this.component=MoreComponent; //Ca c'est pour qu'il m'affiche : se connecter ,mes commandes extr... 
                                       //quand c'est un client et : se deconnecter s'inscrire ectr.. quand il ne l'est pas 
      }
      else
      {
       this.component=MoreUserComponent;
      }
  
     }
      
     );

     this.getPromos();
     this.getPubsEvent();
     this.getPubs();
     this.getCategories();
     this.isAUser();
    
 
   
  }

ngOnInit()
{
  
    this.getPromos();
     this.getPubsEvent();
     this.getPubs();
     this.getCategories();
     this.isAUser();
     
}

 ViewDetails(prod) :void
 {
   this.navCtrl.push(DetailsPage,{produit : prod});
 }

 openCart():void
 {
   //this.modal.create(CartPage).present();
   this.navCtrl.push(CartPage);
 }
 openSearch()
 {
   this.navCtrl.push(SerachPage);
 }
openProfil()
{

  this.storage.get('session_storage').then((res)=>{
    if(res ==null)
    {
     
      this.navCtrl.push(LoginPage);
    }
    else
    {
      
      this.navCtrl.push(MyProfilePage);
    }
    
  }
    
   );
  
  

}
openMenu()
{   
  
  console.log("menu est la");
  
  this.menuCtrl.open();
  
}
 
 openMore(Myevent) {
    let popover =this.popoverControler.create(this.component);
    popover.present(
      {
        ev:Myevent
      }
    );
  }


getPubs()
{
  this.pubs=
  {
    picturesPub:
    [
     'assets/imgs/Pub/ramadan-karim.jpg',
     'assets/imgs/Pub/happyMotherDay.jpg'
    ]
  
  }
 
}

getPromos()
{
  this.getfrombd.getPromoProduct().subscribe (
    data => { 
              this.promoProducts=data;
             
              if(this.isUser===true)
              {
                let i=0;
                while(i<this.promoProducts.length)
                {
                 let id=this.promoProducts[i]['id_produit'];
                 this.storage.get("session_storage").then((res)=>
                     {
                       
                           
                           let username=res.username;
                           let id_produit =id;
                          
                         
                      this.getfrombd.getFavoriteById(username,id_produit).subscribe((data)=>
                            {
                              if( data[0] != null)
                              {
                                this.productFav[id_produit]=true;
                              }
                              else 
                              {
                                this.productFav[id_produit]=false;
                              }
                            
                            
                            }
                          );
                      }
                   );
                 i++;
                }
              }
            
              
            
    
    }
    ,
    error =>{console.log(error);}
  );

}

 getCategories()
 {
  this.getfrombd.getCategories().subscribe(
    data=> {
      this.Categories=data;
      this.SortProductsByCategories(this.Categories);
    }
  );
 }

SortProductsByCategories(Categories)
{
 let j=0;
 for(let i=0; i<Categories.length; i++)
 {
     
        
         let idCat =this.Categories[i]['id_categorie'];
        
        
          this.getfrombd.getProductByCat(idCat).subscribe((data)=>
   
    { 
      if(data !=null)
      {
        this.productCat=data;
        let catAndProd =
        {
          cat:this.Categories[i]['nom_categorie'],
          prod:this.productCat
         
        }
        if(this.isUser===true)
        {
          let h=0;
          while(h<Object.keys(catAndProd.prod).length)
          {
           let id=catAndProd.prod[h]['id_produit'];
           this.storage.get("session_storage").then((res)=>
               {
                
                   let username=res.username;
                   let  id_produit=id;
                     
                   
                this.getfrombd.getFavoriteById(username,id_produit).subscribe((data)=>
                      {
                      
                        if( data[0] != null)
                        {
                          this.productFav[id_produit]=true;
                        }
                        else 
                        {
                          this.productFav[id_produit]=false;
                        }
                      
                      }
                    );
                }
             );
           h++;
          }
        }
       

        this.productsByCat[j]=catAndProd;
        j++;
       
      } 
    }
   
   );
 }
} 


isAUser()
{
  this.storage.get('session_storage').then((res)=>{
    if(res ==null)
    {
    
    this.isUser=false;   
    }
    else
    {
      this.isUser=true;
    }

   }
    
   );
}





 

 getPubsEvent()
 {
  this.pubEvent=
  {
    picturesPub:
    [
     'assets/imgs/Pub/pub1.png',
     'assets/imgs/Pub/pub2.jpg'
    ]
  }
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
                username :res.username,
                id_produit:produit['id_produit']
              }
              let url ="/AddFavorite";
              
             this.postProvider.postData(body,url).subscribe((data)=>
              {
                
                
               }
             );
            }
           );
           this.productFav[produit['id_produit']]=true;
          
           }
           else
           {
            this.storage.get("session_storage").then((res)=>
            {
             let body=
             {
               username:res.username,
               id_produit:produit['id_produit'],
              
             }
             let url = "/DeleteFromFavorite";
             this.postProvider.postData(body,url).subscribe((data)=>
              {
   
               }
             );
            


      

            }
           );
           this.productFav[produit['id_produit']]=false;
          
           
           


           }
          

    } 

  
}
}
