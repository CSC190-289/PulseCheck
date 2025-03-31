import SignOutButton from "@/components/auth/SignOutButton"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Container,
  Typography,
  Stack,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material"
import api from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import { ntoq, tstos } from "@/utils"

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
            Your Polls
          </Typography>
          {polls?.docs.map((x) => (
            <Card
              key={x.id}
              onClick={() => {
                void navigate(`/poll/${x.id}/edit`)
              }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    {x.data().title}
                  </Typography>
                  <Typography color='textSecondary'>
                    {ntoq(x.data().questions.length)}
                  </Typography>
                  <Typography color='textSecondary'>
                    {tstos(x.data().updated_at)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}
