import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore"
import BaseStore from "../store"
import OptionStore from "./options"
import { clx } from ".."
import { SessionOption, SessionQuestion } from "@/core/types"
import ResponseStore from "./responses"

export default class QuestionStore extends BaseStore {
  private readonly _options: OptionStore
  private readonly _responses: ResponseStore

  constructor(db: Firestore) {
    super(db)
    this._options = new OptionStore(db)
    this._responses = new ResponseStore(db)
  }

  public get options() {
    return this._options
  }

  public get responses() {
    return this._responses
  }

  public doc(sid: string, qid: string) {
    return doc(this.db, clx.sessions, sid, clx.questions, qid)
  }

  public collect(sid: string) {
    return collection(this.db, clx.sessions, sid, clx.questions)
  }

  public async create(sid: string, payload: SessionQuestion) {
    const qref = await addDoc(this.collect(sid), payload)
    return qref as DocumentReference<SessionQuestion>
  }

  public async gradeAll(
    sid: string,
    qid: string,
    correct_opts: QueryDocumentSnapshot<SessionOption>[]
  ) {
    const responses = await this.responses.getAllAsMap(sid, qid)
    Object.entries(responses).forEach(([uid, _]) => {
      const rref = this.responses.doc(sid, qid, uid)
      this.responses.grade(rref, correct_opts)
    })
  }
}
