import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{Storage} from '@ionic/Storage';
import { MenuPage } from '../pages/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav :NavController;
  rootPage:any=MenuPage;
  

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modal:ModalController, private storage :Storage) {

      this.initializeApp();
      
      
      
      
    
  }

  initializeApp()
  {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }
  
}

