import { BarChart } from "@mui/x-charts/BarChart"

import { SessionQuestionResults } from "@/core/types"

interface Props {
  results: SessionQuestionResults
}

export default function ResultsChart(props: Props) {
  const { results } = props
  const series = Object.values(results.series).map((x) => ({ data: x.data }))
  console.debug("series", series)
  const xAxisData = Object.values(results.series).map((x) => x.text)
  console.debug("xAxisData", xAxisData)
  /* TODO - figure out how to render the data */
  return (
    <BarChart
      //   series={series}
      series={[
        { data: [35, 44, 24] },
        { data: [51, 6, 49] },
        { data: [15, 25, 30] },
      ]}
      //   layout='horizontal'
      xAxis={[{ data: xAxisData, scaleType: "band" }]}
      height={300}
    />
  )
}
