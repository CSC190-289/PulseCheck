import { useNavigate } from "react-router-dom"
import { Button, Container } from "@mui/material"

export default function CreateJoinButtonAuth() {
    const navigate = useNavigate()

    const handleJoinAuth = () => {
       void navigate("/poll/join")
    }
    const handleCreatePoll =() => {
      void navigate('/poll/:id/edit')
    }

return(
    <Container>
        <Button
          variant='contained'
          color='primary'
          sx={{ mb: 1 }}
          onClick={handleJoinAuth}
          fullWidth>
          JOIN POLL
        </Button>
        <Button
          variant='contained'
          color='primary'
          sx={{ mb: 1 }}
          onClick={handleCreatePoll}
          fullWidth>
          CREATE POLL
        </Button>
    </Container>
    
      )
}