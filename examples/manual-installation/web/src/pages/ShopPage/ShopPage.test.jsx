import { render } from '@redwoodjs/testing/web'

import ShopPage from './ShopPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShopPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShopPage />)
    }).not.toThrow()
  })
})
