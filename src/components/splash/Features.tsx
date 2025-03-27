import { RA } from "@/styles"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import React from "react"

function Features(props: { ref?: React.Ref<unknown> }) {
  return (
    <Box textAlign={"center"} ref={props.ref}>
      <RA.Bounce triggerOnce>
        <Typography variant='h5' fontWeight={700} mb={2}>
          Features
        </Typography>
      </RA.Bounce>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>Real-Time Questioning:</Typography>
              <Typography>
                Hosts are able to create and display multiple-choice <br></br>{" "}
                question quizes and polls for participating users to respond to
                simultaniously and in real-time.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>Automatic Scoring:</Typography>
              <Typography>
                PulseCheck automatically calculates a participant's quiz scores
                in <br></br>
                real-time giving them feedback on their performance following
                each question with a complete overview on their preformance{" "}
                <br></br>
                after the session concludes.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>Host Dashboard:</Typography>
              <Typography>
                During polling Hosts have access to a dashboard which allows
                them to monitor a participant's data in real time. Allowing for
                Hosts to give feedback based on participant results and obtain{" "}
                <br></br>
                insight on participants understanding of the material.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>Web Access & UI:</Typography>
              <Typography>
                PulseCheck is a web application that works on Desktop, Tablets,
                and Mobile Devices that support modern web browsers. Built using
                Firebase, React, and Material UI in order to ensure both a fast
                and optimal user experience.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>Attendance Tracking:</Typography>
              <Typography>
                User participation can serve as a check for who is in
                attendance. Non-participating users are flagged for review and
                can be removed from a poll at the Hosts discretion.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RA.Bounce triggerOnce>
              <Typography fontWeight={700}>
                Question Banking & Randomization:
              </Typography>
              <Typography>
                Hosts can create question banks to be able to reuse <br></br>
                questions on future sessions. The order of questions can also be{" "}
                <br></br>
                randomized to prevent the sharing of answers between
                participants should the host choose.
              </Typography>
            </RA.Bounce>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default Features
