import api, { storage } from "@/lib/api/firebase"
import { Upload } from "@mui/icons-material"
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  styled,
} from "@mui/material"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import React, { useState } from "react"

interface UploadPDFBoxProps {
  pid: string
  open: boolean
  onClose: () => void
}

export default function UploadPDFDialog(props: UploadPDFBoxProps) {
  const { open, onClose } = props
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!(files && files.length > 0)) return
    const selectedFile = files[0]
    const byteSize = selectedFile.size
    const fileSize = byteSize / (1024 * 1024)
    if (fileSize >= 100) {
      setError("File size cannot exceed 100 MB!")
      return
    }
    /* upload file to GCS */
    async function extractText(payload: File) {
      try {
        setProcessing(true)
        const downloadURL = await uploadFile(payload)
        await api.vertex.generatePollQuestions(downloadURL)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setProcessing(false)
      }
    }
    void extractText
  }

  const uploadFile = async (payload: File): Promise<string> => {
    const fileRef = ref(storage, `ai/${payload.name}`)
    const ss = await uploadBytes(fileRef, payload)
    const downloadURL = await getDownloadURL(ss.ref)
    return downloadURL
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Upload PDF File to Generate Questions</DialogTitle>
        <DialogContent>
          {error && (
            <Box mb={1}>
              <Alert severity='error' onClose={() => setError("")}>
                {error}
              </Alert>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 100,
              minHeight: 100,
            }}>
            {processing ? (
              <CircularProgress />
            ) : (
              <Fab component='label' color='primary' size='large'>
                <Upload />
                <VisuallyHiddenInput
                  type='file'
                  accept='application/pdf'
                  onChange={handleFile}
                />
              </Fab>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
