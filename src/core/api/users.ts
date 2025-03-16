import { doc, DocumentReference } from "firebase/firestore"
import AbstractStore from "./store"
import { User } from "../types"

export default class UserStore extends AbstractStore {
  public ref(uid: string) {
    return doc(this.db, "users", uid) as DocumentReference<User>
  }
}
