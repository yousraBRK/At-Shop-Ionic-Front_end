import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post-to-bd';
import { DetailsPage } from '../details/details';
import {Storage} from '@ionic/Storage';

/**
 * Generated class for the SerachPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serach',
  templateUrl: 'serach.html',
})
export class SerachPage {


  result :number;
  products:any;
  click:boolean=false;
  productFav = new Object();
  isUser:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postProvider :PostProvider, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SerachPage');
  }
  ionViewWillEnter() 
  {
    this.isAUser();
  }


  getItems(event :any)
  {
   /* 
   let body =
   {
     term:event.target.value,
     actions:"reserch"
   }
   
   let url="";
   this.postProvider.postData(body,url).subscribe((data)=>
   {
     
      if(data===null )
    {
      if(body.term ==="")
      {
        this.result=1;  //Ne rien afficher
      }
      else 
      {
        this.result=2; //Afficher aucun resultat
      }
    
    }
  else 
   {
    
     this.products=data.produit;
    this.result =3 //Afficher resultat
    if(this.isUser==true)
    {
      this.isFavorite();
    }
   
   }
   }
   );
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
    
      
  */
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
}
