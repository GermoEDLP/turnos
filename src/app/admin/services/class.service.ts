import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClassExercise } from 'src/app/interfaces/exercise.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private db: AngularFirestore) {}

  ref = this.db.collection('classes');

  getClassExercise() {
    return this.ref.valueChanges();
  }

  creteClassExercise(c: ClassExercise) {
    let id = this.db.createId();
    c.id = id;
    c.created_at = new Date();
    c.updated_at = new Date();
    return this.ref.doc(c.id).set({...c});
  }

  updateClassExercise(c: ClassExercise) {
    c.updated_at = new Date();
    return this.ref.doc(c.id).update({...c});
  }

  deleteClassExercise(c: ClassExercise) {
    return this.ref.doc(c.id).delete();
  }
}
