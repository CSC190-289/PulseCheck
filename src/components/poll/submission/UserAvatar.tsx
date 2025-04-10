import { stoni } from "@/utils"
import { Avatar } from "@mui/material"
import React from "react"

interface UserAvatarProps {
  uid: string
  displayName: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const { uid, displayName } = props

  /* TODO - fetch user's profile picture from /users collection */
  console.debug(`uid:`, uid)

  return (
    <React.Fragment>
      <Avatar>{stoni(displayName)}</Avatar>
    </React.Fragment>
  )
}
