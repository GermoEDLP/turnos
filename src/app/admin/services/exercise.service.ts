import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from 'src/app/interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  ref = this.db.collection('exercises');

  constructor(private db: AngularFirestore) { }

  getExercises(){
    return this.ref.valueChanges();
  }

  cretedExecercise(exer: Exercise){
    const id = this.db.createId();
    exer.id = id;
    exer.created_at = new Date();
    exer.updated_at = exer.created_at;
    return this.ref.doc(id).set(exer);
  }

  updateExercise(exer: Exercise){
    exer.updated_at = new Date();
    return this.ref.doc(exer.id).update(exer);
  }

  deleteExercise(exer: Exercise){
    return this.ref.doc(exer.id).delete();
  }



}
