import { Poll, User } from "../types"
import AbstractStore from "./store"
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

export default class PollStore extends AbstractStore {
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

  public async add(host: DocumentReference<User>) {
    const pcref = collection(this.db, clx.polls) as CollectionReference<Poll>
    return addDoc(pcref, {
      owner: host,
      title: "Untitled Poll",
      async: true,
      anonymous: false,
      time: null,
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
