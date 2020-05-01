import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ListProductPage } from '../list-product/list-product';
import { Getfrombd } from '../../providers/get/get-from-bd';
import { PostProvider } from '../../providers/post/post-to-bd';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage implements OnInit
 {
 
  rootPage:any=TabsPage;
  Categories:any;
  CatSubCategories= new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, public getfrombd:Getfrombd, public postProvider :PostProvider) 
  {  
    
   
  }

  ngOnInit()
    {
    
   this.getCategories();
  
    }
  
  openList(subCategorie)
  { 
    
    this.navCtrl.push(ListProductPage,{subCategorie:subCategorie})
  }

  getCategories()
 {
  this.getfrombd.getCategories().subscribe(
    data=> {
      this.Categories=data;
    
      this.sortSubCatByCat(this.Categories);
      
    }
  );
 }


 sortSubCatByCat(Categories)
{ 
  let j=0;
  let CatAndSubCat;
  for(let i=0 ;i<Categories.length; i++)
  {
   
          let idCat=Categories[i]['id_categorie'];
      
        
          this.getfrombd.getSubCatFromCat(idCat).subscribe((data)=>
          {
           if(data!=null)
           {
           CatAndSubCat=
           { 
             cat:Categories[i],
             subCat:data,
             hasMore:true,
             click:false
             
           }
           
           }
           else 
           {
            CatAndSubCat=
            {
              cat:Categories[i],
              subCat:null,
              hasMore:false,
              click:false
              
            }
            
           }
           this.CatSubCategories[j]=CatAndSubCat;
          
           j++;
          }
          );

 

  }
 
}
 listClick(categorie) :any
{
 if(categorie.click === true) 
 {
  categorie.click=false;
 }
 else 
 {
  categorie.click=true;
 }
 
return categorie;

}
 
}
