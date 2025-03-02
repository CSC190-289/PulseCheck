import React from "react"
import "./styles/App.css"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import { Page } from "./pages"

export default function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path='/' element={<Page.Splash />} />
        <Route path='/debug' element={<Page.Debug />} />
        <Route path='/login' element={<Page.Login />} />
        <Route path='/register' element={<Page.Register />} />
        <Route path='/get-started' element={<Page.GetStarted />} />
        <Route path='/privacy-policy' element={<Page.PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<Page.TermsOfService />} />
        <Route path='/dashboard' element={<Page.Dashboard />} />
        <Route path='/poll/join' element={<Page.PollJoin />} />
        <Route path='/poll/:id/lobby' element={<Page.PollLobby />} />
        <Route path='/poll/:id/edit' element={<Page.PollEditor />} />
        <Route path='/poll/:id/results' element={<Page.PollResults />} />
        <Route path='/poll/:id/' element={<Page.PollView />} />
        <Route path='/profile' element={<Page.Profile />} />
        <Route path='*' element={<Page.NotFound />} />
      </Routes>
    </React.Fragment>
  )
}
