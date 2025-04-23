import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge"
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
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (user) {
      api.submissions
        .findMostRecentSubmission(user.uid)
        .then((x) => {
          if (!x) return
          setSnapshot(x)
          for (let i = 0; i <= x.data().score_100; i++) {
            setTimeout(() => {
              setScore(i)
            }, i * 6)
          }
          setTimeout(() => {
            setScore(x.data().score_100)
          }, 500)
        })
        .catch((err) => console.debug(err))
    }
  }, [user])

  const sub = snapshot?.data()
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
              cornerRadius={6}
              width={256}
              value={score}
              startAngle={-110}
              endAngle={110}
              fontSize={24}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
              sx={(theme) => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: theme.palette.action,
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.text.disabled,
                },
              })}
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
