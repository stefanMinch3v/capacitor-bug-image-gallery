import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    HomePageRoutingModule,
    CommonModule
  ],
  exports: [],
  declarations: [HomePage]
})
export class HomePageModule { }
