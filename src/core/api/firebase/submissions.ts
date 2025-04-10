import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import BaseStore from "./store"
import { Submission } from "@/core/types"
import { clx } from "."

/**
 * Manages /submissions collection in Firestore.
 */
export default class SubmissionStore extends BaseStore {
  public doc(sid: string): DocumentReference<Submission> {
    return doc(this.db, clx.submissions, sid) as DocumentReference<Submission>
  }

  public collect(): CollectionReference<Submission> {
    return collection(
      this.db,
      clx.submissions
    ) as CollectionReference<Submission>
  }

  public async updateByRef(
    ref: DocumentReference<Submission>,
    payload: Partial<Submission>
  ): Promise<void> {
    await updateDoc(ref, payload)
  }

  public findAllByUID(uid: string) {
    const userRef = doc(this.db, clx.users, uid)
    const subsRef = collection(this.db, clx.submissions)
    const q = query(subsRef, where("user", "==", userRef))
    return getDocs(q)
  }

  public findAllBySID(sid: string) {
    const sessionRef = doc(this.db, clx.sessions, sid)
    const subsRef = this.collect()
    const q = query(subsRef, where("session", "==", sessionRef))
    return getDocs(q)
  }
}
