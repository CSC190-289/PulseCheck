import PollSessionHistory from "@/components/poll/history/session/PollSessionHistory"
import PollSubmissionHistory from "@/components/poll/history/submission/PollSubmissionHistory"
import useRequireAuth from "@/lib/hooks/useRequireAuth"
import { Box, Tab, Tabs } from "@mui/material"
import React, { useState } from "react"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props
  return <React.Fragment>{value === index && children}</React.Fragment>
}

export default function PollHistory() {
  useRequireAuth({ blockGuests: true })
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          flex: 1,
        }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab sx={{ flex: 1 }} label='Sessions' />
          <Tab sx={{ flex: 1 }} label='Submissions' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PollSessionHistory />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PollSubmissionHistory />
      </TabPanel>
    </React.Fragment>
  )
}
