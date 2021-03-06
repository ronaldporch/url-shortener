import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

global.navigator.clipboard = {
  writeText: () => {}
}

jest.mock('axios', () => ({
  get: () => {},
  post: () => ({ data: 'abc123' })
}))

test('Render Title and Subheader', () => {
  render(<Home />)
  const header = screen.getByText(/URL Shortener/i)
  expect(header).toBeInTheDocument()
  const subHeader = screen.getByText(/Paste a long URL, and get a short one!/i)
  expect(subHeader).toBeInTheDocument()
})

test('URL Form Value', () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'https://google.com' }
  })

  expect(screen.getByDisplayValue('https://google.com')).toBeInTheDocument()
})

test('URL Form Submitting Invalid URL', () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'banana' }
  })

  fireEvent.click(screen.getByText(/Shorten URL/i))

  expect(screen.getByText(/valid/i)).toBeInTheDocument()
})

test('URL Form Submission', async () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'https://google.com' }
  })

  fireEvent.click(screen.getByText(/Shorten URL/i))

  expect(screen.getByText('Generating URL...')).toBeInTheDocument()

  const shortenedUrl = await screen.findByText(/abc123/i)

  expect(shortenedUrl).toBeInTheDocument()
})

test('URL Form Submission with Enter Button', async () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'https://google.com' }
  })

  fireEvent.keyDown(form, { key: 'Enter', code: 'Enter' })

  expect(screen.getByText('Generating URL...')).toBeInTheDocument()

  const shortenedUrl = await screen.findByText(/abc123/i)

  expect(shortenedUrl).toBeInTheDocument()
})

test('URL Copy', async () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'https://google.com' }
  })

  fireEvent.click(screen.getByText(/Shorten URL/i))

  expect(screen.getByText('Generating URL...')).toBeInTheDocument()

  const copyButton = await screen.findByText(/Copy/i)

  fireEvent.click(copyButton)

  expect(await screen.findByText(/URL Copied/)).toBeInTheDocument()
})

test('URL Form Navigate Back Home', async () => {
  render(<Home />)

  const form = screen.getByLabelText('URL')

  fireEvent.change(form, {
    target: { value: 'https://google.com' }
  })

  fireEvent.click(screen.getByText(/Shorten URL/i))

  const backButton = await screen.findByText(/back/i)

  expect(backButton).toBeInTheDocument()

  fireEvent.click(backButton)

  const header = screen.getByText(/URL Shortener/i)

  expect(header).toBeInTheDocument()
})
