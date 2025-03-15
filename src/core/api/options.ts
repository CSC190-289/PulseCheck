import { collection, CollectionReference } from "firebase/firestore"
import BaseStore from "./store"
import { PromptOption } from "../types"
import { clx } from "."

export default class PromptOptionStore extends BaseStore {
  /**
   * Creates
   * @param pid
   * @param qid
   * @returns
   */
  public collect(pid: string, qid: string) {
    return collection(
      this.db,
      clx.polls,
      pid,
      clx.questions,
      qid,
      clx.options
    ) as CollectionReference<PromptOption>
  }
}
