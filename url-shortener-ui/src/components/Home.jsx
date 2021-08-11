import axios from 'axios'
import { useState } from 'react'

const Home = () => {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [hasSubmittedUrl, setHasSubmittedUrl] = useState('')

  const updateUrl = (e) => setUrl(e.target.value)
  const submitUrl = async () => {
    try {
      setHasSubmittedUrl(true)
      const { data: newShortenedUrl } = await axios.post(`${process.env.REACT_APP_API}/urls`, {
        original: url
      })
      setShortenedUrl(newShortenedUrl)
    } catch (e) {
      setHasSubmittedUrl(false)
      console.log(e)
    }
  }

  return hasSubmittedUrl ? (
    <div>
      {shortenedUrl ? (
        <p>{`${window.location.protocol}//${window.location.host}/${shortenedUrl}`}</p>
      ) : (
        <p>Getting Shortened Url...</p>
      )}
    </div>
  ) : (
    <div>
      <input value={url} onChange={updateUrl} />
      <button onClick={submitUrl}>Submit</button>
    </div>
  )
}

export default Home
