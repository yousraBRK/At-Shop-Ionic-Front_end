import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';

/*
  Generated class for the GetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetProvider {

  User=
 {
     username:"",
        
    password:"",

    email:"",

    name:"",

    firstName:"",

    telFixe:"",

    telMobile:""
 };

  constructor(public http: HttpClient) {
    console.log('Hello GetProvider Provider');
  }

  getUserData(DataUser)
  {
   this.User['username']=DataUser['username'];
   this.User['password']=DataUser['password'];
   this.User['email']=DataUser['email'];
   this.User['name']=DataUser['nom'];
   this.User['firstName']=DataUser['prenom'];
   this.User['telFixe']=DataUser['num_fix'];
   this.User['telMobile']=DataUser['num_tel'];
  console.log(this.User);
  }
  SendUserData()
  {
    return(this.User);
  }
}
