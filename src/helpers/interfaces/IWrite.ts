import {DocumentData} from "firebase-admin/firestore";

export interface IWrite<T> {
  create(id: string, item: T): Promise<DocumentData>;
  delete(id: string): Promise<boolean>;
}
