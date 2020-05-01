import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post-to-bd';
import { ListProductFiltrePage } from '../list-product-filtre/list-product-filtre';
import { SerachPage } from '../serach/serach';

/**
 * Generated class for the FiltresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtres',
  templateUrl: 'filtres.html',
})
export class FiltresPage implements OnInit {

categorie:any;
CatOrSubCat= new Array();
id:any;
keys:any;
products:any;
marks:any;
listMarks=new Array();
price: any ={
  lower:"",
  upper:""

}

priceMin: any ;
priceMax: any ;
priceMin2: any;
priceMax2: any;
find:boolean=false;
 
    

   


  constructor(public navCtrl: NavController, public navParams: NavParams , public postProvider :PostProvider) {

    this.categorie=this.navParams.get('categorie');
    this.CatOrSubCat=(<any>Object).values(this.categorie);
    this.id=(this.CatOrSubCat[0]);
    this.keys=Object.keys(this.categorie);
    
    
    
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltresPage');
  }

  ionViewWillEnter()
  {
    this.getMarks();
    this.priceMin2 = this.priceMin;
    this.priceMax2 = this.priceMax;
  }

ngOnInit()
{
  this.getMarks();
  this.priceMin2 = this.priceMin;
  this.priceMax2 = this.priceMax;
  

  
}
openSearch()
 {
   
  this.navCtrl.push(SerachPage);
   
 }



  getMarks()
  {
    /*
    if(this.keys[0]==="id_categorie")
       {
      
          let body=
          {
            idCat:this.categorie['id_categorie'],
            actions:'getCatMarks'
          }
         this.postProvider.postData(body,'register.php').subscribe((data)=>
           {
             if(data=== null)
               {
                 console.log('pas de marques');
               }
             else 
              {
                this.marks=data.marque;
              }
                
            
           }
         );

         let body2=
         { 
          idCat:this.categorie['id_categorie'],
          actions: 'getLowerUperCat'
         }

         this.postProvider.postData(body2,'register.php').subscribe((data)=>
         {
           
           this.priceMax=data.Max;
           this.priceMin=data.Min;
          console.log(data.Max);
          console.log(data.Min);
         }
         );
 
    }
  else 
        if(this.keys[0]==="id_scategorie")
          {
           let body=
            {
              idCat:this.categorie['id_scategorie'],
              actions:'getSubCatMarks'
            }
            this.postProvider.postData(body,'register.php').subscribe((data)=>
             {
               if(data=== null)
                {
               console.log('pas de marques');
               }
             else 
            {
              this.marks=data.marque;
             
            }
         }
       );
       let body2=
       { 
        idCat:this.categorie['id_scategorie'],
        actions: 'getLowerUperSubCat'
       }

       this.postProvider.postData(body2,'register.php').subscribe((data)=>
       {
        
        this.priceMax=data.Max;
        this.priceMin=data.Min;
        console.log(data.Max);
        console.log(data.Min);
       }
       );

  }
  */
  }

  AddTofiltreList(id)
  {
   let  index = this.listMarks.indexOf(id);
   if( index != -1)
   {
     console.log("je us la");
     this.listMarks.splice(index,1);
   }
    else
    {
      this.listMarks.push(id);
    }
     console.log(this.listMarks);
    
  }

  setBadge(price) 
  {
    this.priceMin2 =price.lower;
    this.priceMax2 =price.upper;  
  }
 
  ApplyFiltrs()
  {
   /*
   if(this.keys[0]==="id_categorie")
   {
     let minPrice;
     let maxPrice;
     if(this.price.lower==="")
     {
       console.log("here");
       minPrice=this.priceMin;
     }else
     {
       minPrice=this.price.lower;
     }

     if(this.price.upper==="")
      {
       maxPrice=this.priceMax;
     } else
      {
       maxPrice=this.price.upper;
      }

    let body=
    {
      idCat:this.categorie['id_categorie'],
      actions:'getProCatFiltre',
      lowerPrice:minPrice,
      upperPrice:maxPrice,
      listOfMarks:this.listMarks
    }
    
     this.postProvider.postData(body,'register.php').subscribe((data)=>
       {
         if(data.produit.length=== 0)
           {
              
             this.find=false;
             this.Navigate(this.products,this.find);
           }
         else 
          {
            
            this.find=true;
            this.products=data.produit;
            this.Navigate(this.products,this.find);
           
          }
       }
     );

}
else 
    if(this.keys[0]==="id_scategorie")
      {

        let minPrice;
        let maxPrice;
        if(this.price.lower==="")
        {
          console.log("here");
          minPrice=this.priceMin;
        }else
        {
          minPrice=this.price.lower;
        }
   
        if(this.price.upper==="")
         {
          maxPrice=this.priceMax;
        } else
         {
          maxPrice=this.price.upper;
         }
   

       let body=
        {
          idCat:this.categorie['id_scategorie'],
          actions:'getProSubCatFiltre',
          lowerPrice:minPrice,
          upperPrice:maxPrice,
          listOfMarks:this.listMarks
        }
        this.postProvider.postData(body,'register.php').subscribe((data)=>
         {
           if(data.produit.length===0)
            {
             this.find=false;
             this.Navigate(this.products,this.find);
            
           }
         else 
        {
          this.find=true;
          this.products=data.produit;
          this.Navigate(this.products,this.find);
        
          
        }
     }
   );

}
     
        */
   
  }
  Navigate(products,find)
  {
    this.navCtrl.push(ListProductFiltrePage,{produit:products ,find:find}) ; 
  }
}
  
