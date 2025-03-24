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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { clx } from "."
import SessionStore from "./session"

export default class PollStore extends BaseStore {
  private readonly _questions: QuestionStore
  private readonly _sessions: SessionStore

  constructor(db: Firestore) {
    super(db)
    this._questions = new QuestionStore(super.db)
    this._sessions = new SessionStore(super.db)
  }

  public get questions(): QuestionStore {
    return this._questions
  }

  public get sessions(): SessionStore {
    return this._sessions
  }

  public doc(pid: string) {
    return doc(this.db, clx.polls, pid) as DocumentReference<Poll>
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
