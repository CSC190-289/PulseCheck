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
    const check = () => {
        console.debug(props.promptType)
        if (props.promptType === 'multi-select') {

          if (props.theChosenOnes.includes(props.text)){
            props.theChosenOnes = props.theChosenOnes.filter(x => x !== props.text)
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
        control={<Radio />}
        label={props.text}
        onClick= {check}
    />
  )
}
