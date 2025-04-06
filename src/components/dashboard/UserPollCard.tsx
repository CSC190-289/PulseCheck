import { Poll } from "@/core/types"
import { ntoq, tstos } from "@/utils"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface UserPolLCardProps {
  pid: string
  poll: Poll
}

/**
 * Displays users created polls
 */
export default function UserPollCard(props: UserPolLCardProps) {
  const { pid, poll } = props
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate(`/poll/${pid}/edit`)
  }

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {poll.title}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {ntoq(poll.questions.length)}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {tstos(poll.updated_at)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
