import { Attendee } from './../../interfaces/attendee';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { Concert } from 'src/app/interfaces/concert';
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  constructor(private firestore : AngularFirestore, private authService : AuthService) { }

  async createConcert(

    name: string,
    date: string,
    price: number,
    cost: number
    
  ): Promise<void> {
    const user =  this.authService.getCurrentUser();
    const id = this.firestore.createId()
    return this.firestore.doc( 'users/'+user.uid+'/concerts/'+id).set({
      id,
      name,
      date,
      price: price*1,
      cost: cost *1,
      revenue: cost* -1,
    })   
  }

  getAll():AngularFirestoreCollection<Concert>{
    const user = this.authService.getCurrentUser()
    return this.firestore.collection('users/'+user.uid+'/concerts')
  }

  get(id:string): AngularFirestoreDocument<Concert>{
    const user = this.authService.getCurrentUser()
    return this.firestore.collection('users/'+user.uid+'/concerts').doc(id)
  }

  delete(id : string) : Promise<void>{
    const user = this.authService.getCurrentUser()
    return this.firestore.collection('users/'+user.uid+'/concerts').doc(id).delete()
  }

  async addAttende(name : string, lastname : string, concertId : string) : Promise<void>{
    const user =  this.authService.getCurrentUser();
    const id = this.firestore.createId()
    return this.firestore.doc( 'users/'+user.uid+'/concerts/'+concertId+'/attendees/'+id).set({
      id,
      name,
      lastname
    })
    .then(() => {
      firebase.firestore().runTransaction(async tran => {
        return tran.get(this.firestore.collection('users/'+user.uid+'/concerts').doc<Concert>(concertId).ref).then(res => {
          const newRevenue = res.data().revenue + res.data().price
          tran.update(this.firestore.collection<Concert>('users/'+user.uid+'/concerts').doc<Concert>(concertId).ref, {
            revenue : newRevenue
          })
        })
      })
    })
  }

  getAttendees(concertId : string) : AngularFirestoreCollection<Attendee>{
    const user =  this.authService.getCurrentUser();
    return this.firestore.collection('users/'+user.uid+'/concerts/'+concertId+'/attendees')
  }
  
  async deleteAttendee(concertId : string, attendeeId : string) : Promise<void>{
    const user =  this.authService.getCurrentUser();
    return this.firestore.collection( 'users/'+user.uid+'/concerts/'+concertId+'/attendees').doc(attendeeId).delete()
    .then(() => {
      firebase.firestore().runTransaction(async tran => {
        return tran.get(this.firestore.collection('users/'+user.uid+'/concerts').doc<Concert>(concertId).ref).then(res => {
          const newRevenue = res.data().revenue - res.data().price
          tran.update(this.firestore.collection<Concert>('users/'+user.uid+'/concerts').doc<Concert>(concertId).ref, {
            revenue : newRevenue
          })
        })
      })
    })
  }
}
