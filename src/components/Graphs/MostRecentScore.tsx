import { Gauge } from "@mui/x-charts/Gauge"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material"
import { QueryDocumentSnapshot } from "firebase/firestore"
import api from "@/lib/api/firebase"
import { useEffect, useState } from "react"
import { Submission } from "@/lib/types"
import { useAuthContext } from "@/lib/hooks"
import { useNavigate } from "react-router-dom"

export default function MostRecentScores() {
  const { user } = useAuthContext()
  const [snapshot, setSnapshot] = useState<
    QueryDocumentSnapshot<Submission> | null | undefined
  >()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      api.submissions
        .findMostRecentSubmission(user.uid)
        .then((x) => {
          setSnapshot(x)
        })
        .catch((err) => console.debug(err))
    }
  }, [user])

  const sub = snapshot?.data()
  const score = sub?.score_100
  const submitted_at = sub?.submitted_at

  const onClick = () => {
    if (snapshot) {
      void navigate(`/poll/submission/${snapshot.id}/results`)
    }
  }

  return (
    <Card variant='outlined' sx={{ mt: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant='h6' align='center'>
            Most Recent Poll
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Gauge
              cornerRadius={32}
              color='blue'
              width={256}
              value={score}
              startAngle={-110}
              endAngle={110}
              fontSize={24}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Box>
          <Box>
            <Typography
              variant='h6'
              fontWeight={"bold"}
              align='center'
              gutterBottom>
              {sub?.title}
            </Typography>

            <Typography variant='body2' color='textSecondary' align='center'>
              Submitted: {submitted_at?.toDate().toLocaleDateString()}{" "}
              {submitted_at?.toDate().toLocaleTimeString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
