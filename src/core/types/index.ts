import { DocumentReference, Timestamp } from "firebase/firestore"

/**
 * Represents a user in the system.
 */
export enum ThemeType {
  SYSTEM_THEME = "system-theme",
  LIGHT = "light",
  DARK = "dark",
}

export interface User {
  display_name: string
  email: string
  photo_url: string | null
  created_at: Timestamp
}

/**
 * Represents a poll created by a user.
 */
export interface Poll {
  owner: DocumentReference<User>
  title: string
  async: boolean
  anonymous: boolean | null
  time: number | null
  questions: DocumentReference<Question>[]
  created_at: Timestamp
  updated_at: Timestamp
}

export interface Question {
  prompt_type: PromptType
  prompt: string
  prompt_img: string | null
  options: DocumentReference<PromptOption>[]
  points: number
  anonymous: boolean
  time: number | null
  created_at: Timestamp
  updated_at: Timestamp
}

export type PromptType = "multiple-choice" | "multi-select" | "ranking-poll"

export interface PromptTypeChoice {
  name: string
  value: PromptType
}

export const PROMPT_TYPE_CHOICES = [
  {
    name: "Multiple Choice",
    value: "multiple-choice",
  },
  {
    name: "Multi-Select",
    value: "multi-select",
  },
  {
    name: "Ranking Poll",
    value: "ranking-poll",
  },
] as PromptTypeChoice[]

export interface PromptOption {
  text: string
  correct: boolean
}

export enum SessionState {
  /* if a session is closed, then it was ended by the host */
  CLOSED = "closed",
  /* if a session is in-progress, then it was started by the host */
  IN_PROGRESS = "in-progress",
  /* if a session is open, then the host hasn't started the session yet */
  OPEN = "open",
  /* if a session is done, then the host finished the session */
  DONE = "done",
}
export interface Session {
  host: DocumentReference<User>
  poll: DocumentReference<Poll>
  room_code: string
  title: string
  async: boolean
  anonymous: boolean | null
  time: number | null
  question: CurrentQuestion | null
  questions: DocumentReference<SessionQuestion>[]
  answers: SessionAnswer[]
  state: SessionState
  created_at: Timestamp
}

export interface CurrentQuestion {
  prompt_type: PromptType
  prompt: string
  prompt_img: string | null
  options: string[]
  anonymous: boolean | null
  time: number | null
}

export interface SessionAnswer {
  uid: string
  option: string
}

export interface SessionUser {
  photo_url: string | null
  display_name: string
  joined_at: Timestamp
  incorrect: boolean
}

export interface WaitingUser {
  photo_url: string | null
  display_name: string
}

export interface SessionChat {
  user: DocumentReference<User>
  display_name: string
  photo_url: string | null
  message: string
  created_at: Timestamp
}

export interface SessionQuestion {
  prompt_type: PromptType
  prompt: string
  prompt_img: string | null
  options: PromptOption[]
  points: number
  anonymous: boolean | null
  time: number | null
}

export interface SessionResponse {
  user: DocumentReference<User>
  answer: string
  correct: boolean
  created_at: Timestamp
}

export interface Submission {
  session: DocumentReference<Session>
  user: DocumentReference<User>
  display_name: string
  total_score: number
  submitted_at: Timestamp
}
