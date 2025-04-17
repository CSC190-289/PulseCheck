import { SessionUser } from "@/core/types"
import { stoc } from "@/utils"
import { Avatar, Box, Card, Typography } from "@mui/material"
import { QueryDocumentSnapshot } from "firebase/firestore"

interface Props {
  ss: QueryDocumentSnapshot<SessionUser>
}

export default function UserSessionCard(props: Props) {
  const { ss } = props
  const user = ss.data()

  return (
    <Card>
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
