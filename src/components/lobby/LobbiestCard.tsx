import { firestore } from "@/core/api/firebase"
import { User } from "@/core/types"
import { stoc } from "@/utils"
import { Avatar, Box, Card, Skeleton, Typography } from "@mui/material"
import { doc, DocumentReference } from "firebase/firestore"
import { useDocumentData } from "react-firebase-hooks/firestore"

interface Props {
  userId: string
}

export default function LobbiestCard(props: Props) {
  const { userId } = props
  const ref = doc(firestore, "users", userId) as DocumentReference<User>
  const [user, loading, error] = useDocumentData<User>(ref)

  return (
    <Card>
      <Box m={1} display={"flex"} alignItems={"center"}>
        <Avatar sx={{ mr: 1, bgcolor: stoc(user?.display_name ?? "") }} />
        <Typography>
          {loading ? (
            <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
          ) : error ? (
            `User(${userId})`
          ) : (
            user?.display_name
          )}
        </Typography>
      </Box>
    </Card>
  )
}
