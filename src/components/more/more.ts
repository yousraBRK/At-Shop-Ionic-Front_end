import { Component } from '@angular/core';
import { NavController,IonicPage}from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the MoreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class MoreComponent {

  text: string;

  constructor(public navCtrl:NavController) {
    console.log('Hello MoreComponent Component');
    
  }
  openRegister()
  {
    this.navCtrl.push(RegisterPage);
  }
  openLogIn()
  {
    this.navCtrl.push(LoginPage);
  }
}
