import { stoni } from "@/utils"
import { Avatar } from "@mui/material"
import React from "react"

interface UserAvatarProps {
  uid: string
  displayName: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const { displayName } = props

  /* TODO - fetch user's profile picture from /users collection */

  return (
    <React.Fragment>
      <Avatar>{stoni(displayName)}</Avatar>
    </React.Fragment>
  )
}
