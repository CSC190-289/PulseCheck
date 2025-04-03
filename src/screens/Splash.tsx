import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import About from "../components/splash/About"
import FAQs from "../components/splash/FAQs"
import Features from "../components/splash/Features"
import { useRef, useEffect } from "react"
import { RA } from "@/styles"
import { ExpandCircleDown } from "@mui/icons-material"

interface LocationState {
  scrollTo?: string
}

export default function Splash() {
  const navigate = useNavigate()

  const handleClick = () => {
    void navigate("/get-started")
  }
  const location = useLocation()

  const aboutRef = useRef<HTMLDivElement>(null) // Stores reference to "About" section
  const faqRef = useRef<HTMLDivElement>(null) // Stores reference to "FAQs" section
  const featuredRef = useRef<HTMLDivElement>(null) // Stores reference to "Features" section

  useEffect(() => {
    const locstate = location.state as LocationState
    if (locstate?.scrollTo) {
      // When the location changes...
      const target = locstate.scrollTo
      let destination: HTMLDivElement | null = null

      if (target === "about") {
        // Sets destination based on the "scrollTo" state from the navbar
        destination = aboutRef.current
      } else if (target === "faqs") {
        destination = faqRef.current
      } else if (target === "features") {
        destination = featuredRef.current
      }

      if (destination) {
        destination.scrollIntoView({ behavior: "smooth" }) // Smooth scroll to the desination
      }
    }
  }, [location])

  return (
    <Container maxWidth='sm'>
      <Box mb={16}>
        <RA.Bounce triggerOnce>
          <Typography variant='h4' fontWeight={700} margin={4} gutterBottom>
            Turning Dead Time into Real-Time Learning!
          </Typography>
        </RA.Bounce>
        <RA.Bounce triggerOnce>
          <Button
            variant='contained'
            color='primary'
            sx={{ mb: 2 }}
            onClick={handleClick}>
            Get Started
          </Button>
        </RA.Bounce>
        <Stack spacing={4} mb={32}>
          <RA.Bounce triggerOnce>
            <Typography variant='body1' marginInline={4} gutterBottom>
              PulseCheck brings your classroom back to life by turning silent
              lectures into interactive learning experiences. With real-time
              polls and quizzes, students are no longer passive -- they're part
              of the conversation. Instructors get instant feedback, making
              every session more dynamic and alive.
            </Typography>
          </RA.Bounce>
          <About ref={aboutRef} />
          <Container>
            <ExpandCircleDown />
          </Container>
          <Features ref={featuredRef} />
          <Container>
            <ExpandCircleDown />
          </Container>
          <FAQs ref={faqRef} />
        </Stack>
      </Box>
    </Container>
  )
}
