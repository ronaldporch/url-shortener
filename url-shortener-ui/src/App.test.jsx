import { render, screen } from '@testing-library/react'
import App from './App'

global.navigator.clipboard = {
  writeText: () => {}
}

jest.mock('axios', () => ({
  get: () => {},
  post: () => ({ data: 'abc123' })
}))

test('Render Title and Subheader', () => {
  render(<App />)
  const header = screen.getByText(/URL Shortener/i)
  expect(header).toBeInTheDocument()
  const subHeader = screen.getByText(/Paste a long URL, and get a short one!/i)
  expect(subHeader).toBeInTheDocument()
})
