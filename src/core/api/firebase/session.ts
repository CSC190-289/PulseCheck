import {
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
  setDoc,
  where,
} from "firebase/firestore"
import BaseStore from "./store"
import { Session } from "@/core/types"
import { clx } from "."
import UserStore from "./session/user"
import WaitingUserStore from "./session/waiting_user"
import ChatStore from "./session/chat"

export default class SessionStore extends BaseStore {
  private readonly _users: UserStore
  private readonly _waiting_users: WaitingUserStore
  private readonly _chat: ChatStore

  constructor(db: Firestore) {
    super(db)
    this._users = new UserStore(db)
    this._waiting_users = new WaitingUserStore(db)
    this._chat = new ChatStore(db)
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

  public doc(sid: string) {
    const ref = doc(this.db, clx.sessions, sid)
    return ref as DocumentReference<Session>
  }

  public collect(): CollectionReference<Session> {
    return collection(this.db, clx.sessions) as CollectionReference<Session>
  }

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
}
