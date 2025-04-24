import { SessionSummary } from "@/lib/types"
import { Box, Stack, Typography, Grid2 } from "@mui/material"
import { RA } from "@/styles"
/**
 * UI for submission data showing users the data
 * @author VerySirias
 * @returns {JSX.Element}
 */

interface Props {
  sum?: SessionSummary | null
}

export default function ScoreDetails(props: Props) {
  const { sum } = props
  //null for testing
  return (
    <Box>
      <Stack>
        <Typography variant='h6' textAlign='left'>
          {" "}
          Score Details
        </Typography>{" "}
        <RA.Zoom triggerOnce>
          <Grid2 container spacing={2} size={{ xl: 3, lg: 3, md: 3, sm: 4 }}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Lowest Score: {sum?.low}
              </Typography>{" "}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Mean Score: {sum?.average}
              </Typography>{" "}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Highest Score: {sum?.high}
              </Typography>{" "}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Median Score: {sum?.median}
              </Typography>{" "}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Lowest Quartile: {sum?.lower_quartile}
              </Typography>{" "}
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant='subtitle2' textAlign='left'>
                {" "}
                Upper Quartile: {sum?.upper_quartile}
              </Typography>{" "}
            </Grid2>
          </Grid2>
        </RA.Zoom>
      </Stack>
      <Stack sx={{ m: 1 }} spacing={3}>
        {" "}
      </Stack>
    </Box>
  )
}
