import { useNavigate } from "react-router-dom"
import { useAuthContext } from "."
import { useEffect } from "react"

export default function usePompeii() {
  const navigate = useNavigate()
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (!user && !loading) {
      void navigate("/")
    }
  }, [user, loading, navigate])
}
