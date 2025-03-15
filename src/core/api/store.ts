import { Firestore } from "firebase/firestore"

export default class BaseStore {
  private readonly _db: Firestore

  constructor(db: Firestore) {
    this._db = db
  }

  protected get db() {
    return this._db
  }
}
