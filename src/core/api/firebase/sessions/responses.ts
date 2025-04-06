import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { clx } from ".."
import { SessionResponse } from "@/core/types"
import BaseStore from "../store"

export default class ResponseStore extends BaseStore {
  public doc(sid: string, qid: string, rid: string) {
    return doc(
      this.db,
      clx.sessions,
      sid,
      clx.questions,
      qid,
      clx.responses,
      rid
    ) as DocumentReference<SessionResponse>
  }

  public collect(sid: string, qid: string) {
    return collection(
      this.db,
      clx.sessions,
      sid,
      clx.questions,
      qid
    ) as CollectionReference<SessionResponse>
  }

  public async setDoc(
    sid: string,
    qid: string,
    uid: string,
    payload: Partial<SessionResponse>
  ) {
    await setDoc(this.doc(sid, qid, uid), {
      user: doc(this.db, clx.users, uid),
      answer: payload.answer,
      correct: payload.correct,
      created_at: serverTimestamp(),
    })
  }
}
