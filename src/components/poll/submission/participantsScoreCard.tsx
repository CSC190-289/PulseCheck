import { Avatar, Typography, Box, Card } from "@mui/material"
import { Submission } from "@/core/types"

interface Props {
  user: Submission
}

export default function participantsScoreCard(props: Props) {
  const { user } = props

  return (
    <Card
    // sx={{
    //   border: "1px solid",
    //   borderColor: "error.main",
    // }}
    >
      <Box m={1} display={"flex"} alignItems={"center"}>
        {/* {user.photo_url ? (
          <Avatar src={user.photo_url} />
        ) : (
          <Avatar color={stoc(user.display_name)} />
        )} */}
        <Typography ml={1}>{user.display_name}</Typography>
        <Typography> {user.total_score} </Typography>
      </Box>
    </Card>
  )
}
