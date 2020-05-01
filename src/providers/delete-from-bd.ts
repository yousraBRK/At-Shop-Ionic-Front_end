import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

/*
  Generated class for the DeleteFromBdProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeleteFromBdProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DeleteFromBdProvider Provider');
  }
  url: string ="http://localhost:8080";

  DeleteData(body,url)
{
   /* let type ="application/json; charset=UTF-8";
    let headers =new Headers({'Content-Type':type});
    let options= new RequestOptions({headers:headers});

    return this.http.delete(this.url+url,options);*/
  }
}
