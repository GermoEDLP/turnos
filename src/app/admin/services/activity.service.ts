import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Activity } from 'src/app/interfaces/activity.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  ref = this.db.collection('activity');

  constructor(private db: AngularFirestore) {}

  getActivities() {
    return this.ref.valueChanges();
  }

  createActivity(act: Activity) {
    const id = this.db.createId();
    act.id = id;
    act.created_at = new Date();
    act.updated_at = new Date();
    return this.ref.doc(id).set(act);
  }

  updateActivity(act: Activity) {
    act.updated_at = new Date();
    console.log(act);

    return this.ref.doc(act.id).update(act);
  }

  deleteActivity(act: Activity) {
    return this.ref.doc(act.id).delete();
  }
}
