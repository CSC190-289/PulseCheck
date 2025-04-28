import { SessionQuestionResults } from "@/lib/types"
import { Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts"
import React from "react"

interface Props {
  results: SessionQuestionResults
}

export default function ResultsChart(props: Props) {
  const { results } = props
  // const barchart = results.barchart
  // console.debug("series", results.barchart)
  // const series = Object.values(results.series).map((x) => ({
  //   data: x.data,
  //   label: x.text,
  // }))
  // console.debug("series", series)
  // const yAxisData = Object.values(results.series).map((x) => x.text)
  // console.debug("yAxisData", yAxisData)
  // const dataSeries: number[] = []
  // series.forEach((x) => dataSeries.push(x.data[0]))
  // console.debug(dataSeries)

  return (
    <React.Fragment>
      <Typography>{results.question.prompt}</Typography>
      {/* <BarChart
        series={[{ data: barchart.data }]}
        xAxis={[{ tickMinStep: 1 }]}
        yAxis={[
          {
            data: barchart.labels,
            scaleType: "band",
            tickPlacement: "middle",
            },
            ]}
            layout='horizontal'
            height={300}
            /> */}
      <PieChart
        series={[{ data: results.piechart }]}
        slotProps={{
          legend: {
            sx: {
              blockOverflow: "clip",
            },
            markType: "square",
            direction: "horizontal",
            position: {
              horizontal: "center",
              vertical: "bottom",
            },
          },
        }}
        height={256}
      />
    </React.Fragment>
  )
}
