import { useNavigate } from "react-router-dom"
import { useAuthContext } from "."

export default function usePompeii() {
  const navigate = useNavigate()
  const user = useAuthContext()

  if (!user) {
    void navigate("/")
  }
}
