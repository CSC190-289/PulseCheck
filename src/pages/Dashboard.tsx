import SignOutButton from "@/components/auth/SignOutButton"
import { Container, Typography, Box,Card,CardContent } from "@mui/material"
import CreateJoinButtonAuth from "@/components/Dasboard.tsx/CreateJoinButtonAuth"
import MostRecentScores from "@/components/Graphs/MostRecentScore"

export default function Dashboard() {
  return (
    <Container>
   
        <MostRecentScores/>
      <Typography variant='h4' gutterBottom>
        Different home page for logged in users
      </Typography>
      <CreateJoinButtonAuth/>
      <SignOutButton />
    </Container>
  )
}
