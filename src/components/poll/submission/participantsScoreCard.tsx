import { Avatar, Typography, Box, Card } from "@mui/material"
import { Submission } from "@/core/types"
import { stoc } from "@/utils"

interface Props {
  sub: Submission
}

export default function ParticipantsScoreCard(props: Props) {
  const { sub } = props

  return (
    <Card
    // sx={{
    //   border: "1px solid",
    //   borderColor: "error.main",
    // }}
    >
      <Box m={1}>
        <Box m={1} display={"block"} alignItems={"center"}>
          {sub.photo_url ? (
            <Avatar src={sub.photo_url} />
          ) : (
            <Avatar color={stoc(sub.display_name)} />
          )}
          <Typography ml={1}>
            {sub.display_name} | Score: {sub.total_score}
          </Typography>
        </Box>
        <Typography variant='subtitle2' ml={1} align='left'>
          Email: Somebody@gmail.com{sub.email}
        </Typography>
      </Box>
    </Card>
  )
}
