import { PromptType } from "@/core/types"
import { FormControlLabel, Radio } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { DocumentReference } from "firebase/firestore"
import { SessionOption } from "@/core/types"


//chosenones changes to specify what type it is 
//string of objects in array
interface OptionProps {
  text: string
//added in ref to specify what type it is
  ref: DocumentReference<SessionOption> 
  promptType: PromptType
  theChosenOnes: {ref:DocumentReference<SessionOption>, text:string} []
  setTheChosenOnes: Dispatch<SetStateAction<{ref:DocumentReference<SessionOption>, text:string} []>>
}

// const handleChange  = () => void

export default function Option(props: OptionProps) {
  const { text, ref, promptType, theChosenOnes, setTheChosenOnes } = props
  console.debug(theChosenOnes)
  const check = () => {
    console.debug(props.promptType)

    //option object creation
    const option = {ref,text}

    switch (props.promptType) {
      case "multiple-choice": {
        setTheChosenOnes([option])
        break
      }
      case "multi-select": {
        // if (theChosenOnes.includes(text)) {
          const idx = theChosenOnes.findIndex((x) => x.ref.id === ref.id)
          if (idx >= 0) {
            const newChosenOnes = [
              ...theChosenOnes.slice(0, idx),
              ...theChosenOnes.slice(idx + 1),
            ]
            setTheChosenOnes(newChosenOnes)
          }
        // }
        break
      }
      case "ranking-poll": {
        setTheChosenOnes([option])
        break
      }
      default: {
        console.debug("what the sigma")
      }
    }
    if (props.promptType === "multi-select") {
      if (props.theChosenOnes.indexOf((x) => x.ref.id === props.ref.id) >= 0){
      // if (props.theChosenOnes.includes(props.text)) {
        props.theChosenOnes = props.theChosenOnes.filter(
          // (x) => x !== props.text
          (x) => x !== props.ref.id
        )
        props.setTheChosenOnes(props.theChosenOnes)
      } else {
        props.theChosenOnes.push(option)
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
