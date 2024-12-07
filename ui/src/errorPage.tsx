import { FC } from 'react'
import { Box } from '@mantine/core'
import { translate } from './intl/translate'

interface ErrorPageProps {
  error: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ error }) => <Box>{translate(error)}</Box>
