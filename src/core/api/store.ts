import {
  CollectionReference,
  DocumentReference,
  Firestore,
} from "firebase/firestore"

export default abstract class AbstractStore {
  private readonly _db: Firestore

  constructor(db: Firestore) {
    this._db = db
  }

  protected get db() {
    return this._db
  }
}

export interface IStore<T> {
  doc(...segments: string[]): DocumentReference<T>
  collect(...segments: string[]): CollectionReference<T>
  add(ref: CollectionReference<T>): Promise<DocumentReference<T>>
  update(ref: DocumentReference<T>, payload: Partial<T>): Promise<void>
  delete(ref: DocumentReference<T>): Promise<void>
}
