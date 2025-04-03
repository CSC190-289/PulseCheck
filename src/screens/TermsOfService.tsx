import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Stack,
} from "@mui/material"
import React from "react"
import { RA } from "@/styles"

export default function TermsOfService(props: { ref?: React.Ref<unknown> }) {
  return (
    <Container maxWidth='sm'>
      <Box textAlign={"center"} ref={props.ref}>
        <RA.Bounce triggerOnce>
          <Typography variant='h5' fontWeight={700} mt={2} mb={2}>
            PulseCheck Terms of Service
          </Typography>
        </RA.Bounce>

        <RA.Bounce triggerOnce>
          <Typography fontWeight={700} mb={2}>
            By using PulseCheck, you agree to the following terms:
          </Typography>
        </RA.Bounce>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700} mt={2}>
                  Eligibility:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  You must be at least 13 years old to use PulseCheck.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  User Responsibilities:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  You agree to use PulseCheck for academic purposes only and
                  refrain from cheating or disrupting the platform.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Account Security:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  You are responsible for maintaining the confidentiality of
                  your account information. <br></br>
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Intellectual Property:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  All content within PulseCheck is owned by the company or
                  licensed to us, and users may not reproduce or distribute it
                  without permission. <br></br>
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Termination:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  We reserve the right to suspend or terminate accounts that
                  violate these terms. <br></br>
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Liability:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  PulseCheck is not responsible for any errors in quiz results
                  or issues caused by third-party services. <br></br>
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
