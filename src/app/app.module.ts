import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { firebaseConfig } from 'src/app/credenciales';

import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
      IonicModule.forRoot(),
      AppRoutingModule, 
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
