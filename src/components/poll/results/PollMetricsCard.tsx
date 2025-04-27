import { SessionSummary } from "@/lib/types"
import { Typography, Grid2, Card, CardContent, Divider } from "@mui/material"

interface Props {
  sum?: SessionSummary | null
}

/**
 * UI for submission data showing users the data
 * @author VerySirias
 * @returns {JSX.Element}
 */
export default function PollMetricsCard(props: Props) {
  const { sum } = props
  //null for testing
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography fontWeight={"bold"}>Score Details</Typography>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>Lowest Score: {sum?.low_100?.toFixed()}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>Highest Score: {sum?.high_100?.toFixed()}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>Mean Score: {sum?.average_100?.toFixed()}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>Median Score: {sum?.median_100?.toFixed()}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>
              Lowest Quartile: {sum?.lower_quartile_100?.toFixed()}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography>
              Upper Quartile: {sum?.upper_quartile_100?.toFixed()}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}
