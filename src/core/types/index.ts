import { Timestamp } from "firebase/firestore"

export interface User {
  displayName: string
  createdAt: Date
}

export interface Poll {
  owner: string
  title: string
  async: boolean
  anonymous: boolean | null
  time: number | null
  created_at: Timestamp
  updated_at: Timestamp
}

export interface Question {
  prompt_type: PromptType
  prompt: string
  prompt_img: string
  points: number
  anonymous: boolean
  time: number | undefined
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
