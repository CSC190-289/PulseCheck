import {
  addDoc,
  arrayUnion,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import AbstractStore from "./store"
import { PromptOption, Question } from "../types"
import PromptOptionStore from "./options"
import { clx } from "."

export default class QuestionStore extends AbstractStore {
  private readonly _options: PromptOptionStore

  constructor(firestore: Firestore) {
    super(firestore)
    this._options = new PromptOptionStore(firestore)
  }

  public get options() {
    return this._options
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

  public async add(ref: CollectionReference<Question>) {
    const qref = await addDoc(ref, {
      prompt: "Untitled Prompt",
      prompt_img: null,
      prompt_type: "multiple-choice",
      options: [],
      anonymous: false,
      points: 1,
      time: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
    return qref
  }

  public async update(
    qref: DocumentReference<Question>,
    payload: Partial<Question>
  ) {
    return updateDoc(qref, {
      ...payload,
      updated_at: serverTimestamp(),
    })
  }

  public async delete(qref: DocumentReference<Question>) {
    await deleteDoc(qref)
    /* TODO - fetch all sub-collections and delete (cloud functions?) */
  }

  public async appendOption(
    qref: DocumentReference<Question>,
    oref: DocumentReference<PromptOption>
  ) {
    await setDoc(
      qref,
      {
        options: arrayUnion(oref),
      },
      {
        merge: true,
      }
    )
  }
}
