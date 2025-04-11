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
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import BaseStore from "../store"
import {
  CurrentQuestion,
  PromptOption,
  Session,
  SessionAnswer,
  SessionQuestion,
  SessionState,
} from "@/core/types"
import api, { clx } from ".."
import UserStore from "./users"
import WaitingUserStore from "./waiting_users"
import ChatStore from "./chat"
import { generateRoomCode } from "@/utils"
import QuestionStore from "./question"

/**
 * Manages /sessions collection in Firestore.
 */
export default class SessionStore extends BaseStore {
  private readonly _users: UserStore
  private readonly _waiting_users: WaitingUserStore
  private readonly _chat: ChatStore
  private readonly _questions: QuestionStore

  constructor(db: Firestore) {
    super(db)
    this._users = new UserStore(db)
    this._waiting_users = new WaitingUserStore(db)
    this._chat = new ChatStore(db)
    this._questions = new QuestionStore(db)
  }

  public get users() {
    return this._users
  }

  public get waiting_users() {
    return this._waiting_users
  }

  public get chat() {
    return this._chat
  }

  public get questions() {
    return this._questions
  }

  public doc(sid: string) {
    const ref = doc(this.db, clx.sessions, sid)
    return ref as DocumentReference<Session>
  }

  public collect(): CollectionReference<Session> {
    return collection(this.db, clx.sessions) as CollectionReference<Session>
  }

  /**
   * Tries to find a session with room code.
   * @throws Error if session with passed code does not exist.
   */
  public async getByCode(code: string): Promise<DocumentReference<Session>> {
    const ref = this.collect()
    /* find the first session that matches */
    const q = query(ref, where("room_code", "==", code), limit(1))
    const ss = await getDocs(q)
    if (!ss.empty) {
      /* found session with code */
      const x = ss.docs[0]
      return x.ref
    }
    throw new Error(`Invalid room code: ${code}`)
  }

  /**
   * Checks if the user is in the waiting queue.
   * @param sid - Session ID
   * @param uid - User ID
   * @returns {Promise<boolean>} - True if the user is waiting, false otherwise.
   */
  public async isWaitingForEntry(sid: string, uid: string): Promise<boolean> {
    const ref = doc(this.doc(sid), clx.waiting_users, uid)
    const data = await getDoc(ref)
    return data.exists()
  }

  /**
   * Checks if the user is participating the session.
   * @param sid - Session ID
   * @param uid - User ID
   * @returns {Promise<boolean>} - True if the user is in the session, false otherwise.
   */
  public async hasJoined(sid: string, uid: string): Promise<boolean> {
    const ref = doc(this.doc(sid), clx.users, uid)
    const data = await getDoc(ref)
    return data.exists()
  }

  /**
   * Adds a user to the waiting queue to join the session.
   * @param sid - Session ID
   * @param uid - User ID
   */
  public async enqueue(
    sid: string,
    uid: string,
    payload: { photo_url: string | null; display_name: string }
  ) {
    const sref = this.doc(sid)
    const wref = doc(sref, clx.waiting_users, uid)
    await setDoc(wref, payload, { merge: false })
  }

  public async leaveQueue(sid: string, uid: string) {
    const sref = this.doc(sid)
    const wref = doc(sref, clx.waiting_users, uid)
    await deleteDoc(wref)
  }

  public async leaveSession(sid: string, uid: string) {
    const sref = this.doc(sid)
    const uref = doc(sref, clx.users, uid)
    await deleteDoc(uref)
  }

  public async isHost(sid: string, uid: string): Promise<boolean> {
    const sref = this.doc(sid)
    const session = await getDoc(sref)
    if (!session.exists()) {
      throw new Error("Session does not exist!")
    }
    return session.data().host.id === uid
  }

  /**
   * Creates Poll Session by given poll id
   */
  public async host(pid: string, uid: string): Promise<string> {
    const uref = api.users.doc(uid)
    const pref = api.polls.doc(pid)
    const pollDoc = await getDoc(pref)
    if (!pollDoc.exists()) {
      throw new Error(`${pref.path} does not exist!`)
    }
    const poll = pollDoc.data()
    if (poll.owner.path !== uref.path) {
      throw new Error(`Unauthorized access to poll!`)
    }
    const session = await addDoc(this.collect(), {
      host: uref,
      poll: pref,
      room_code: generateRoomCode(),
      title: poll.title,
      async: poll.async,
      anonymous: poll.anonymous,
      time: poll.time,
      question: null,
      questions: [],
      answers: [],
      state: SessionState.OPEN,
      created_at: serverTimestamp(),
    })
    return session.id
  }

