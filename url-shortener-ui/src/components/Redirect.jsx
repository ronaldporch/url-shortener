import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Redirect = () => {
  const [urlNotFound, setUrlNotFound] = useState(false)
  const { url } = useParams()
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/urls/${url}`)
      .then(({ data: redirectUrl }) => (window.location = redirectUrl))
      .catch(() => setUrlNotFound(true))
  }, [url])

  return urlNotFound ? (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" textAlign="center">
          404
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center">
          No Shortened URL Found
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" textAlign="center">
          Redirecting...
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Redirect
