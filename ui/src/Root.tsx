import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import { Page } from './Page'
import { createTheme, MantineProvider } from '@mantine/core'

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = createTheme({})
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <Page />
    </Provider>
  </React.StrictMode>,
)
