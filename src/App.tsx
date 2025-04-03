import React from "react"
import "./styles/App.css"
import { Route, Routes } from "react-router-dom"
import { Page } from "./pages"
import AppBar from "./components/header/AppBar"

export default function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Routes>
        <Route path='/' element={<Page.Splash />} />
        <Route path='/debug' element={<Page.Debug />} />
        <Route path='/login' element={<Page.Login />} />
        <Route path='/register' element={<Page.Register />} />
        <Route path='/get-started' element={<Page.GetStarted />} />
        <Route path='/privacy-policy' element={<Page.PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<Page.TermsOfService />} />
        <Route path='/dashboard' element={<Page.Dashboard />} />
        {/* poll session routes */}
        <Route path='/poll/join' element={<Page.PollJoin />} />
        <Route path='/poll/session/:id/host' element={<Page.PollHost />} />
        <Route path='/poll/session/:id' element={<Page.PollSession />} />
        <Route
          path='/poll/session/:id/participate'
          element={<Page.PollParticipate />}
        />
        {/* poll routes */}
        <Route path='/poll/:id/edit' element={<Page.PollEditor />} />
        <Route path='/poll/results' element={<Page.PollResults />} />
        <Route path='/poll/:id/overview' element={<Page.PollView />} />
        <Route path='/profile' element={<Page.Profile />} />
        <Route path='*' element={<Page.NotFound />} />
      </Routes>
    </React.Fragment>
  )
}
