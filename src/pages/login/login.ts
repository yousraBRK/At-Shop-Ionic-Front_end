import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post/post-to-bd';
import {Storage} from '@ionic/Storage';
import { GetProvider } from '../../providers/get/get';
import { MenuPage } from '../menu/menu';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { RegisterPage } from '../register/register';




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  UserName :string ="";
  Password :string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl :AlertController,public toastCtrl:ToastController,public postProvider :PostProvider,private storage :Storage,public  getProvider :GetProvider,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.viewCtrl.index)
  }

  logIn()
  {
    if(this.UserName=="")
    {
    
    let alert = this.alertCtrl.create(
      {
    
    title:"ATTENTION",
    
    subTitle:"Vous devez indiquer votre nom d'utilisateur !",
    
    buttons: ['OK']
      }
    );
    
    alert.present();
    
    } 
    else 
    if(this.Password=="")
    {
    
    let alert = this.alertCtrl.create(
      {
    
    title:"ATTENTION",
    
    subTitle:"Vous devez indiquer votre mot de passe !",
    
    buttons: ['OK']
      }
    );
    
    alert.present();
    
    } else 
    {
    let body = {  
      username: this.UserName,
      password: this.Password,
      
    };
    let url ="/Connexion";
    this.postProvider.postData(body,url).subscribe((data)=>
    {
     let result =JSON.parse(data["_body"]);
      console.log(data);
      console.log(result["obejct"]);
      console.log(result["obejct"].username);

    
    if(result.success)
        {
        this.navCtrl.remove(2,1); 
          this.navCtrl.setRoot(MenuPage);
          this.storage.set('session_storage',result["obejct"]);
          this.getProvider.getUserData(result["obejct"]);
         
           const toast=this.toastCtrl.create(
             {
           message:'Ravie de vous revoir '+result["obejct"]['username']+ '!',
           duration:2000
             }
          );
            toast.present();
         }
    else 
    { 
     
        const toast=this.toastCtrl.create(
          {
        message:'Nom utilisateur ou mot de passe incorrecte !',
        duration:2000
           }
     );
         toast.present();
    }
          
  } 
    ); 
  }
  
  }
  openRegister()
  {
    this.navCtrl.push(RegisterPage);
  }
}
