import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import AppProviders from "./lib/providers/AppProviders"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
