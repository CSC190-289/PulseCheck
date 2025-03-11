import {RA} from "@/styles"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser} from "@/core/api"
import { auth } from "@/core/api/firebase"
import useSnackbar from "@/core/hooks/useSnackbar"
import React from "react"

// export default function RegisterJoin(){
//     const navigate = useNavigate()
//     const [name, setProfileName] = useState<string>("")
//     const snackbar = useSnackbar()
//     const handleRegClick = () =>
//     }
// //export default function RegisterJoin()
    // const navigate = useNavigate()
    // const [displayName]
    
export default function RegisterJoin(props: { ref?: React.Ref<unknown>}) {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      confirmPassword: ""
  
    });
    const snackbar = useSnackbar(); 

return(
<Box textAlign={'center'} ref={props.ref}>
<Container
    maxWidth ='xs'
>
    <Typography
        variant='h5'
        textAlign ='center'
        marginTop={5}
        marginBottom={5}>
        Register
    </Typography>

    <Stack
        component={'form'}
        sx={{m: 1}}
        spacing={3}
        noValidate
        autoComplete='off'>

    <TextField
        id='register-name'
        label='username'
        variant='outlined'
        fullWidth
        // onChange={(e)}
/>
<TextField
    id='register-password'
    label='Password'
    fullWidth
    // onChange={(e)} => setRegisterPassword(e.target.value)}
/>
</Stack>
</Container>
</Box>
)
}

