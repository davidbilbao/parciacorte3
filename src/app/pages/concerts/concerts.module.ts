import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcertsPageRoutingModule } from './concerts-routing.module';

import { ConcertsPage } from './concerts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcertsPageRoutingModule
  ],
  declarations: [ConcertsPage]
})
export class ConcertsPageModule {}
