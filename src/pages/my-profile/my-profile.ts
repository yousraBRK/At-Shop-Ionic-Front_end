import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import{Storage} from '@ionic/Storage';
import { PostProvider } from '../../providers/post/post-to-bd';
import { ChangeMdpPage } from '../change-mdp/change-mdp';


/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage implements OnInit{

  profileUser:any;
  Username:String;
  Email:String;
  Name:String;
  FirstName:String;
  NumFix:Number;
  NumMobile:Number;
  Password:String;
  OldUsername:any;
  Adresse:String;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public storage:Storage, public postProvider:PostProvider,public toastCtrl:ToastController, public alertCtrl :AlertController) {
   
    
  }


  getUserNameFromSession() 
  {
    this.storage.get('session_storage').then((res)=>
    {
    console.log(res.adresse);
    this.OldUsername=res.username;
    console.log(this.OldUsername);
    this.getUserFromDb(this.OldUsername);
    });
   
   
  }


  getUserFromDb(OldUsername)
  {
    console.log(OldUsername);
    
    let body=
    {
      username:OldUsername,
      actions:'getUser'
    }
    this.postProvider.postData(body,'register.php').subscribe((data)=>
    {
      
     if(data!=null)
     {
       console.log(data);
     this.profileUser=data
     console.log(this.profileUser.username);
      this.Username=this.profileUser.username;
       this.Email=this.profileUser.email;
       this.Name=this.profileUser.nom;
       this.FirstName=this.profileUser.prenom;
       this.NumFix=this.profileUser.num_fix;
       this.NumMobile=this.profileUser.num_tel;
       this.Password=this.profileUser.password;
       this.Adresse=this.profileUser.adresse;
        this.storage.remove('session_storage');
       this.storage.set('session_storage',data);
      
       

     }
    });
  }

  ionViewWillEnter()
  {
    this.getUserNameFromSession();
   
   
  }
  ngOnInit()
   {

   }
  


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
  openConsole()
  {
    console.log(this.Name);
  }

  Modify()
  {
    /*
    let UserNameChanged: boolean;
    if(this.Username === this.OldUsername)
    {
    UserNameChanged=false;
    }
    else 
    {
      UserNameChanged=true;
    }
    let body=
     {
       OldUsername:this.OldUsername,
       Username:this.Username,
       Name:this.Name,
       FirstName:this.FirstName,
       Email:this.Email,
       NumFix:this.NumFix,
       NumMobile:this.NumMobile,
       Adresse:this.Adresse,
       Changed:UserNameChanged,
       actions:"ChangeInfoProfil" 
       
     }
    this.postProvider.postData(body,'register.php').subscribe((data)=>
    {
      if(data.success)
     {
      const toast=this.toastCtrl.create(
        {
         message:data.msg+'!',
         duration:2000
        }                               );
         toast.present();
         this.OldUsername=this.Username;
         console.log(this.OldUsername);
         this.getUserFromDb(this.OldUsername);
     }
     else 
     {
      let alert = this.alertCtrl.create(
        {
      
      title:"ATTENTION",
      
      subTitle:data.msg,
      
      buttons: ['OK']
        }
                                        );
       alert.present();
       
     }

    }
    );
    console.log(this.FirstName);
    */
  }

  openChangeMdp()
  {
    this.navCtrl.push(ChangeMdpPage,{Password:this.Password, Username:this.Username});
  } 
  
}
