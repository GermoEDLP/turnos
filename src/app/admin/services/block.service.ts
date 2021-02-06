import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Block } from '../classes/block.class';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  constructor(private db: AngularFirestore) {}

  private ref = this.db.collection('blocks');

  getBlocks() {
    return this.ref.valueChanges();
  }

  createBlock(block: Block) {
    const id = this.db.createId();
    block.id = id;
    block.created_at = new Date();
    block.updated_at = block.created_at;
    return this.ref.doc(id).set(block);
  }

  updateBlock(block: Block) {
    block.updated_at = new Date();
    return this.ref.doc(block.id).update(block);
  }

  deleteBlock(block: Block) {
    return this.ref.doc(block.id).delete();
  }
}
