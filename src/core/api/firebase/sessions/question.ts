import { addDoc, collection, doc, Firestore } from "firebase/firestore"
import BaseStore from "../store"
import OptionStore from "./option"
import { clx } from ".."
import { SessionQuestion } from "@/core/types"
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
    return qref
  }
}
