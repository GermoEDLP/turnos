import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from 'src/app/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private db: AngularFirestore) { }

  private ref = this.db.collection('categories');

  getCategories(){
    return this.ref.valueChanges();
  }

  createCategory(cat: Category){
    const id = this.db.createId();
    cat.id = id;
    cat.created_at = new Date();
    cat.updated_at = new Date();
    return this.ref.doc(id).set(cat);
  }

  updateCategory(cat: Category){
    cat.updated_at = new Date();
    return this.ref.doc(cat.id).update(cat);
  }

  deleteCategory(cat: Category){
    return this.ref.doc(cat.id).delete();
  }




}
