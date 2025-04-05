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

export default function PrivacyPolicy(props: { ref?: React.Ref<unknown> }) {
  return (
    <Container maxWidth='sm'>
      <Box textAlign={"center"} ref={props.ref}>
        <RA.Bounce triggerOnce>
          <Typography variant='h5' fontWeight={700} mt={2} mb={2}>
            PulseCheck Privacy Policy
          </Typography>
        </RA.Bounce>

        <RA.Bounce triggerOnce>
          <Typography fontWeight={700} mb={2}>
            At PulseCheck, we respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and safeguard your data.
          </Typography>
        </RA.Bounce>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700} mt={2}>
                  Information We Collect:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  We collect personal information such as names, email
                  addresses, and quiz results.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  How We Use Your Information:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  Your data is used to provide personalized results, track quiz
                  participation, and improve the app’s functionality.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  How We Protect Your Data:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  We use industry-standard encryption to protect your data from
                  unauthorized access.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Your Rights:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  You have the right to request access to, or deletion of, your
                  personal information at any time.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <RA.Bounce triggerOnce>
                <Typography display={"inline"} fontWeight={700}>
                  Data Sharing:{" "}
                </Typography>
                <Typography display={"inline"} mb={2}>
                  We "do not" share your data with third parties unless required
                  by law.
                </Typography>
              </RA.Bounce>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
