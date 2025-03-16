import { Lobby } from "../types"
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  Firestore,
} from "firebase/firestore"
import PollStore from "./polls"
import UserStore from "./users"
import { initializeApp, FirebaseOptions } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config: FirebaseOptions = {
  apiKey: "AIzaSyBAGd9DDTtn8aAeab4Ydq65yErWAzO7mPg",
  appId: "1:262073852184:web:b7097acec54647a2f5fe6d",
  authDomain: "pulsecheck-7cf2b.firebaseapp.com",
  measurementId: "G-TZTCLTT9EK",
  messagingSenderId: "262073852184",
  projectId: "pulsecheck-7cf2b",
  storageBucket: "pulsecheck-7cf2b.firebasestorage.app",
}

const app = initializeApp(config)

export const auth = getAuth(app)
export const fs = getFirestore(app)

/**
 * Enum to model Firestore collection names.
 * Use this enum to prevent hardcoded strings, reduces typos and
 * provides better autocompletion when referring to Firestore collections.
 */
export enum clx {
  /** Collection for storing polls */
  polls = "polls",
  /** Subcollection for questions */
  questions = "questions",
  /** Subcollection for storing prompt options */
  options = "options",
  /** Collection for storing user data */
  users = "users",
  /** Collection for storing poll sessions */
  sessions = "sessions",
}

/**
 * Serves as a central interface for managing Firestore.
 */
class API {
  private readonly _users: UserStore
  private readonly _polls: PollStore

  constructor(db: Firestore) {
    this._users = new UserStore(db)
    this._polls = new PollStore(db)
  }

  public get users(): UserStore {
    return this._users
  }

  public get polls(): PollStore {
    return this._polls
  }
}

const api = new API(fs)

export default api

/* 
  TODO - instead of declaring individual functions below to communicate to 
  firestore we could use this API I'm building above. Everybody can contribute
  and branch off from it. Allows for basic CRUD.
*/

export async function findLobbyWithCode(code: string): Promise<Lobby> {
  const ref = collection(fs, "lobby")
  const q = query(ref, where("room_code", "==", code))
  const ss = await getDocs(q)
  if (!ss.empty) {
    /* we found one */
    const fdoc = ss.docs[0]
    const obj = fdoc.data() as Lobby
    return {
      id: fdoc.id,
      host: obj.host,
      users: obj.users,
    }
  }
  throw new Error(`Invalid room code '${code}'`)
}

export async function createUser(uid: string, displayName: string) {
  const ref = doc(fs, "users", uid)
  await setDoc(
    ref,
    {
      displayName: displayName,
      createdAt: new Date(),
    },
    { merge: true }
  )
}

export async function joinLobby(lobbyId: string, userId: string) {
  const ref = doc(fs, "lobby", lobbyId)

  await updateDoc(ref, {
    users: arrayUnion(userId),
  })
}
