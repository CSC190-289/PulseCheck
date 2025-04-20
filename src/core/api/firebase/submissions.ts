import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import BaseStore from "./store"
import {
  SessionOption,
  SessionQuestion,
  SessionResponse,
  Submission,
} from "@/core/types"
import api, { clx } from "."

/**
 * Manages /submissions collection in Firestore.
 */
export default class SubmissionStore extends BaseStore {
  public doc(sid: string): DocumentReference<Submission> {
    return doc(this.db, clx.submissions, sid) as DocumentReference<Submission>
  }

  public collect() {
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

  public async create(payload: Partial<Submission>) {
    await addDoc(this.collect(), {
      ...payload,
      submitted_at: serverTimestamp(),
    })
  }

  public async getUserResponses(
    submission: Submission
  ): Promise<UserResponse[]> {
    const sref = submission.session
    const uid = submission.user.id
    /* fetch session doc */
    const s_ss = await getDoc(sref)
    if (!s_ss.exists()) {
      throw new Error(`Failed to get sessions/${sref.id}`)
    }
    const arr: UserResponse[] = []
    /* iterate all session questions */
    for (const qref of s_ss.data().questions) {
      /* fetch session queston doc  */
      const q_ss = await getDoc(qref)
      if (!q_ss.exists()) {
        throw new Error(`Failed to get sessions/questions/${qref.id}`)
      }
      const question = q_ss.data()
      /* fetch session question options */
      const o_ss = await api.sessions.questions.options.getAll(sref.id, qref.id)
      /* map options */
      const options = new Map<string, SessionOption>()
      o_ss.forEach((x) => {
        options.set(x.id, x.data())
      })
      const rref = api.sessions.questions.responses.doc(sref.id, qref.id, uid)
      /* fetch user's response doc */
      const r_ss = await getDoc(rref)
      const response = r_ss.data() ?? null
      arr.push({ question, response, options })
    }
    return arr
  }
}

interface UserResponse {
  question: SessionQuestion
  response: SessionResponse | null
  options: Map<string, SessionOption>
}
