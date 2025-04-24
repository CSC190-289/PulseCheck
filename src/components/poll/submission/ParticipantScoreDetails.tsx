import { SessionSummary } from "@/lib/types"
import { Box, Stack, Typography } from "@mui/material"

/**
 * UI for submission data showing users the data
 * @author VerySirias
 * @returns {JSX.Element}
 */

interface Props {
  sum?: SessionSummary | null
}

export default function ParticipantScoreDetails(props: Props) {
  const { sum } = props
  //null for testing
  return (
    <Box>
      <Stack>
        <Typography variant='h6' textAlign='left'>
          {" "}
          Score Details???
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Lowest Score: {sum?.low} | Mean Score: {sum?.average}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Highest Score: {sum?.high} | Median Score: {sum?.median}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Lowest Quartile: {sum?.lower_quartile} | Upper Quartile:{" "}
          {sum?.upper_quartile}
        </Typography>{" "}
      </Stack>
      <Stack sx={{ m: 1 }} spacing={3}>
        {" "}
      </Stack>
    </Box>
  )
}
