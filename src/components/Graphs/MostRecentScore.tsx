import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge"
import { Card, CardContent, Typography } from "@mui/material"
import { DocumentData, getDoc } from "firebase/firestore"
import api from "@/core/api/firebase"
import { DocumentReference } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { useEffect, useState } from "react"
import { Session, Submission } from "@/core/types"

export default function MostRecentScores() {
  const auth = getAuth()
  const uid: string = auth.currentUser?.uid!
  console.debug(uid)

  const [ref, setRef] = useState<DocumentReference<Submission, DocumentData>>()

  useEffect(() => {
    if (auth) {
      api.submissions
        .findLatestSub(uid)
        .then((mostRec) => {
          mostRec.forEach((doc) => {
            console.debug("data: ", doc.id)
            setRef(api.submissions.doc(doc.id))
          })
        })
        .catch((err) => console.debug(err))
    }
  }, [auth])

  const [sub] = useDocumentDataOnce(ref)
  const total_score = sub?.total_score
  const submitted_at = sub?.submitted_at

  const [session, setSession] = useState<Session>()
  useEffect(() => {
    if (sub) {
      const title: string = sub.session.id
      const pollRef = api.sessions.doc(title)
      getDoc(pollRef)
        .then((doc) => {
          setSession(doc.data())
        })
        .catch((err) => console.debug(err))
    }
  }, [sub])

  useEffect(() => {
    console.debug(session)
  }, [session])

  return (
    <Card variant='outlined' sx={{ marginTop: 4 }}>
      <Typography
        variant='h6'
        component='div'
        align='center'
        sx={{ marginTop: 2 }}>
        Most recent poll:
      </Typography>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Gauge
          width={250}
          height={200}
          value={total_score}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
              transform: "translate(0px, 0px)",
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
      </CardContent>
      <Typography
        variant='h6'
        component='div'
        align='center'
        sx={{ marginTop: 2 }}>
        {session?.title}
      </Typography>

      <Typography
        variant='h6'
        component='div'
        align='center'
        sx={{ marginTop: 2 }}>
        Recorded: {submitted_at?.toDate().toLocaleDateString()}{" "}
        {submitted_at?.toDate().toLocaleTimeString()}
      </Typography>
    </Card>
  )
}
