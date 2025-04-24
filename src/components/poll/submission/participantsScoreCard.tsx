import { Avatar, Typography, Box, Card, CardActionArea } from "@mui/material"
import { Submission } from "@/lib/types"
import { stoc } from "@/utils"
import { RA } from "@/styles"
import { useNavigate } from "react-router-dom"
import { DocumentReference } from "firebase/firestore"

interface Props {
  sub: Submission
  ref: DocumentReference<Submission>
}

export default function ParticipantsScoreCard(props: Props) {
  const { sub, ref } = props
  const navigate = useNavigate()

  const onClick = () => {
    void navigate(`/poll/submission/${ref.id}/results`)
  }
  return (
    <RA.Fade triggerOnce>
      <Card
      // sx={{
      //   border: "1px solid",
      //   borderColor: "error.main",
      // }}
      >
        <CardActionArea onClick={onClick}>
          <Box m={1}>
            <Box m={1} display={"flex"} alignItems={"center"}>
              {sub.photo_url ? (
                <Avatar src={sub.photo_url} />
              ) : (
                <Avatar color={stoc(sub.display_name)} />
              )}
              <Typography flex={1} ml={1}>
                {sub.display_name}
              </Typography>
              <Typography>Score: {sub.score}</Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </RA.Fade>
  )
}
