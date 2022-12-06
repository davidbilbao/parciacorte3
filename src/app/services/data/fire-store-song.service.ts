import { Injectable } from '@angular/core';
import { Song } from "src/app/interfaces/song";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { User } from 'firebase/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreSongService {

  constructor( public firestore: AngularFirestore, private authService : AuthService ) { }

  createSong(
    albumName:string,
     artistName:string,
      songName:string,
       songDescription:string
       ):Promise<void>{

    const id = this.firestore.createId();
    return this.firestore.doc('songList/'+id).set({
      id, albumName, artistName, songName , songDescription
    });
  }

  //obtengo toda la colección de canciones songList
  getSongList() : AngularFirestoreCollection<Song> {
    return this.firestore.collection('songList');
  }

  //Obtengo una canción de la colección songList
  getSong(songId : string):AngularFirestoreDocument<Song>{
    return this.firestore.collection('songList').doc(songId);
  }

  updateSong(id : string, song : Song) : Promise<void>{
    return this.firestore.collection('songList')
    .doc(id)
    .update(song)
  }

  //Borro una canción de la colección songList
  deleteSong(songId : string): Promise<void>{
    return this.firestore.doc('songList/'+songId).delete();
  }
}
