import { collection, CollectionReference } from "firebase/firestore"
import BaseStore from "../store"
import { clx } from ".."
import { WaitingUser } from "@/core/types"

export default class WaitingUserStore extends BaseStore {
  public collect(sid: string) {
    return collection(
      this.db,
      clx.sessions,
      sid,
      clx.waiting_users
    ) as CollectionReference<WaitingUser>
  }
}
