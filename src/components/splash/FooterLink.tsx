import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
  text: string
  path: string
}

export default function FooterLink({ text, path }: Props) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    void navigate(`/` + path)
    window.scrollTo(0, 0)
  }
  return (
    <Typography
      onClick={handleNavigate}
      color='primary'
      sx={{ cursor: "pointer" }}>
      {text}
    </Typography>
  )
}
