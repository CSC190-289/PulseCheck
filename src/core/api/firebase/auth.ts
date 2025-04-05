import { signInAnonymously, signOut } from "firebase/auth"
import { auth } from "."

export default class AuthStore {
  public loginAsGuest() {
    return signInAnonymously(auth)
  }

  public logout() {
    return signOut(auth)
  }
}
