import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MuscularGroup } from 'src/app/interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class MuscularGroupService {

  constructor(private db: AngularFirestore) { }

  ref = this.db.collection('muscularGroup');

  getMuscularGroups(){
    return this.ref.valueChanges();
  }

  creteMuscularGroups(musc: MuscularGroup){
    musc.id = this.db.createId();
    musc.created_at = new Date();
    return this.ref.doc(musc.id).set(musc);
  }

  updateMuscularGroups(musc: MuscularGroup){
    musc.updated_at = new Date();
    return this.ref.doc(musc.id).update(musc);
  }

  deleteMuscularGroups(musc: MuscularGroup){
    return this.ref.doc(musc.id).delete();
  }



}
