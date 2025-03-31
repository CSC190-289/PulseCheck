import { Timestamp } from "firebase/firestore"

/**
 * Converts string to hex color
 */
export function stoc(str: string) {
  let hash = 0
  let i
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  return color
}

/**
 * Converts MM:SS to milliseconds (number)
 */
export function mmsston(formattedMMSS: string): number | null {
  if (!formattedMMSS) {
    return null
  }
  const tokens = formattedMMSS.split(":")
  const minutes = parseInt(tokens[0]) || 0
  const seconds = parseInt(tokens[1]) || 0
  return (minutes * 60 + seconds) * 1000
}

/**
 * Converts number to MM:SS
 */
export function ntommss(n: number | null) {
  if (!n || isNaN(n)) {
    return ""
  }
  const totalSeconds = Math.floor(n / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

/**
 * Converts string to MM:SS format
 */
export function stommss(s: string) {
  let val = s.replace(/\D/g, "")
  if (val.length > 4) {
    val = val.slice(0, 4)
  }
  let formattedVal = val
  if (val.length >= 3) {
    /* format to MM:SS */
    formattedVal = `${val.slice(0, val.length - 2)}:${val.slice(-2)}`
  } else if (val.length > 0) {
    formattedVal = val
  }
  return formattedVal
}

/**
 * Converts a number to a label displaying the number of participants in a poll session.
 * @param n Number of participants
 * @returns Formatted participant count label
 */
export function ntops(n: number) {
  return `${n} Participant${n !== 1 ? "s" : ""}`
}

export function ntoq(n: number) {
  return `${n} Question${n !== 1 ? "s" : ""}`
}

export function tstos(timestamp: Timestamp) {
  const lastUpdated = timestamp.toDate()
  const now = new Date()

  // Calculate time difference in seconds
  const diffInSeconds = Math.floor(
    (now.getTime() - lastUpdated.getTime()) / 1000
  )

  let timeAgo = ""

  if (diffInSeconds < 60) {
    timeAgo = `${diffInSeconds}s ago`
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    timeAgo = `${diffInMinutes}m ago`
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600)
    timeAgo = `${diffInHours}h ago`
  } else if (diffInSeconds < 2592000) {
    const diffInDays = Math.floor(diffInSeconds / 86400)
    timeAgo = `${diffInDays}d ago`
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000)
    timeAgo = `${diffInMonths}mo ago`
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000)
    timeAgo = `${diffInYears}y ago`
  }
  return `${timeAgo}`
}

export function generateRoomCode() {
  const MAX = 6
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let roomCode = ""

  for (let i = 0; i < MAX; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    roomCode += characters[randomIndex]
  }

  return roomCode
}
