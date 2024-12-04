import { Button, MantineProvider } from '@mantine/core'
export const MantineShowcase = () => (
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <p>Hello</p>
    <Button>Click me!</Button>
  </MantineProvider>
)
