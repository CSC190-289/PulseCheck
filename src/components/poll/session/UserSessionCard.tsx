import { SessionUser } from "@/core/types"
import { stoc } from "@/utils"
import { Avatar, Box, Card, Typography } from "@mui/material"

interface Props {
  user: SessionUser
}

export default function UserSessionCard(props: Props) {
  const { user } = props

  return (
    <Card
    // sx={{
    //   border: "1px solid",
    //   borderColor: "error.main",
    // }}
    >
      <Box m={1} display={"flex"} alignItems={"center"}>
        {user.photo_url ? (
          <Avatar src={user.photo_url} />
        ) : (
          <Avatar color={stoc(user.display_name)} />
        )}
        <Typography ml={1}>{user.display_name}</Typography>
      </Box>
    </Card>
  )
}
