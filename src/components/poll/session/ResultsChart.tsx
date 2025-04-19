import { BarChart } from "@mui/x-charts/BarChart"

import { SessionQuestionResults } from "@/core/types"
import { data } from "react-router-dom"

interface Props {
  results: SessionQuestionResults
}

export default function ResultsChart(props: Props) {
  const { results } = props
  console.debug("results", results)
  const series = Object.values(results.series).map((x) => ({
    data: x.data,
    label: x.text,
  }))
  console.debug("series", series)
  const yAxisData = Object.values(results.series).map((x) => x.text)
  console.debug("yAxisData", yAxisData)
  const dataSeries = []
  series.forEach((x) => dataSeries.push(x.data[0]))
  console.debug(dataSeries)

  /* TODO - figure out how to render the data */
  return (
    <BarChart
      //   series={series}
      // series={[
      //   { data: [35, 44, 24] },
      // ]}
      //yAxis = {[{data: ["waga", "baga", "bobo"], scaleType: "band"}]}
      series={[{data: dataSeries}]}
      yAxis={[{ data: yAxisData, scaleType: "band" }]}
      layout='horizontal'
      height={300}
    />
  )
}
