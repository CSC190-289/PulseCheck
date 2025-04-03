import { doc, DocumentReference } from "firebase/firestore"
import BaseStore from "./store"
import { Submission } from "@/core/types"
import { clx } from "."

export default class SubmissionStore extends BaseStore {
  public doc(sid: string): DocumentReference<Submission> {
    return doc(this.db, clx.submissions, sid) as DocumentReference<Submission>
  }
}
