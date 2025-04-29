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
import NoRecentPolls from "./NoRecentPoll"
import PulseGauge from "./PulseGauge"

interface Props {
  mrpsd: number
}

export default function MostRecentGaugeCard(props: Props) {
  const { mrpsd } = props
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
          // console.debug(x?.data().score_100)
          if (!x) return
          setSnapshot(x)
        })
        .catch((err) => console.debug(err))
    }
  }, [user])

  const sub = snapshot?.data()
  // console.debug("testing", snapshot?.data())
  if (!snapshot?.data()) {
    return <NoRecentPolls />
  }

  const submitted_at = sub?.submitted_at

  const onClick = () => {
    if (snapshot) {
      void navigate(`/poll/submission/${snapshot.id}/results`)
    }
  }

  /*mrpsd == 0 is for post poll statistics*/
  if (mrpsd === 0) {
    return (
      <Card variant='outlined'>
        {/* <CardActionArea onClick={onClick}> */}
        <CardContent>
          <Typography variant='h6' align='center'>
            {user?.displayName}'s Score
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <PulseGauge score={sub?.score_100 ?? 0} />
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
        {/* </CardActionArea> */}
      </Card>
    )
  }
  /*mrpsd == 1 is for Most recent Poll*/
  if (mrpsd === 1) {
    return (
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography variant='h6' align='center'>
              Your Latest Score
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <PulseGauge score={sub?.score_100 ?? 0} />
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

  return (
    <Card variant='outlined' sx={{ mt: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant='h6' align='center'>
            Most Recent Poll
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <PulseGauge score={sub?.score_100 ?? 0} />
            {/* <Gauge
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
            /> */}
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
