import { doc, DocumentReference } from "firebase/firestore"
import BaseStore from "./store"
import { User } from "../../types"

export default class UserStore extends BaseStore {
  public ref(uid: string) {
    return doc(this.db, "users", uid) as DocumentReference<User>
  }
}
