import { render, screen } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import Redirect from './Redirect'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}))

jest.mock('axios', () => ({
  get: async (url) => {
    if (url.includes('404')) {
      throw Error('URL Not Found')
    }
    return 'https://google.com'
  },
  post: () => ({ data: 'abc123' })
}))

test('Render Redirect Screen', () => {
  useParams.mockReturnValue({ url: 'abc123' })
  render(<Redirect />)
  const redirectHeader = screen.getByText(/Redirecting/i)
  expect(redirectHeader).toBeInTheDocument()
})

test('Render 404 Screen', async () => {
  useParams.mockReturnValue({ url: '404' })
  render(<Redirect />)
  const notFoundHeader = await screen.findByText(/404/i)
  expect(notFoundHeader).toBeInTheDocument()
})

// test('URL Form Value', () => {
//   render(<Home />)

//   const form = screen.getByLabelText('URL')

//   fireEvent.change(form, {
//     target: { value: 'https://google.com' }
//   })

//   expect(screen.getByDisplayValue('https://google.com')).toBeInTheDocument()
// })

// test('URL Form Submission', async () => {
//   render(<Home />)

//   const form = screen.getByLabelText('URL')

//   fireEvent.change(form, {
//     target: { value: 'https://google.com' }
//   })

//   fireEvent.click(screen.getByText(/Shorten URL/i))

//   expect(screen.getByText('Generating URL...')).toBeInTheDocument()

//   const shortenedUrl = await screen.findByText(/abc123/i)

//   expect(shortenedUrl).toBeInTheDocument()
// })
