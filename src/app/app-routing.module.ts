import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate : [PublicGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate : [PublicGuard]
  },
  {
    path : 'create-concert',
    loadChildren : () => import('./pages/create-concert/create-concert.module').then( m => m.CreateConcertPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'concerts',
    loadChildren: () => import('./pages/concerts/concerts.module').then( m => m.ConcertsPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'detail-concert/:id',
    loadChildren: () => import('./pages/detail-concert/detail-concert.module').then( m => m.DetailConcertPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'attendees/:id',
    loadChildren: () => import('./pages/attendees/attendees.module').then( m => m.AttendeesPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule),
    canActivate : [PublicGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
