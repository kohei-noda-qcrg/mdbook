import React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RecoilRoot>
    <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
  </RecoilRoot>
)

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
