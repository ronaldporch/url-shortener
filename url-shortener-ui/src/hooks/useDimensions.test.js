import { renderHook, act } from '@testing-library/react-hooks'
import useDimensions from './useDimensions'

test('should get window size', () => {
  const { result } = renderHook(() => useDimensions())

  // default size of react test library window
  expect(result.current.height).toBe(768)
  expect(result.current.width).toBe(1024)
})

test('should get new window size on resize', () => {
  const { result } = renderHook(() => useDimensions())

  act(() => {
    global.window.innerHeight = 120
    global.window.innerWidth = 500
    window.dispatchEvent(new Event('resize'))
  })

  expect(result.current.height).toBe(120)
  expect(result.current.width).toBe(500)
})
