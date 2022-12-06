import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateConcertPageRoutingModule } from './create-concert-routing.module';

import { CreateConcertPage } from './create-concert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateConcertPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateConcertPage]
})
export class CreateConcertPageModule {}
