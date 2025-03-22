import SignOutButton from "@/components/auth/SignOutButton"
import { useNavigate } from "react-router-dom"
import { Button, Container, Typography, Stack, Box } from "@mui/material"
import RecentPollCard from "../components/dashboard/RecentPollCard"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/core/api/firebase"
import api from "@/core/api/firebase"

export default function Dashboard() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const handleCreatePoll = () => {
    if (user) {
      const host = api.users.ref(user.uid)
      void api.polls
        .add(host)
        .then((ref) => {
          void navigate(`/poll/edit/${ref.id}`)
        })
        .catch((err) => console.debug(err))
    }
  }

  const handleUserJoin = () => {
    void navigate("/poll/join")
  }

  return (
    <Container maxWidth='xs'>
      <Box mb={16} mt={16}>
        <Stack
          sx={{ m: 1 }} // margin for everything in the box
          spacing={3}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleUserJoin}
            fullWidth>
            Join Poll
          </Button>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleCreatePoll}>
            Create Poll
          </Button>
          <SignOutButton />
        </Stack>
        <Stack sx={{ m: 1 }} spacing={3} textAlign={"left"}>
          <Typography variant='h6' align='left'>
            Recent Polls
          </Typography>
          <RecentPollCard pollTitle='Getting Stated!' result='0/100' />
          <RecentPollCard pollTitle='Poll 2' result='90/100' />
          <RecentPollCard pollTitle="Baby's First Poll" result='100/100' />
        </Stack>
      </Box>
    </Container>
  )
}
