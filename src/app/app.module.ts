import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { DetailsPageModule } from '../pages/details/details.module';
import { MenuPage } from '../pages/menu/menu';
import { IonicStorageModule } from '@ionic/Storage';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CartPageModule } from '../pages/cart/cart.module';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePageModule } from '../pages/home/home.module';
import { FavoritePageModule } from '../pages/favorite/favorite.module';
import { SerachPage } from '../pages/serach/serach';
import { HttpClientModule } from '@angular/common/http'; 
import {SelectSearchableModule} from 'ionic-select-searchable';
import { ListProductPage } from '../pages/list-product/list-product';
import { FiltresPage } from '../pages/filtres/filtres';
import { Getfrombd } from '../providers/get/get-from-bd';
import {HttpModule} from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { PostProvider } from '../providers/post/post-to-bd';
import { MoreComponent } from '../components/more/more';
import { LoginPage } from '../pages/login/login';
import { MoreUserComponent } from '../components/more-user/more-user';
import { GetProvider } from '../providers/get/get';
import { ListProductFiltrePage } from '../pages/list-product-filtre/list-product-filtre';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ChangeMdpPage } from '../pages/change-mdp/change-mdp';
import { CommandPage } from '../pages/command/command';
import { ConfirmercomPage } from '../pages/confirmercom/confirmercom';
import { CartUserPageModule } from '../pages/cart-user/cart-user.module';
import { FavoriteNoUserPageModule } from '../pages/favorite-no-user/favorite-no-user.module';
import { DeleteFromBdProvider } from '../providers/delete-from-bd';






@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    TabsPage,
    SerachPage,
    ListProductPage,
    FiltresPage,
    RegisterPage,
    MoreComponent,
    LoginPage,
    MoreUserComponent,
    ListProductFiltrePage,
    MyProfilePage,
    ChangeMdpPage,
    CommandPage,
    ConfirmercomPage,
   

  
  
    

    
  

   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DetailsPageModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,
    CartPageModule,
    HomePageModule,
    FavoritePageModule,
    SelectSearchableModule,
    HttpClientModule,
    HttpModule,
    CartUserPageModule,
    FavoriteNoUserPageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    TabsPage,
    SerachPage,
    ListProductPage,
    FiltresPage,
    RegisterPage,
    MoreComponent,
    LoginPage,
    MoreUserComponent,
    ListProductFiltrePage,
    MyProfilePage,
    ChangeMdpPage,
    CommandPage,
    ConfirmercomPage,
    
 
  
    
  
    
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Getfrombd,
    PostProvider,
    GetProvider,
    DeleteFromBdProvider
  ]
})
export class AppModule {}
