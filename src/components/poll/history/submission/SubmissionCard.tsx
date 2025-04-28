import { Submission } from "@/lib/types"
import { stoc, stoni, tstos } from "@/utils"
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

interface SubmissionCardProps {
  sid: string
  submission: Submission
}

export default function SubmissionCard(props: SubmissionCardProps) {
  const { sid, submission: x } = props
  const navigate = useNavigate()

  const onClick = () => {
    void navigate(`/poll/submission/${sid}/results`)
  }

  return (
    <React.Fragment>
      <Card sx={{ textAlign: "initial" }}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Box display={"flex"} alignItems={"center"} mb={1}>
              <Avatar
                sx={{
                  mr: 1,
                  width: 24,
                  height: 24,
                  bgcolor: stoc(x.display_name),
                  fontSize: 14,
                }}
                src={x.photo_url ?? ""}>
                {stoni(x.display_name)}
              </Avatar>
              <Typography flex={1}>{x.title}</Typography>
              <Chip
                size='small'
                // sx={{ backgroundColor: ntogc(x.score_100) }}
                label={`${x.score_100.toFixed()}/100`}
              />
            </Box>
            <Typography
              textAlign={"right"}
              color='textSecondary'
              variant='body2'>
              {x.display_name}
            </Typography>
            <Typography
              textAlign={"right"}
              variant='body2'
              color='textSecondary'>
              Submitted {tstos(x.submitted_at)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </React.Fragment>
  )
}
