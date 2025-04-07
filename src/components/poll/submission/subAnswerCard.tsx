import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material"

// interface Props {
//   //submission: submissionProp
// }

/**
 * UI for answer card showing users what was the right answer
 * @author VerySirias
 * @returns {JSX.Element}
 */

/*TODO 
If IMG SHOW ELSE SHOW NOTHING
*/

const img = "REPLACE WITH IMG"
const title = "Getting Stated?"
const userAnswer = "Yes"
const correctAnswer = "Yes"

export default function subAnswerCard() {
  // null for testing
  //const { submission } = props
  const handleCorrect = () => {
    if (userAnswer === correctAnswer) {
      return "Correct Answer!"
    }
    return "Correct Answer: {correctAnswer}"
  }
  const handlebgColor = () => {
    if (userAnswer === correctAnswer) {
      return ""
    }
    return "pink"
  }

  return (
    <Card sx={{ bgcolor: handlebgColor }}>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              height: 150,
              width: 300,
              bgcolor: "Highlight",
            }}>
            <Typography variant='h5' textAlign='center'>
              {" "}
              {img}
            </Typography>
          </Box>
          <Typography variant='h6' gutterBottom>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            You chose {userAnswer}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {handleCorrect()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
