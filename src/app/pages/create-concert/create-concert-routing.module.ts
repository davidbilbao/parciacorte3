import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateConcertPage } from './create-concert.page';

const routes: Routes = [
  {
    path: '',
    component: CreateConcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateConcertPageRoutingModule {}
