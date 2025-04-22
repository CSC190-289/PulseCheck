import PollSessionHistory from "@/components/poll/history/PollSessionHistory"
import PollSubmissionHistory from "@/components/poll/history/PollSubmissionHistory"
import { Box, Tab, Tabs } from "@mui/material"
import React from "react"
import Dashboard from "./Dashboard"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function PollHistory() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab sx={{ flex: 1 }} label='Dashboard' {...a11yProps(0)} />
          <Tab sx={{ flex: 1 }} label='Sessions Hosted' {...a11yProps(1)} />
          <Tab sx={{ flex: 1 }} label='Submissions' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PollSessionHistory />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PollSubmissionHistory />
      </TabPanel>
    </React.Fragment>
  )
}
