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
      .catch((e) => {
        setUrlNotFound(true)
        console.log(e)
      })
  }, [url])
  return urlNotFound ? <div>Bruh, what?</div> : <div>Now Loading</div>
}

export default Redirect
