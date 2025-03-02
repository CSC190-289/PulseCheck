import { Box, Button, Container, Typography } from "@mui/material"
import santa from "@/assets/not-found.png"
import { useNavigate } from "react-router-dom"
import { RA } from "@/styles"

export default function NotFound() {
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate(-1)
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <RA.JackInTheBox triggerOnce>
          <img src={santa} alt='404 Not Found' style={{ width: 300 }} />
        </RA.JackInTheBox>
        <Typography variant='h5' gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography color='text.secondary' gutterBottom>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <RA.Fade triggerOnce>
          <Button variant='contained' color='primary' onClick={handleClick}>
            Go Back
          </Button>
        </RA.Fade>
      </Box>
    </Container>
  )
}
