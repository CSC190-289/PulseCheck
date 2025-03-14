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
  created_at: string
  updated_at: string
}

export interface Question {
  prompt_type: PromptType
  prompt: string
  prompt_img: string
  options: [PromptOption]
  points: number
  anonymous: boolean
  time: number | undefined
  created_at: Date
  updated_at: Date
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
