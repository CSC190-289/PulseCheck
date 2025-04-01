import { collection, doc } from "firebase/firestore"
import { clx } from ".."
import BaseStore from "../store"

export default class OptionStore extends BaseStore {
  public doc(sid: string, qid: string, oid: string) {
    return doc(this.db, clx.sessions, sid, clx.questions, qid, clx.options, oid)
  }

  public collect(sid: string, qid: string) {
    return collection(this.db, clx.sessions, sid, clx.questions, qid)
  }

  // public async create(sid: string, qid: string, payload: SessionOption) {

  // }
}
