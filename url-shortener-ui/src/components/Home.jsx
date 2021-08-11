import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import styled from '@material-ui/styles/styled'
import axios from 'axios'
import { useState } from 'react'
import isURL from 'validator/lib/isURL'

const FormPaper = styled(Paper)({
  padding: 30
})

const FormTitle = styled(Typography)({
  marginBottom: 20
})

const FormDescription = styled(Typography)({
  marginBottom: 25
})

const URLForm = styled(TextField)({
  marginBottom: 25
})

const ButtonRow = styled(Grid)({
  marginTop: 20
})

const Home = () => {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [hasSubmittedUrl, setHasSubmittedUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)

  const updateUrl = (e) => setUrl(e.target.value)
  const submitUrl = async () => {
    if (!isURL(url)) {
      setErrorMessage('Not a Valid URL')
      return
    }
    try {
      setHasSubmittedUrl(true)
      const { data: newShortenedUrl } = await axios.post(
        `${process.env.REACT_APP_API}/urls`,
        {
          original: url
        }
      )
      setErrorMessage('')
      setShortenedUrl(newShortenedUrl)
    } catch (e) {
      setHasSubmittedUrl(false)
    }
  }

  const copyUrl = async () => {
    await navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/${shortenedUrl}`
    )
    setShowSnackbar(true)
  }

  const hideSnackbar = () => {
    setShowSnackbar(false)
  }

  const goBackToHome = () => {
    setHasSubmittedUrl(false)
    setShortenedUrl('')
    setUrl('')
  }

  const FormTemplate = ({ title, subtitle, children }) => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={2} lg={3} />
        <Grid item xs={12} md={8} lg={6}>
          <FormPaper elevation={3}>
            <FormTitle textAlign="center" variant="h2">
              {title}
            </FormTitle>
            <FormDescription textAlign="center" variant="subtitle1">
              {subtitle}
            </FormDescription>
            {children}
          </FormPaper>
        </Grid>
      </Grid>
    )
  }

  return (
    <div style={{ flex: 1 }}>
      {hasSubmittedUrl ? (
        shortenedUrl ? (
          <FormTemplate title="Here you go!">
            <Typography textAlign="center">
              <Link
                href={`${window.location.protocol}//${window.location.host}/${shortenedUrl}`}
                target="_blank"
              >{`${window.location.protocol}//${window.location.host}/${shortenedUrl}`}</Link>
            </Typography>
            <ButtonRow container spacing={2}>
              <Grid item md={8} xs={12}>
                <Button
                  variant="contained"
                  onClick={copyUrl}
                  color="primary"
                  fullWidth
                >
                  Copy
                </Button>
              </Grid>
              <Grid item md={4} xs={12}>
                <Button
                  variant="contained"
                  onClick={goBackToHome}
                  color="secondary"
                  fullWidth
                >
                  Back to Home
                </Button>
              </Grid>
            </ButtonRow>
          </FormTemplate>
        ) : (
          <FormTemplate title="Generating URL..." />
        )
      ) : (
        <FormTemplate
          title="URL Shortener"
          subtitle="Paste a long URL, and get a short one!"
        >
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <URLForm
                id="url"
                label="URL"
                variant="outlined"
                value={url}
                onChange={updateUrl}
                helperText={errorMessage}
                error={!!errorMessage}
                multiline
                fullWidth
              />
              <Button
                onClick={submitUrl}
                size="large"
                variant="contained"
                fullWidth
              >
                Shorten
              </Button>
            </Grid>
          </Grid>
        </FormTemplate>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={hideSnackbar}
        message="URL Copied"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  )
}

export default Home
