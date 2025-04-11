import { Firestore } from "firebase/firestore"
import PollStore from "./polls"
import UserStore from "./users"
import { initializeApp, FirebaseOptions } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import AuthStore from "./auth"
import SessionStore from "./sessions/sessions"
import SubmissionStore from "./submissions"

const config: FirebaseOptions = {
  apiKey: "AIzaSyBAGd9DDTtn8aAeab4Ydq65yErWAzO7mPg",
  appId: "1:262073852184:web:b7097acec54647a2f5fe6d",
  authDomain: "pulsecheck-7cf2b.firebaseapp.com",
  measurementId: "G-TZTCLTT9EK",
  messagingSenderId: "262073852184",
  projectId: "pulsecheck-7cf2b",
  storageBucket: "pulsecheck-7cf2b.firebasestorage.app",
}

const BUCKET_URL = "gs://pulsecheck-7cf2b.firebasestorage.app"

const app = initializeApp(config)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app, BUCKET_URL)

/**
 * Enum to model Firestore collection names.
 * Use this enum to prevent hardcoded strings, reduces typos and
 * provides better autocompletion when referring to Firestore collections.
 */
export enum clx {
  /* Collection for storing polls */
  polls = "polls",
  /* Subcollection for questions */
  questions = "questions",
  /* Subcollection for storing prompt options */
  options = "options",
  /* Collection for storing user data */
  users = "users",
  /* Collection for storing poll sessions */
  sessions = "sessions",
  /* Collection for storing users in waiting room */
  waiting_users = "waiting_users",
  /* Collection for storing responses for poll session questions */
  responses = "responses",
  /* Collection for storing user submissions for poll sessions */
  submissions = "submissions",
}

/**
 * Serves as a central interface for managing Firestore.
 */
class APIStore {
  private readonly _auth: AuthStore
  private readonly _users: UserStore
  private readonly _polls: PollStore
  private readonly _sessions: SessionStore
  private readonly _submissions: SubmissionStore

  constructor(db: Firestore) {
    this._auth = new AuthStore()
    this._users = new UserStore(db)
    this._polls = new PollStore(db)
    this._sessions = new SessionStore(db)
    this._submissions = new SubmissionStore(db)
  }

  public get auth(): AuthStore {
    return this._auth
  }

  public get users(): UserStore {
    return this._users
  }

  public get polls(): PollStore {
    return this._polls
  }

  public get sessions(): SessionStore {
    return this._sessions
  }

  public get submissions(): SubmissionStore {
    return this._submissions
  }
}

const api = new APIStore(firestore)

export default api
