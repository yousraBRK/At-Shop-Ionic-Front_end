import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { FiltresPage } from '../filtres/filtres';
import { PostProvider } from '../../providers/post/post-to-bd';
import { DetailsPage } from '../details/details';
import { SerachPage } from '../serach/serach';
import { MoreComponent } from '../../components/more/more';
import { MoreUserComponent } from '../../components/more-user/more-user';
import {Storage} from '@ionic/Storage';
import { CartPage } from '../cart/cart';
import { CartUserPage } from '../cart-user/cart-user';
import { Getfrombd } from '../../providers/get/get-from-bd';


/**
 * Generated class for the ListProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
})
export class ListProductPage implements OnInit {

 
  categorie:any;
  title:string;
  num:number;
  CatOrSubCat= new Array();
  id:any;
  keys:any;
  products:any;
  click:boolean=false;
  component:any;
  productFav = new Object();
  isUser:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams , public postProvider:PostProvider, public popoverControler:PopoverController,public storage:Storage,public getfrombd:Getfrombd) {
    
    this.categorie=this.navParams.get('subCategorie');
    this.CatOrSubCat=(<any>Object).values(this.categorie);
    this.title=(this.CatOrSubCat[1]);
    this.id=(this.CatOrSubCat[0]);
    this.keys=Object.keys(this.categorie);
    

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
     this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProductPage');
  }

  ngOnInit()
  {
   
  
  }
  openFiltre()
  {
    this.navCtrl.push(FiltresPage ,{categorie:this.categorie});  
  }
   
  getProducts()
  {
    if(this.keys[0]==="id_categorie")
       {
      
         
           let  idCat=this.categorie['id_categorie'];
           
          
         this.getfrombd.getProductByCat(idCat).subscribe((data)=>
           {
             if(data=== null)
               {
                 console.log('categorie vide');
               }
             else 
              {
                this.products=data;
                if(this.isUser===true)
                {
                  let h =0;
                  while(h<this.products.length)
                  {
                   let id=this.products[h]['id_produit'];
                   this.storage.get("session_storage").then((res)=>
                       {
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
                             // console.log(data);
                              }
                            );
                        }
                     );
                   h++;
                  }    
                }
               








              }
           }
         );
 
    }
  else 
        if(this.keys[0]==="id_scategorie")
          {
           let body=
            {
              idCat:this.categorie['id_scategorie'],
              actions:'getSubPro'
            }
            this.postProvider.postData(body,'register.php').subscribe((data)=>
             {
               if(data=== null)
                {
               console.log('categorie vide');
               }
             else 
            {
              this.products=data;
              if(this.isUser===true)
              {
                let h=0;
                while(h<this.products.length)
                {
                 let id=this.products[h]['id_produit'];
                 this.storage.get("session_storage").then((res)=>
                     {
                       let bodyFav=
                           {
                           username:res.username,
                           id_produit:id,
                           actions:"IsOnFavorite"
                         }
                      this.postProvider.postData(bodyFav,'register.php').subscribe((data)=>
                            {
                          //    console.log(data);
                            this.productFav[id]=data;
                            console.log( this.productFav[id]);
                            }
                          );
                      }
                   );
                 h++;
                }    
              }
             

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
  

  openSearch()
 {
   
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






}
