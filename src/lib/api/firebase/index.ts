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
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"
import VertexStore from "./vertex"

export const DEPLOY_URL = "https://pulsecheck-7cf2b.web.app"

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
const vertexAI = getVertexAI(app)
export const model = getGenerativeModel(vertexAI, {
  model: "gemini-2.0-flash-001",
})
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
  /* Collection for storing user answers of the current question */
}

export async function extractTextWIP(uri: string) {
  const prompt = "Extract Text! Return it as formatted text per page."
  const image = {
    fileData: {
      mimeType: "application/pdf",
      fileUri: uri,
    },
  }
  const payload = [prompt, image]
  console.debug("processing...")
  const result = await model.generateContent(payload)
  const res = result.response
  const text = res.text()
  console.debug(text)
}

export async function extractText() {
  // Provide a prompt that contains text
  const promptExtract = "Extract Text! Return it as formatted text per page."
  const promptMultipleChoice =
    "Generate 3 questions and 4 multiple choice style options, of which 3 are incorrect and 1 is correct for each question in a json format that i can parse. label possible answers in number format and tell me which one of the options is correct based by returning its index"
  const removethingies = "Remove first three characters from given text"
  // To generate text output, call generateContent with the text input
  const imagePart = {
    fileData: {
      mimeType: "application/pdf",
      fileUri:
        "https://firebasestorage.googleapis.com/v0/b/pulsecheck-7cf2b.firebasestorage.app/o/Lecture%2012%20-%20Design%20Patterns%20-%20Part%202.pdf?alt=media&token=be4fa786-d3c7-4fc0-b9d0-f44838d18715",
    },
  }
  console.debug("processing...")
  const result = await model.generateContent([promptExtract, imagePart])
  const responseParsed = result.response
  const textParsed = responseParsed.text()
  //console.debug(textParsed)
  const questionResults = await model.generateContent([
    textParsed,
    promptMultipleChoice,
  ])
  const questionResponse = questionResults.response
  const questionJson = questionResponse.text() // returns json
  console.debug(questionJson)

  const removeResult = await model.generateContent([
    questionJson,
    removethingies,
  ])
  const removeResponse = removeResult.response
  const removeText = removeResponse.text()
  console.debug(removeText[0])
  interface parseType {
    question: string
    options: string[]
    correct_answer: number
  }

  const payload: parseType = JSON.parse(removeText) as parseType
  console.debug(payload)
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
  private readonly _vertex: VertexStore

  constructor(db: Firestore) {
    this._auth = new AuthStore()
    this._users = new UserStore(db)
    this._polls = new PollStore(db)
    this._sessions = new SessionStore(db)
    this._submissions = new SubmissionStore(db)
    this._vertex = new VertexStore()
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

  public get vertex(): VertexStore {
    return this._vertex
  }
}

const api = new APIStore(firestore)

export default api
