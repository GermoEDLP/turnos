import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  logIn(email: string, pass: string) {
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logOut() {
    return this.auth.signOut();
  }

  signUp(user: User, pass: string) {
    return this.auth.createUserWithEmailAndPassword(user.email, pass).then((userCred: any)=>{
      return this.createNewUser(user, userCred.user.uid);
    })
  }

  createNewUser(user: User, uid: string) {
    user.id = uid;
    user.created_at = new Date();
    user.updated_at = new Date();
    user.dataW = [];
    return this.db.collection('user').doc(uid).set(user);
  }

  updateUser(userMod: User) {
    return this.db.collection('user').doc(userMod.id).update(userMod)
  }
}
