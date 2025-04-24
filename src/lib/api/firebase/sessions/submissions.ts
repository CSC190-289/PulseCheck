import { doc, DocumentReference, setDoc } from "firebase/firestore"
import BaseStore from "../store"
import { Submission } from "@/lib/types"
import { clx } from ".."

export default class SubmissionStore extends BaseStore {
  public doc(ssid: string, subId: string) {
    const ref = doc(this.db, clx.submissions, ssid, clx.sessions, subId)
    return ref
  }

  public async insert(ref: DocumentReference<Submission>, payload: Submission) {
    await setDoc(ref, payload, { merge: false })
  }
}
