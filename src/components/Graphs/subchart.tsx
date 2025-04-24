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
import { SessionSummary } from "@/lib/types"
import { useAuthContext } from "@/lib/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { Submission } from "@/lib/types"
import { DocumentData } from "firebase/firestore"
import PulseGauge from "./PulseGauge"

/**
 * UI for submiision Chart.
 * @author VerySirias, ZairaGarcia17
 * @returns {JSX.Element}
 */

export default function subChart() {
  const params = useParams()
  const id = params.id ?? ""
  console.debug("param id",id)
  const ref = api.sessions.doc(id)
  const [session] = useDocumentDataOnce(ref)
  const [submissions, setSubmissions] = useState<
    QueryDocumentSnapshot<Submission, DocumentData>[]
  >([])
  
  useEffect(() => {
    if (session) {
      api.submissions
        .findAllBySID(id)
        .then((res) => {
          const docs = res.docs
          setSubmissions(docs)
        })
        .catch((err) => console.debug(err))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])


  return (
      <Card variant='outlined' sx={{ mt: 2 }}>
          <CardContent>
              <Typography variant='h6' align='center'>
                Poll Average
              </Typography>
              <Box display={"flex"} justifyContent={"center"}>
                <PulseGauge score={session?.summary?.average ?? 0}/>
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
                  {session?.title}
                </Typography>
            </Box>
          </CardContent>
      </Card>
  )
}
