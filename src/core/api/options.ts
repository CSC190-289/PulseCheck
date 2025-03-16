import { addDoc, collection, CollectionReference } from "firebase/firestore"
import AbstractStore from "./store"
import { PromptOption } from "../types"
import { clx } from "."

export default class PromptOptionStore extends AbstractStore {
  /**
   * Collects all options based on given `pid` and `qid`.
   * @param pid Poll ID in polls collection
   * @param qid Question ID in questions collection
   * @returns Subcollection reference to polls/`:pid`/questions/`:qid`/options
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

  public async add(ref: CollectionReference<PromptOption>) {
    const oref = await addDoc(ref, {
      text: "",
      correct: false,
    })
    return oref
  }
}
