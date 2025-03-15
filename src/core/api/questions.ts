import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import BaseStore from "./store"
import { Question } from "../types"
import PromptOptionStore from "./options"
import { clx } from "."

export default class QuestionStore extends BaseStore {
  private readonly _options: PromptOptionStore

  constructor(firestore: Firestore) {
    super(firestore)
    this._options = new PromptOptionStore(firestore)
  }

  public get options() {
    return this._options
  }

  public async add(ref: CollectionReference<Question>) {
    await addDoc(ref, {
      prompt: "Untitled Prompt",
      prompt_img: null,
      prompt_type: "multiple-choice",
      anonymous: false,
      points: 1,
      time: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  }

  public doc(pid: string, qid: string) {
    return doc(
      this.db,
      clx.polls,
      pid,
      clx.questions,
      qid
    ) as DocumentReference<Question>
  }

  public collect(pid: string) {
    return collection(
      this.db,
      clx.polls,
      pid,
      clx.questions
    ) as CollectionReference<Question>
  }

  public async update(
    qref: DocumentReference<Question>,
    payload: Partial<Question>
  ) {
    await updateDoc(qref, {
      ...payload,
      updated_at: serverTimestamp(),
    })
  }

  public async delete(qref: DocumentReference<Question>) {
    await deleteDoc(qref)
    /* TODO - fetch all sub-collections and delete (cloud functions?) */
  }
}