  public async updateByRef(
    ref: DocumentReference<Session>,
    payload: Partial<Session>
  ) {
    await updateDoc(ref, payload)
  }

  /**
   * @brief Host starts the session.
   */
  public async start(ref: DocumentReference<Session>) {
    /* fetch session doc by {ref} */
    const session_ss = await getDoc(ref)
    if (!session_ss.exists()) {
      throw new Error(`session(${ref.id}) does not exist!`)
    }
    const session = session_ss.data()
    /* fetch session's poll by {session.poll} */
    const poll_ss = await getDoc(session.poll)
    const poll = poll_ss.data()
    if (!poll) {
      throw new Error(`poll(${poll_ss.id}) does not exist!`)
    }
    const question_refs: DocumentReference<SessionQuestion>[] = []
    /* iterate all of the poll's questions */
    for (const q of poll.questions) {
      const opts: PromptOption[] = []
      /* fetch the question's data */
      const pq_ss = await getDoc(q)
      if (!pq_ss.exists()) {
        throw new Error(`question(${pq_ss.id}) does not exist!`)
      }
      const pq = pq_ss.data()
      /* iterate the question's options */
      for (const oref of pq.options) {
        const opt_ss = await getDoc(oref)
        if (!opt_ss.exists()) {
          throw new Error(`opt(${opt_ss.id}) does not exist!`)
        }
        const opt = opt_ss.data()
        opts.push(opt)
      }
      const sqref = (await this.questions.create(ref.id, {
        anonymous: pq.anonymous,
        points: pq.points,
        prompt: pq.prompt,
        prompt_img: pq.prompt_img,
        prompt_type: pq.prompt_type,
        time: pq.time,
        options: opts,
      })) as DocumentReference<SessionQuestion>
      question_refs.push(sqref)
    }
    await this.updateByRef(ref, {
      state: SessionState.IN_PROGRESS,
      questions: question_refs,
    })
  }

  /**
   * @brief Host moves to the next question
   * @throws Error if the session does not exist
   * @throws Error if the next question of the session does not exist.
   */
  public async nextQuestion(ref: DocumentReference<Session>) {
    const ss = await getDoc(ref)
    if (!ss.exists()) {
      throw new Error(`session(${ref.id}) does not exist!`)
    }
    const session = ss.data()
    const questions = session.questions
    const nextQuestion = questions.shift()
    if (nextQuestion) {
      const q_ss = await getDoc(nextQuestion)
      if (!q_ss.exists()) {
        throw new Error(`nextQuestion(${nextQuestion.id}) does nto exist!`)
      }
      const q = q_ss.data()
      const payload: CurrentQuestion = {
        prompt_type: q.prompt_type,
        prompt: q.prompt,
        prompt_img: q.prompt_img,
        options: q.options.map((x) => x.text),
        anonymous: q.anonymous,
        time: q.time,
      }
      await setDoc(
        ref,
        {
          question: payload,
          questions: arrayRemove(nextQuestion),
          answers: [],
        },
        { merge: true }
      )
    } else {
      await setDoc(
        ref,
        {
          question: null,
          questions: [],
          answers: [],
          state: SessionState.DONE,
        },
        { merge: true }
      )
    }
  }

  /**
   * @deprecated Implement this in responses store
   * Records a user's answer to the current question in session doc.
   */
  public async recordAnswer(
    ref: DocumentReference<Session>,
    payload: SessionAnswer
  ) {
    await setDoc(ref, { answers: arrayUnion(payload) }, { merge: true })
    // await this.questions.responses.setDoc(sid, qid, uid, {
    //   answer: payload.answer,
    //   correct: false,
    // })
  }

  public async close(ref: DocumentReference<Session>) {
    await this.updateByRef(ref, {
      room_code: ref.id,
      state: SessionState.CLOSED,
    })
  }
}
