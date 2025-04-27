import { Submission } from "@/lib/types"
import { ScatterChart } from "@mui/x-charts"
import React from "react"

interface Props {
  submissions: Submission[]
}

export default function SessionScatterCard(props: Props) {
  const { submissions } = props
  return (
    <React.Fragment>
      <ScatterChart
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
      />
    </React.Fragment>
  )
}
