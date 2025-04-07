import { Poll, User } from "../../types"
import BaseStore from "./store"
import QuestionStore from "./questions"
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  Query,
  query,
  QuerySnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import api, { clx } from "."

/**
 * Manages /polls collection in Firestore.
 */
export default class PollStore extends BaseStore {
  private readonly _questions: QuestionStore

  constructor(db: Firestore) {
    super(db)
    this._questions = new QuestionStore(super.db)
  }

  public get questions(): QuestionStore {
    return this._questions
  }

  public doc(pid: string) {
    return doc(this.db, clx.polls, pid) as DocumentReference<Poll>
  }

  public collect() {
    return collection(this.db, clx.polls)
  }

  public async add(host: DocumentReference<User>) {
    const pcref = collection(this.db, clx.polls) as CollectionReference<Poll>
    return addDoc(pcref, {
      owner: host,
      title: "Untitled Poll",
      async: true,
      anonymous: false,
      time: null,
      questions: [],
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  }

  public queryUserPolls(uid: string): Query<Poll> {
    const uref = api.users.doc(uid)
    const pollsRef = this.collect()
    const q = query(pollsRef, where("owner", "==", uref)) as Query<Poll>
    return q
  }

  public async getUserPolls(uid: string): Promise<Poll[]> {
    const uref = api.users.doc(uid)
    const pollsRef = this.collect()
    const q = query(pollsRef, where("owner", "==", uref))
    const snapshot = (await getDocs(q)) as QuerySnapshot<Poll>
    const polls: Poll[] = snapshot.docs.map((x) => ({
      ...x.data(),
      id: x.id,
    }))
    return polls
  }

  public async update(
    ref: DocumentReference<Poll, DocumentData>,
    payload: Partial<Poll>
  ) {
    await updateDoc(ref, {
      ...payload,
      updated_at: serverTimestamp(),
    })
  }
}
