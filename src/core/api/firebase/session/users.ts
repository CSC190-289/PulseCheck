import { collection, CollectionReference } from "firebase/firestore"
import BaseStore from "../store"
import { clx } from ".."
import { SessionUser } from "@/core/types"

export default class UserStore extends BaseStore {
  public collect(sid: string) {
    return collection(
      this.db,
      clx.sessions,
      sid,
      clx.users
    ) as CollectionReference<SessionUser>
  }
}
