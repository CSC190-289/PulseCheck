import { PromptType } from "@/core/types"
import { FormControlLabel, Radio } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

interface OptionProps {
  text: string
  promptType: PromptType
  theChosenOnes: string[]
  setTheChosenOnes: Dispatch<SetStateAction<string[]>>
}

// const handleChange  = () => void

export default function Option(props: OptionProps) {
  const { text, theChosenOnes, setTheChosenOnes } = props
  console.debug(theChosenOnes)
  const check = () => {
    console.debug(props.promptType)
    switch (props.promptType) {
      case "multiple-choice": {
        setTheChosenOnes([text])
        break
      }
      case "multi-select": {
        if (theChosenOnes.includes(text)) {
          const idx = theChosenOnes.findIndex((x) => x === text)
          if (idx >= 0) {
            const newChosenOnes = [
              ...theChosenOnes.slice(0, idx),
              ...theChosenOnes.slice(idx + 1),
            ]
            setTheChosenOnes(newChosenOnes)
          }
        }
        break
      }
      case "ranking-poll": {
        setTheChosenOnes([text])
        break
      }
      default: {
        console.debug("what the sigma")
      }
    }
    if (props.promptType === "multi-select") {
      if (props.theChosenOnes.includes(props.text)) {
        props.theChosenOnes = props.theChosenOnes.filter(
          (x) => x !== props.text
        )
        props.setTheChosenOnes(props.theChosenOnes)
      } else {
        props.theChosenOnes.push(props.text)
        props.setTheChosenOnes(props.theChosenOnes)
      }
    }
  }
  return (
    // <FormControlLabel
    //   value={props.text}
    //   control={<Radio />}
    //   label={props.text}
    //   //onChange={handleChange}
    //   />
    // <FormControlLabel/>

    <FormControlLabel
      value={props.text}
      control={<Radio checked={theChosenOnes.includes(text)} />}
      label={props.text}
      onClick={check}
    />
  )
}
