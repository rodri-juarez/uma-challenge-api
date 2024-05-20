import {IWrite} from '../interfaces/IWrite';
import {IRead} from '../interfaces/IRead';
import {CollectionReference} from '@google-cloud/firestore';
import {DocumentData, Firestore} from 'firebase-admin/firestore';

export abstract class BaseRepository<T extends {[x: string]: any;} > implements IWrite<T>, IRead<T> {

  public readonly _collection: CollectionReference;

  constructor(database: Firestore, collectionName: string) {
    this._collection = database.collection(collectionName);
  }

  async create(id: string, item: T): Promise<DocumentData> {
    const docRef = this._collection.doc(id);
    return docRef.set(item, {merge: true})
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<DocumentData | undefined> {
    const result = await this._collection.doc(id).get();
    return result.data();
  }
}
