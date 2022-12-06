import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailConcertPage } from './detail-concert.page';

const routes: Routes = [
  {
    path: '',
    component: DetailConcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailConcertPageRoutingModule {}
