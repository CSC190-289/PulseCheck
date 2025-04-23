import { Question } from "@/lib/types"
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material"
import { DocumentReference, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

interface Props {
  qref: DocumentReference<Question>
}

/**
 * UI for answer card showing users what was the right answer
 * @author VerySirias
 * @returns {JSX.Element}
 */

/*TODO 
If IMG SHOW ELSE SHOW NOTHING
*/

const img = "REPLACE WITH IMGGGG"
const title = "Getting Stated?"
const userAnswer = "Yes"
const correctAnswer = "Yes"

export default function SubAnswerCard(props: Props) {
  // null for testing
  //const { submission } = props

  const [questionData, setQuestionData] = useState<Question | null>(null)

  const getQuestionData = async () => {
    const questionSnapshot = await getDoc(props.qref)
    if (questionSnapshot.exists()) {
      setQuestionData(questionSnapshot.data())
    }
  }

  useEffect(() => {
    void getQuestionData()
  })

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
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          image={questionData?.prompt_img || ""}></CardMedia>
        <CardContent>
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
