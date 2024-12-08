import { FC } from 'react'
import { Container, Text, Title } from '@mantine/core'
import { translate } from '../intl/translate'

interface ErrorPageProps {
  error: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ error }) => (
  <Container size="sm" mt="lg">
    <Title mb="md">{translate('Error')}</Title>
    <Text size="lg">{translate(error)}</Text>
  </Container>
)
