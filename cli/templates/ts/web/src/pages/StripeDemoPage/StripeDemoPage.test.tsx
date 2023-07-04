import { render } from '@redwoodjs/testing/web'

import StripeDemoPage from './StripeDemoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StripeDemoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StripeDemoPage />)
    }).not.toThrow()
  })
})
