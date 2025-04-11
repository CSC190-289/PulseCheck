import { RA } from "@/styles"
import { Grid2 } from "@mui/material"
import React from "react"
import UserSessionCard from "./UserSessionCard"
import { DocumentData, QuerySnapshot } from "firebase/firestore"
import { SessionUser } from "@/core/types"

interface UserSessionListProps {
  users?: QuerySnapshot<SessionUser, DocumentData>
}

/**
 * @brief Displays
 */
export default function UserSessionGrid(props: UserSessionListProps) {
  const { users } = props

  if (!users) {
    return <></>
  }

  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        {users.docs.map((x) => (
          <Grid2 key={x.id} size={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 12 }}>
            <RA.Zoom triggerOnce>
              <UserSessionCard user={x.data()} />
            </RA.Zoom>
          </Grid2>
        ))}
      </Grid2>
    </React.Fragment>
  )
}
