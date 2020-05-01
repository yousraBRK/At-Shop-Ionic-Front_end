import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfirmercomPage } from '../confirmercom/confirmercom';
import {Storage} from '@ionic/Storage';
import { PostProvider } from '../../providers/post/post-to-bd';

/**
 * Generated class for the CommandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command',
  templateUrl: 'command.html',
})
export class CommandPage {
  
  username="";
  Name="";
  FirstName="";
  NumTel="";
  Adresse="";
  card="";
  NumCart="";
  Date:Date =null;
  codeOTP="";
  wilayas:any;
  wilaya="";
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  public storage: Storage, public alertCtrl :AlertController,public postProvider:PostProvider ) 
  {
/*
    this.storage.get('session_storage').then((res)=>
        {
          
           this.Name=res.nom;
           this.FirstName=res.prenom;
           this.NumTel=res.num_tel;
           this.username=res.username;
           this.Adresse=res.adresse;

        }
    );
    let body=
    {
      actions:"getWilayas"
    }
    this.postProvider.postData(body,'register.php').subscribe((data)=>
    
   {
    if(data!=null)
    {
      this.wilayas=data.wilaya;
     
    }
   }
   
    );

    
*/
}

TestNumTel()
{
  var reg = new RegExp('^[0][567][0-9]{7}[0-9]$', 'i');
    if(reg.test(this.NumTel))
    {
     return true;
    }else
    return false;

}

TestNumCart()
{
  var reg = new RegExp('^[0-9][0-9]{14}[0-9]$', 'i');
    if(reg.test(this.NumCart))
    {
     return true;
    }else
    return false;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandPage');
  }
 openConfirm()

 {
  

  if(this.Name=="")
  {
  
  let alert = this.alertCtrl.create(
    {
  
  title:"ATTENTION",
  
  subTitle:"Vous devez inseré votre nom",
  
  buttons: ['OK']
    }
  );
  
  alert.present();
  
  } 
  else
  
  if(this.FirstName=="")
  {
  
  let alert = this.alertCtrl.create({
  
  title:"ATTENTION",
  
  subTitle:"Vous devez inseré votre prénom",
  
  buttons: ["OK"]
  
  }
  );
  
  alert.present();
  
  }
  
  else


  if(this.NumTel=="" )
  {
  
    let alert = this.alertCtrl.create(
     {
    
    title:"ATTENTION",
    
    subTitle:"Vous devez inseré votre numéro de téléphone",
    
    buttons: ['OK']
    
    }
    );
  
  alert.present();
                    
  }
  else
  if(!this.TestNumTel() )
  {
  
    let alert = this.alertCtrl.create(
     {
    
    title:"ATTENTION",
    
    subTitle:"Votre numéro de téléphone est invalide",
    
    buttons: ['OK']
    
    }
    );
  
  alert.present();
  }
  else
      if(this.Adresse=="" )
      {
  
       let alert = this.alertCtrl.create(
       {
    
        title:"ATTENTION",
    
        subTitle:"Vous devez inseré votre Adresse",
    
        buttons: ['OK']
    
       }
     );
  
        alert.present();
  
      } 
       else

         if(this.NumCart=="" )
             {
   
              let alert = this.alertCtrl.create(
               {
    
                title:"ATTENTION",
    
                subTitle:"Vous n'avez pas inseré votre numéro de carte !",
    
                buttons: ['OK']
    
                }
            );
  
          alert.present();
  
        }
          else 
              if(!this.TestNumCart())
               {
  
              let alert = this.alertCtrl.create(
              {
    
              title:"ATTENTION",
    
              subTitle:"Votre numéro de carte est invalide !",
    
              buttons: ['OK']
    
                }
              );
  
              alert.present();
  
            }
            else
                 if(this.Date===null)
                 {

                   let alert = this.alertCtrl.create(
                       {
 
                        title:"ATTENTION",
 
                        subTitle:"Vous devez inserer la date d'expiration de votre carte !",
 
                        buttons: ['OK']
 
                      }
                  );

                   alert.present();

                    }
                    else
                 if(this.codeOTP=="")
                 {

                   let alert = this.alertCtrl.create(
                       {
 
                        title:"ATTENTION",
 
                        subTitle:"Vous devez inserer le code OTP de votre carte",
 
                        buttons: ['OK']
 
                      }
                  );

                   alert.present();

                    }
                    else
                    if(this.wilaya=="")
                    {
   
                      let alert = this.alertCtrl.create(
                          {
    
                           title:"ATTENTION",
    
                           subTitle:"Vous devez selectionner votre wilaya !",
    
                           buttons: ['OK']
    
                         }
                     );
   
                      alert.present();
   
                       } 
     
   else
   {
    let body=
    {
      username:this.username,
      Name:this.Name,
      FirstName:this.FirstName,
      Adresse:this.Adresse,
      NumTel:this.NumTel,
      Wilaya:this.wilaya
  
    }
     this.navCtrl.push(ConfirmercomPage,{body:body});
   }
  
 }
}
