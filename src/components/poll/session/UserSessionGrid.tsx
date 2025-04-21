import { RA } from "@/styles"
import { Grid2 } from "@mui/material"
import React from "react"
import UserSessionCard from "./UserSessionCard"
import { DocumentData, QuerySnapshot } from "firebase/firestore"
import {
  SessionQuestionResults,
  SessionResponse,
  SessionUser,
} from "@/core/types"

interface UserSessionListProps {
  users?: QuerySnapshot<SessionUser, DocumentData>
  results?: SessionQuestionResults | null
}

/**
 * @brief Displays Grid of Users in Session
 */
export default function UserSessionGrid(props: UserSessionListProps) {
  const { users, results } = props

  if (!users) {
    return <></>
  }

  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        {users.docs.map((x) => (
          <Grid2 key={x.id} size={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 12 }}>
            <RA.Zoom triggerOnce>
              <UserSessionCard u_ss={x} res={results?.responses[x.id]} />
            </RA.Zoom>
          </Grid2>
        ))}
      </Grid2>
    </React.Fragment>
  )
}
