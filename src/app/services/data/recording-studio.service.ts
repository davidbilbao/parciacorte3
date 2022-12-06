import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RecordingStudio } from 'src/app/interfaces/recording-studio';

@Injectable({
  providedIn: 'root'
})
export class RecordingStudioService {

  constructor(private firestore : AngularFirestore) { }

  getAllRecordingStudios() : AngularFirestoreCollection<RecordingStudio>{
    return this.firestore.collection('recordingStudiosList');
  }

  createRecordingStudio(nameRecording : string, type_of_melody : string, number_of_cabins : number, owner : string) {
    const id = this.firestore.createId();
    return this.firestore.doc('recordingStudiosList/'+id).set({id, nameRecording, type_of_melody, number_of_cabins, owner});
  }

  getRecordingStudio(id : string):AngularFirestoreDocument<RecordingStudio>{
    return this.firestore.collection('recordingStudiosList').doc(id);
  }

  updateRecordingStudio(id : string, recordingStudio : RecordingStudio): Promise<void>{
    return this.firestore.collection('recordingStudiosList')
    .doc(id)
    .update(recordingStudio)
  }

  deleteRecordingStudio(id : string): Promise<void>{
    return this.firestore.doc('recordingStudiosList/'+id).delete();
  }
}
