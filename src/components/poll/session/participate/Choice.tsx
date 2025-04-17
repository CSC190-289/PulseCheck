import { PromptType } from "@/core/types"
import {
  Card,
  CardActionArea,
  // CardActions,
  // CardContent,
  FormControlLabel,
  Radio,
} from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { DocumentReference, refEqual } from "firebase/firestore"
import { SessionOption } from "@/core/types"

//chosenones changes to specify what type it is
//string of objects in array
interface ChoiceProps {
  text: string
  //added in ref to specify what type it is
  ref: DocumentReference<SessionOption>
  promptType: PromptType
  theChosenOnes: DocumentReference<SessionOption>[]
  setTheChosenOnes: Dispatch<SetStateAction<DocumentReference<SessionOption>[]>>
}

// const handleChange  = () => void

export default function Option(props: ChoiceProps) {
  const { text, ref, promptType, theChosenOnes, setTheChosenOnes } = props
  console.debug(theChosenOnes)
  const check = () => {
    console.debug(props.promptType)

    //option object creation
    // const option = { ref, text }

    switch (promptType) {
      case "multiple-choice": {
        setTheChosenOnes([ref])
        break
      }
      case "multi-select": {
        if (theChosenOnes.find((x) => refEqual(x, ref))) {
          const newChosenOnes = theChosenOnes.filter((x) => !refEqual(x, ref))
          setTheChosenOnes(newChosenOnes)
        } else {
          setTheChosenOnes([...theChosenOnes, ref])
        }
        // if (theChosenOnes.includes(text)) {
        // const idx = theChosenOnes.findIndex((x) => x.ref.id === ref.id)
        // if (idx >= 0) {
        //   const newChosenOnes = [
        //     ...theChosenOnes.slice(0, idx),
        //     ...theChosenOnes.slice(idx + 1),
        //   ]
        //   setTheChosenOnes(newChosenOnes)
        // }
        // }
        break
      }
      case "ranking-poll": {
        setTheChosenOnes([ref])
        break
      }
      default: {
        throw new Error("what the figma")
      }
    }
    // if (props.promptType === "multi-select") {
    //   if (props.theChosenOnes.indexOf((x) => x.ref.id === props.ref.id) >= 0) {
    //     // if (props.theChosenOnes.includes(props.text)) {
    //     props.theChosenOnes = props.theChosenOnes.filter(
    //       // (x) => x !== props.text
    //       (x) => x !== props.ref.id
    //     )
    //     props.setTheChosenOnes(props.theChosenOnes)
    //   } else {
    //     props.theChosenOnes.push(option)
    //     props.setTheChosenOnes(props.theChosenOnes)
    //   }
    // }
  }
  return (
    // <FormControlLabel
    //   value={props.text}
    //   control={<Radio />}
    //   label={props.text}
    //   //onChange={handleChange}
    //   />
    // <FormControlLabel/>
    <Card>
      <CardActionArea onClick={check}>
        <FormControlLabel
          value={props.text}
          sx={{ m: 1 }}
          control={
            <Radio
              checked={Boolean(theChosenOnes.find((x) => refEqual(x, ref)))}
            />
          }
          label={text}
          onClick={check}
        />
      </CardActionArea>
    </Card>
  )
}
