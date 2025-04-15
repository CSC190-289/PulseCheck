import { Box, Stack, Typography } from "@mui/material"

/**
 * UI for submission data showing users the data
 * @author VerySirias
 * @returns {JSX.Element}
 */

const lowestScore = 1
const meanScore = 5
const highestScore = 10
const medianScore = 6
const lowestquartile = 4
const upperquartile = 8

export default function scoreDetails() {
  //null for testing
  return (
    <Box>
      <Stack>
        <Typography variant='h6' textAlign='left'>
          {" "}
          Score Details
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Lowest Score: {lowestScore} | Mean Score: {meanScore}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Highest Score: {highestScore} | Median Score: {medianScore}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
        </Typography>{" "}
        <Typography variant='subtitle2' textAlign='left'>
          {" "}
          Lowest Quartile: {lowestquartile} | Upper Quartile: {upperquartile}
        </Typography>{" "}
      </Stack>
      <Stack sx={{ m: 1 }} spacing={3}>
        {" "}
      </Stack>
    </Box>
  )
}
