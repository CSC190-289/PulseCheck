import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  refEqual,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { clx } from ".."
import { SessionOption, SessionResponse } from "@/lib/types"
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
      qid,
      clx.responses
    ) as CollectionReference<SessionResponse>
  }

  public async setDoc(
    sid: string,
    qid: string,
    uid: string,
    payload: Partial<SessionResponse>
  ) {
    const ref = this.doc(sid, qid, uid)
    const ss = await getDoc(ref)
    if (ss.exists()) {
      await setDoc(
        ref,
        {
          user: doc(this.db, clx.users, uid),
          choices: payload.choices,
          correct: payload.correct,
        },
        { merge: true }
      )
    } else {
      await setDoc(ref, {
        user: doc(this.db, clx.users, uid),
        choices: payload.choices,
        correct: payload.correct,
        created_at: serverTimestamp(),
      })
    }
  }

  public async getAllAsMap(sid: string, qid: string) {
    const ref = this.collect(sid, qid)
    const q = query(ref)
    const ss = await getDocs(q)
    const payload = Object.fromEntries(ss.docs.map((x) => [x.id, x.data()]))
    return payload
  }

  public async answer(
    sid: string,
    qid: string,
    uid: string,
    choices: DocumentReference<SessionOption>[]
  ) {
    /* init path to response doc */
    const ref = this.doc(sid, qid, uid)
    const ss = await getDoc(ref)
    if (ss.exists()) {
      await setDoc(
        ref,
        {
          user: doc(this.db, clx.users, uid),
          choices: choices,
        },
        { merge: true }
      )
    } else {
      await setDoc(
        ref,
        {
          user: doc(this.db, clx.users, uid),
          choices: choices,
          created_at: serverTimestamp(),
        },
        { merge: false }
      )
    }
  }

  public async grade(
    rref: DocumentReference<SessionResponse>,
    correct_opts: QueryDocumentSnapshot<SessionOption>[]
  ) {
    /* TODO - take into account of prompt_type */
    const r_ss = await getDoc(rref)
    if (!r_ss.exists()) throw new Error(`${rref.path} does not exist!`)
    const choices = r_ss.data().choices
    const correct =
      correct_opts.every((x) => choices.some((y) => refEqual(x.ref, y))) &&
      correct_opts.length === choices.length
    await setDoc(rref, { correct }, { merge: true })
  }
}
