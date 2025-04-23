import { useThemeContext } from "@/lib/hooks"
import { Session } from "@/lib/types"
import { ntops, stoc, tstos } from "@/utils"
import { BarChart, Poll } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

interface SessionCardProps {
  sid: string
  session: Session
}

export default function SessionCard(props: SessionCardProps) {
  const { sid, session: x } = props
  const navigate = useNavigate()
  const theme = useThemeContext()

  const onClick = () => {
    void navigate(`/poll/session/${sid}/results`)
  }

  return (
    <React.Fragment>
      <Card sx={{ textAlign: "initial" }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Box display={"flex"} alignItems={"center"} mb={1}>
              <Avatar
                sx={{ width: 24, height: 24, mr: 1, bgcolor: stoc(x.title) }}>
                <BarChart
                  fontSize='small'
                  color={theme.mode === "light" ? "inherit" : "action"}
                />
              </Avatar>
              {/* <Box flex={1}> */}
              <Typography flex={1}>{x.title}</Typography>
              {/* </Box> */}
            </Box>
            <Typography
              textAlign={"right"}
              variant='body2'
              color='textSecondary'>
              {ntops(x.summary?.total_participants)}
            </Typography>
            <Typography
              textAlign={"right"}
              variant='body2'
              color='textSecondary'>
              Hosted {tstos(x.created_at)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  )
}
