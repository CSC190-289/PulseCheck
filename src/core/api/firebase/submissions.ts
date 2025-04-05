import { doc, DocumentReference, updateDoc } from "firebase/firestore"
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

  public async updateByRef(
    ref: DocumentReference<Submission>,
    payload: Partial<Submission>
  ): Promise<void> {
    await updateDoc(ref, payload)
  }
}
