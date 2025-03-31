import { signInAnonymously } from "firebase/auth"
import { auth } from "."

export default class AuthStore {
  public signInAsGuest() {
    return signInAnonymously(auth)
  }
}
