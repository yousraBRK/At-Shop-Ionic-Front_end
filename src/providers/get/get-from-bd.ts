
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'



@Injectable()
export class Getfrombd {

private url :string;

   
  constructor(public http:  HttpClient) 
  {
   console.log('Hello GetCategorisProvider Provider');
   this.url="http://localhost:8080";
  }
getCategories() //Recuperer resultat categories 
{
  return this.http.get(this.url+"/Categories");
  
}
getPromoProduct() : Observable<any> //Recuperer resultat promo produits
{
  return this.http.get(this.url+"/PromoProduits");
}

getCategoriePortable()
{
  //return this.http.get(this.url+"/Produits");
  //this.http.get(this.url).map(res =>res.json());
}

getProducts()  //Recuperer resultat tout produits
{
 // return this.http.get(this.url+"/Produits");
}

getProductByCat(idCat)
{
  console.log("produit id"+idCat);
  return this.http.get(this.url+"/Produits/"+idCat);
}
getFavoriteById(username,id_produit)
{
  return this.http.get(this.url+"/Favoris/"+username+"/"+id_produit);
}


getSubCatFromCat(idCat)
{
  return this.http.get(this.url+"/SCategories/"+idCat);
}

getFavoriteByUser(username)
{
  return this.http.get(this.url+"/Produits/Favoris/"+username);
}
getCartProducts(username)
{
  return this.http.get(this.url+"/Produits/Panier/"+username)
}
}

