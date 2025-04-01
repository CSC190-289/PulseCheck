import { collection, doc, Firestore } from "firebase/firestore"
import BaseStore from "../store"
import OptionStore from "./option"
import { clx } from ".."

export default class QuestionStore extends BaseStore {
  private readonly _options: OptionStore

  constructor(db: Firestore) {
    super(db)
    this._options = new OptionStore(db)
  }

  public get options() {
    return this._options
  }

  public doc(sid: string, qid: string) {
    return doc(this.db, clx.sessions, sid, clx.questions, qid)
  }

  public collect(sid: string) {
    return collection(this.db, clx.sessions, sid, clx.questions)
  }

  // public async create(sid: string, payload: SessionQuestion) {}
}
