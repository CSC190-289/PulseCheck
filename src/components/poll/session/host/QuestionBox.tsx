import { CurrentQuestion } from "@/lib/types"
import { Box, Card, CardContent, Typography } from "@mui/material"
import Image from "mui-image"
import React from "react"

interface QuestionBoxProps {
  question: CurrentQuestion
}

export default function QuestionBox(props: QuestionBoxProps) {
  const { question } = props
  return (
    <React.Fragment>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography gutterBottom variant='body2' color='textSecondary'>
            Question
          </Typography>
          {question.prompt.split(/\n/).map((x, i) => (
            <Typography textAlign={"initial"} key={i}>
              {x}
            </Typography>
          ))}
        </CardContent>
      </Card>
      <Box display={"flex"} justifyContent={"center"}>
        {question.prompt_img && <Image width={720} src={question.prompt_img} />}
      </Box>
    </React.Fragment>
  )
}
