import { useNavigate } from "react-router-dom"
import { Button, Container, Typography, Grid2 } from "@mui/material"
import api from "@/lib/api/firebase"
import { useAuthContext } from "@/lib/hooks"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import UserPollCard from "@/components/dashboard/UserPollCard"
import { Add, HowToVote } from "@mui/icons-material"
import SubmissionGaugeCard from "@/components/graphs/SubmissionGaugeCard"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [polls] = useCollectionOnce(api.polls.queryUserPolls(user?.uid ?? "1"))

  const handleCreatePoll = () => {
    if (user) {
      const host = api.users.doc(user.uid)
      void api.polls
        .add(host)
        .then((ref) => {
          void navigate(`/poll/${ref.id}/edit`)
        })
        .catch((err) => console.debug(err))
    }
  }

  const handleUserJoin = () => {
    void navigate("/poll/join")
  }

  return (
    <Container maxWidth='md' sx={{ textAlign: "initial", marginBlock: 2 }}>
      <SubmissionGaugeCard mrpsd={1} />
      <Grid2 container mt={2} spacing={1}>
        <Grid2 size={6}>
          <Button
            startIcon={<HowToVote />}
            variant='contained'
            onClick={handleUserJoin}
            fullWidth>
            Join Poll
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button
            startIcon={<Add />}
            variant='contained'
            fullWidth
            onClick={handleCreatePoll}>
            Create Poll
          </Button>
        </Grid2>
        <Grid2 size={12}>
          {polls && polls.docs.length > 0 && (
            <Typography variant='h6'>Your Polls</Typography>
          )}
        </Grid2>
        {polls?.docs.map((x) => (
          <Grid2 key={x.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <UserPollCard key={x.id} pid={x.id} poll={x.data()} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  )
}
