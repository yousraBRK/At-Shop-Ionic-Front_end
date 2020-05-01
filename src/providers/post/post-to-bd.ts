
import { Injectable } from '@angular/core';
import{Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostProvider {


  url: string ="http://localhost:8080";

  constructor(public http: Http) {
    
  }
postData(body,url)
{
    let type ="application/json; charset=UTF-8";
    let headers =new Headers({'Content-Type':type});
    let options= new RequestOptions({headers:headers});

    return this.http.post(this.url+url, JSON.stringify(body),options);
  }
 
}
