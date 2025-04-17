import { SessionAnswer } from "@/core/types"
import BaseStore from "../store"
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { clx } from ".."

/**
 * @deprecated Maybe we don't need this.
 */
export default class AnswerStore extends BaseStore {
  public doc(sid: string, aid: string) {
    return doc(this.db, clx.sessions, sid, clx.answers, aid)
  }

  public collect(sid: string) {
    return collection(
      this.db,
      clx.sessions,
      sid
    ) as CollectionReference<SessionAnswer>
  }

  public async create(
    sid: string,
    uid: string,
    payload: Partial<SessionAnswer>
  ) {
    const ref = doc(this.db, clx.sessions, sid, clx.answers, uid)
    const ss = await getDoc(ref)
    if (ss.exists()) {
      await setDoc(ref, payload, { merge: true })
    } else {
      await setDoc(
        ref,
        {
          ...payload,
          created_at: serverTimestamp(),
        },
        { merge: false }
      )
    }
  }
}
