import {
  addDoc,
  arrayRemove,
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
import BaseStore from "./store"
import { Poll, PromptOption, Question } from "../../types"
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
    const pref = ref.parent as DocumentReference<Poll> | null
    if (!pref) {
      throw new Error("Questions collection needs a parent document(polls).")
    }
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
    /* update poll doc to include reference to {qref} */
    await setDoc(pref, { questions: arrayUnion(qref) }, { merge: true })
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
    const pref = qref.parent.parent as DocumentReference<Poll> | null
    if (!pref) {
      throw new Error("Questions collect needs a parent document (poll)")
    }
    await deleteDoc(qref)
    /* update poll doc to remove reference to {qref} */
    await setDoc(pref, { questions: arrayRemove(qref) }, { merge: true })
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
