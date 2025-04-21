import { CurrentQuestion } from "@/core/types"
import { Typography } from "@mui/material"
import Image from "mui-image"
import React from "react"

interface QuestionBoxProps {
  question: CurrentQuestion
}

export default function QuestionBox(props: QuestionBoxProps) {
  const { question } = props
  return (
    <React.Fragment>
      {question.prompt.split(/\n/).map((x, i) => (
        <Typography textAlign={"initial"} key={i}>
          {x}
        </Typography>
      ))}
      {question.prompt_img && (
        <Image
          src={question.prompt_img}
          style={{ width: 700, height: 300, objectFit: "contain" }}
        />
      )}
    </React.Fragment>
  )
}
