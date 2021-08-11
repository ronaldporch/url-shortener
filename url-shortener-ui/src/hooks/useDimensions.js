import { useEffect, useState } from 'react'

const useDimensions = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const updateDimensions = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    updateDimensions()
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return {
    width,
    height
  }
}

export default useDimensions
