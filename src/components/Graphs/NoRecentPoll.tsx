import { Box, Card, CardContent, Typography } from "@mui/material"
import { useAuthContext } from "@/core/hooks"
import { useEffect } from "react"
import api from "@/core/api/firebase"
import { useState } from "react"
import Image from "mui-image"

export default function NoRecentPolls() {
  const { user } = useAuthContext()
  const [doc, setDoc] = useState<string>()

  useEffect(() => {
    if (!user || user.isAnonymous) {
      return
    }
    api.users
      .get(user.uid)
      .then((x) => {
        const name: string = x.display_name
        setDoc(name)
      })
      .catch((err) => console.debug(err))
  }, [user])

  if (!user) {
    return <></>
  }
  return (
    <Card variant='outlined' sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          align='center'
          sx={{ textAlign: "center", marginTop: 2 }}>
          Hello {doc}, Welcome to PulseCheck!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image src='/favicon.png' width={100} height={100} />
        </Box>
      </CardContent>
    </Card>
  )
}
