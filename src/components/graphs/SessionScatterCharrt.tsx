import { Submission } from "@/lib/types"
import { Card, CardContent } from "@mui/material"
import { ScatterChart } from "@mui/x-charts"
import React from "react"

interface Props {
  submissions: Submission[]
}

export default function SessionScatterCard(props: Props) {
  const { submissions } = props
  return (
    <React.Fragment>
      <Card variant='outlined'>
        <CardContent>
          <ScatterChart
            grid={{ vertical: true, horizontal: true }}
            series={[
              {
                label: "Participant Scores",
                data: submissions.map((x) => ({
                  x: +x.score_100?.toFixed(),
                  y: x.score,
                  id: x.user.id,
                })),
              },
            ]}
            xAxis={[{ label: "Score", max: 100 }]}
            yAxis={[{ label: "Raw Score" }]}
            height={256}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
