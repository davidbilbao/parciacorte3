import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app'
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestore : AngularFirestore,
    private auth : AngularFireAuth,
    private router : Router
  ) {
    this.auth.authState.subscribe({
      next : (user) => {
        if(!user){
          this.logout()
          this.router.navigate(['/login']);
        }
        this.router.navigate(['/concerts']);
        localStorage.setItem('user_app_concerts', JSON.stringify(user))
      }
    })
  }

  //OBTENGO EL USUARIO EN SESIÓN
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('user_app_concerts'))
  }

  loginWithEmail(email : string, password : string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async singup(email : string, password : string, nombres: string, apellidos: string) :Promise<firebase.auth.UserCredential> {
    const  response = await this.auth.createUserWithEmailAndPassword(email, password);
    (await this.createUser(nombres, apellidos, email, response.user.uid))
    return response;
  }

  createUser(nombres : string, apellidos: string, email: string, id : string):Promise<void>{
    return this.firestore.collection('users').doc(id).set({
      nombres, apellidos, email
    });
  }

  resetPassword(email : string){
    return this.auth.sendPasswordResetEmail(email);
  }

  logout(){
    localStorage.removeItem('user_app_concerts')
    return this.auth.signOut();
  }

}
