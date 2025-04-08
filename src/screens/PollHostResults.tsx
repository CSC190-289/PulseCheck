import { Container, Typography, Box, Stack, Divider } from "@mui/material"
import subChart from "@/components/poll/submission/Subchart"
import scoreDetails from "@/components/poll/submission/ScoreDetails"

/**
 * Allows Host to see the poll results.
 * @author ZairaGarcia17, VerySirias
 * @returns {JSX.Element}
 */

/**
 * Make components for the following:
 *-Toolbar
 *-Chart scores (we can reuse the one I made for participants)
 *-Score Details (we can reuse the one I made for participants)
 * -search up and participants card
 * These components are in compoents/poll/submission
 */

export default function PollHostResults() {
  return (
    <Container maxWidth='xs' sx={{ textAlign: "initial" }}>
      <Typography>Hello ZariraGarcia17</Typography>
      <Box mt={2}>
        <Stack> Chart here </Stack>
        <Stack> {scoreDetails()} </Stack>
        <Stack> participants card here </Stack>
      </Box>
    </Container>
  )
}
