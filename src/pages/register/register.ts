import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {Http}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post-to-bd';
import {Storage} from '@ionic/Storage';
import { GetProvider } from '../../providers/get/get';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  UserName :string ="";
  Password :string ="";
  PasswordConfirm :string
  Email :string ="";
  Name :string ="";
  FirstName :string ="";
  TelFixe:string ="";
  TelMobile :string ="";
  adresse:string="";

 



  constructor(public navCtrl: NavController, public navParams: NavParams ,public alertCtrl: AlertController,public loading: LoadingController, private http: Http, public postProvider:PostProvider, public  toastCtrl :ToastController, private storage : Storage,public getProvider:GetProvider) {
    
      }


      Test_adresse_email(email)
 
      {
          var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
       
          if(reg.test(email))
            {
          return(true);
            }
          else
            {
          return(false);
            }
      }



      AddUser()
      {

        if(this.UserName=="")
        {
        
        let alert = this.alertCtrl.create(
          {
        
        title:"ATTENTION",
        
        subTitle:"Vous devez inserer un nom d'utilisateur",
        
        buttons: ['OK']
          }
        );
        
        alert.present();
        
        } 
        else
        
        if(this.Password=="")
        {
        
        let alert = this.alertCtrl.create({
        
        title:"ATTENTION",
        
        subTitle:"Vous devez inserer un mot de passe",
        
        buttons: ["OK"]
        
        }
        );
        
        alert.present();
        
        }
        
        else
        
        if(this.Password != this.PasswordConfirm)
        {
        
          let alert = this.alertCtrl.create(
            {
          
          title:"ATTENTION",
          
          subTitle:"Votre mot de passe est invalide",
          
          buttons: ["OK"]
          
            }
          );
          
          alert.present();
          
        }
          else

        if(this.Email=="" )
        {
        
          let alert = this.alertCtrl.create(
           {
          
          title:"ATTENTION",
          
          subTitle:"Vous devez inserer votre Email",
          
          buttons: ['OK']
          
          }
          );
        
        alert.present();
        
        } 
        else 
        if(!this.Test_adresse_email(this.Email))
        {
        
          let alert = this.alertCtrl.create(
           {
          
          title:"ATTENTION",
          
          subTitle:"Votre adresse email est invalide",
          
          buttons: ['OK']
          
          }
          );
        
        alert.present();
        
        } 
        else 
        if(this.TelFixe=="" )
        {
        
          let alert = this.alertCtrl.create(
            {
          
          title:"ATTENTION",
          
          subTitle:"Vous devez inserer votre numéro de téléphone fixe",
          
          buttons: ['OK']
          
            }
          );
        
        alert.present();
        
        } 
        else
        {
        console.log("je suis la");
        let body = {
        
        username: this.UserName,
        
        password: this.Password,

        email: this.Email,
  
        nom: this.Name,

        prenom: this.FirstName,

        num_fixe: this.TelFixe,

        num_tel: this.TelMobile,

        adresse:this.adresse,
       

       
        
         };
         let url ="/AddClient";
         
        this.postProvider.postData(body,url).subscribe((data)=>
        {
        
         
          let client = JSON.parse(data["_body"]);
            console.log(client);
            console.log(client["obejct"]);
            console.log(client["obejct"].username);
            console.log(client["obejct"]["username"]);
            
             
        if(client.success)
            {
              this.navCtrl.remove(1,1);
              this.navCtrl.setRoot(MenuPage);
              console.log("je suis aussi la");
               const toast=this.toastCtrl.create(
                 {
               message:'Bienvenue '+client["obejct"]["username"]+' !',
               duration:2000
                 }
              );
                toast.present();
                this.storage.set('session_storage',client["obejct"]);
                this.getProvider.getUserData(client["obejct"]);
                

             }
        else 
        { 
          console.log("je suis pas la");
          let alert = this.alertCtrl.create(
            {
          
          title:"ATTENTION",
          
          subTitle:client.msg,
          
          buttons: ['OK']
            }
          );
           alert.present();
        }
              
      }
        ); 
            
    }
      
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
        
      
      
}

