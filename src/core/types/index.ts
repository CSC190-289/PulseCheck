import { DocumentReference, Timestamp } from "firebase/firestore"

export interface User {
  display_name: string
  email: string
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

export interface Lobby {
  id: string
  host: string
  users: string[]
}
