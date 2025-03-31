import { DocumentReference, Timestamp } from "firebase/firestore"

export interface User {
  display_name: string
  email: string
  photo_url: string | null
  created_at: Date
}

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

export interface PromptOption {
  text: string
  correct: boolean
}

export interface Session {
  host: DocumentReference<User>
  poll_id: DocumentReference<Poll>
  room_code: string
  title: string
  async: boolean
  anonymous: boolean | null
  time: number | null
  question: DocumentReference<SessionQuestion>
  state: "closed" | "in-progress" | "open"
  created_at: Timestamp
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
  prompt_img: string
  options: string[]
  points: number
  async: boolean | null
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
