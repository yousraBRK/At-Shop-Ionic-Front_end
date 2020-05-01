import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { PostProvider } from '../../providers/post/post-to-bd';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

/**
 * Generated class for the ChangeMdpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-mdp',
  templateUrl: 'change-mdp.html',
})
export class ChangeMdpPage {
  Username:any;
  Password:any;
  OldPassword:any="";
  OldPasswordHsh:any;
  NewPassword:any="";
  ConfirmPassword="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl :AlertController, public postProvider:PostProvider ,public toastCtrl:ToastController)
  {
    this.Password=this.navParams.get('Password');
    this.Username=this.navParams.get('Username');
    console.log(this.Username);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeMdpPage');
  }
Validate()
{
   /*
  this.OldPasswordHsh=Md5.hashStr(this.OldPassword);

  if(this.OldPassword==="")
    {
     let alert = this.alertCtrl.create({
  
     title:"ATTENTION",
  
     subTitle:"Vous devez inseré votre ancien mot de passe",
  
     buttons: ["OK"]
    }
  );
     alert.present();
  
  }
  
  else
       if(this.OldPasswordHsh!= this.Password)
          {
            let alert = this.alertCtrl.create({
  
            title:"ATTENTION",
  
           subTitle:"Votre mot de passe est incorrecte",
  
           buttons: ["OK"]
     }
    );
 
       alert.present();
     }
  
     else
         if(this.NewPassword=="")
         {
           let alert = this.alertCtrl.create({
  
           title:"ATTENTION",
  
           subTitle:"Veuillez inseré votre nouveau mot de passe",
  
           buttons: ["OK"]
        }
                                               );
          alert.present();
         }
         else
  
             if(this.NewPassword!= this.ConfirmPassword)
              {
               let alert = this.alertCtrl.create(
                {
                  title:"ATTENTION",
    
                  subTitle:"Vos mots de passe ne sont pas identique !",
    
                  buttons: ["OK"]
                }
                                                 );
    
                  alert.present();
              }
             else 
                {
                 let body=
                   {
                    Username:this.Username,
                    newPassword:this.NewPassword,
                    actions:"changePassword",
                   }
                 this.postProvider.postData(body,'register.php').subscribe((data)=>
                   {
                    if(data.success)
                       {
                        const toast=this.toastCtrl.create(
                         {
                          message:'Votre mot de passe a etait modifié avec succes !',
                          duration:2000
                         }
                                                             );
                        toast.present();
                        }
                   else 
                     { 
                      const toast=this.toastCtrl.create(
                       {
                       message:'Votre mot de passe a etait modifié avec succes !',
                       duration:2000
                       }
                                                         );
                      toast.present();      
                      }
});
                }
                 
              
              */
            }
}
