import { Gauge, gaugeClasses } from "@mui/x-charts"
import React, { useEffect, useState } from "react"

interface PulseGaugeProps {
  score: number
}

export default function PulseGauge(props: PulseGaugeProps) {
  const [score, setScore] = useState(0)

  useEffect(() => {
    for (let i = 0; i <= props.score; i++) {
      setTimeout(() => {
        setScore(i)
      }, i * 6)
    }
  }, [props.score])

  return (
    <React.Fragment>
      <Gauge
        cornerRadius={6}
        width={256}
        value={+score.toFixed()}
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
    </React.Fragment>
  )
}
