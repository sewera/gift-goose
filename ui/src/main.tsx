import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import { MainPage } from './MainPage'
import { createTheme, MantineProvider } from '@mantine/core'

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = createTheme({})
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <MainPage />
    </Provider>
  </React.StrictMode>,
)
