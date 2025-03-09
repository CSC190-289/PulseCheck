import { Card, CardContent, Typography } from "@mui/material"
import { RA } from "@/styles"

interface RecentPollCardProps {
  // Declares types for poll cards
  pollTitle: string
  result: string
}

export default function RecentPollCard({
  pollTitle,
  result,
}: RecentPollCardProps) {
  return (
    <RA.Bounce triggerOnce>
      <Card raised>
        <CardContent>
          <Typography mt={1} variant='h5' gutterBottom>
            {pollTitle}
          </Typography>
          <Typography>{result}</Typography>
        </CardContent>
      </Card>
    </RA.Bounce>
  )
}
