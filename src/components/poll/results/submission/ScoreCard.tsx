import {
  Avatar,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material"
import { Submission } from "@/lib/types"
import { stoc } from "@/utils"
import { RA } from "@/styles"
import { useNavigate } from "react-router-dom"
import { DocumentReference } from "firebase/firestore"

interface Props {
  sub: Submission
  ref: DocumentReference<Submission>
}

export default function ScoreCard(props: Props) {
  const { sub, ref } = props
  const navigate = useNavigate()

  const onClick = () => {
    void navigate(`/poll/submission/${ref.id}/results`)
  }
  return (
    <Card variant='outlined'>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box display={"flex"} alignItems={"center"}>
            {sub.photo_url ? (
              <Avatar src={sub.photo_url} />
            ) : (
              <Avatar color={stoc(sub.display_name)} />
            )}
            <Typography flex={1} ml={1}>
              {sub.display_name}
            </Typography>
            <Typography>Score: {sub.score_100.toFixed()}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
