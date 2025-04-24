import { SessionQuestion } from "@/lib/types"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import { DocumentReference, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
interface Props {
  qref: DocumentReference<SessionQuestion>
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
// const userAnswer = "Yes"
// const correctAnswer = "Yes"

export default function SubAnswerCard(props: Props) {
  // null for testing
  const { question, option } = props

  // Stores question data
  const [questionData, setQuestionData] = useState<SessionQuestion | null>(null)

  // Gets question data from question ref prop
  const getQuestionData = async () => {
    const questionSnapshot = await getDoc(props.qref)
    if (questionSnapshot.exists()) {
      setQuestionData(questionSnapshot.data())
    }
  }

  useEffect(() => {
    console.debug(questionData)
  }, [questionData])

  // Updates questionData on mount
  useEffect(() => {
    void getQuestionData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userAnswer = "a"
  const correctAnswer = "b"

  const handleCorrect = () => {
    if (userAnswer === correctAnswer) {
      return "Correct Answer!"
    }
    return `Correct Answer: ${correctAnswer}`
  }
  const handlebgColor = () => {
    if (userAnswer === correctAnswer) {
      return ""
    }
    return "pink"
  }

  return (
    <Card sx={{ bgcolor: handlebgColor() }}>
      {/* <CardActionArea> */}
      {questionData?.prompt_img && (
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          // Sets image url
          image={questionData?.prompt_img ?? ""}></CardMedia>
      )}
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
      {/* </CardActionArea> */}
    </Card>
  )
}
