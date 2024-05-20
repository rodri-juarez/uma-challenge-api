import {DocumentData} from "firebase-admin/firestore";

export interface IRead<T> {
  findOne(id: string): Promise<DocumentData | undefined>;
}
