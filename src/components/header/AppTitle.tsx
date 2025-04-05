import { useAuthContext } from "@/core/hooks"
import { Box, Typography } from "@mui/material"
import Image from "mui-image"
import { Link } from "react-router-dom"

const SZ = 40

export default function AppTitle() {
  const { user } = useAuthContext()
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      component={Link}
      to={user && !user.isAnonymous ? "/dashboard" : "/"}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        color: "inherit",
        "&:hover": {
          color: "inherit",
        },
      }}>
      <Typography pt={0.5} variant='h6'>
        PulseCheck
      </Typography>
      <Image src='/favicon.png' width={SZ} height={SZ} />
    </Box>
  )
}
