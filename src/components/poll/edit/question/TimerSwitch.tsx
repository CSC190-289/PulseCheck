import api from "@/core/api"
import { mmsston, ntommss, stommss } from "@/utils"
import { FormControlLabel, Switch, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

interface Props {
  pid: string
  qid: string
  time: number | null
}

const SAVE_DELAY = 1000
const DEFAULT_DURATION = 10000

export default function TimerSwitch(props: Props) {
  const { pid, qid } = props
  const [time, setTime] = useState(props.time)
  const [mmss, setMMSS] = useState(ntommss(props.time))
  const [timed, setTimed] = useState(props.time ? true : false)

  useEffect(() => {
    if (!timed) {
      setTime(null)
    } else {
      setMMSS(ntommss(DEFAULT_DURATION))
    }
  }, [timed])

  useEffect(() => {
    setTime(mmsston(mmss))
  }, [mmss])

  useEffect(() => {
    const updateTime = async (newTime: number | null) => {
      try {
        if (newTime !== null && newTime <= 0) {
          return
        }
        if (newTime === props.time) {
          return
        }
        const ref = api.polls.questions.doc(pid, qid)
        await api.polls.questions.update(ref, { time: newTime })
      } catch (err: unknown) {
        console.error(err)
      }
    }
    const timer = setTimeout(() => {
      void updateTime(time)
    }, SAVE_DELAY)
    return () => {
      clearTimeout(timer)
    }
  }, [time, pid, qid])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedTime = stommss(e.target.value)
    setMMSS(formattedTime)
  }

  return (
    <React.Fragment>
      <FormControlLabel
        labelPlacement='end'
        label='Timed'
        checked={timed}
        onChange={() => setTimed(!timed)}
        control={<Switch />}
      />
      {timed && (
        <TextField
          error={time === 0}
          size='small'
          placeholder='MM:SS'
          value={mmss}
          onChange={handleChange}
          helperText={time === 0 ? "invalid format" : ""}
        />
      )}
    </React.Fragment>
  )
}
