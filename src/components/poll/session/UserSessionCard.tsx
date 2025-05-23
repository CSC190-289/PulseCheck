import { SessionResponse, SessionUser } from "@/lib/types"
import { stoc, stoni } from "@/utils"
import { Check, Clear } from "@mui/icons-material"
import { Avatar, Box, Card, Chip, Typography } from "@mui/material"
import { QueryDocumentSnapshot } from "firebase/firestore"
import React from "react"

interface Props {
  u_ss: QueryDocumentSnapshot<SessionUser>
  res?: SessionResponse
  anonymous: boolean
}

export default function UserSessionCard(props: Props) {
  const { u_ss, res, anonymous } = props
  const user = u_ss.data()

  return (
    <React.Fragment>
      <Box display={{ xs: "flex", sm: "none" }}>
        <Chip
          color={
            res && !anonymous ? (res.correct ? "success" : "error") : "default"
          }
          avatar={
            user.photo_url ? (
              <Avatar src={user.photo_url} />
            ) : (
              <Avatar color={stoc(user.display_name)} />
            )
          }
          label={user.display_name}
        />
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <Card>
          <Box m={1} display={"flex"} alignItems={"center"}>
            {user.photo_url ? (
              <Avatar src={user.photo_url} color={stoc(user.display_name)}>
                {stoni(user.display_name)}
              </Avatar>
            ) : (
              <Avatar color={stoc(user.display_name)}>
                {stoni(user.display_name)}
              </Avatar>
            )}
            <Typography ml={1}>{user.display_name}</Typography>
            <Box flex={1} />
            {res && !anonymous && (
              <React.Fragment>
                {res.correct ? (
                  <Check fontSize={"large"} color='success' />
                ) : (
                  <Clear fontSize={"large"} color='error' />
                )}
              </React.Fragment>
            )}
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  )
}
