import {
  doc,
  DocumentReference,
  // serverTimestamp,
  // setDoc,
} from "firebase/firestore"
import BaseStore from "./store"
import { User } from "../../types"
// import { clx } from "."

export default class UserStore extends BaseStore {
  public ref(uid: string) {
    return doc(this.db, "users", uid) as DocumentReference<User>
  }

  // public async create(uid: string, displayName: string) {
  //   const ref = doc(this.db, clx.users, uid) as DocumentReference<User>
  //   await setDoc(
  //     ref,
  //     {
  //       display_name: displayName,
  //       created_at: serverTimestamp(),
  //     },
  //     { merge: true }
  //   )
  // }
}
