import { FC } from 'react'
import { Card, Text, Title } from '@mantine/core'
import { translate } from '../intl/translate'

interface ReceiverCardProps {
  assignedReceiverDesireId?: string
  assignedReceiverWants?: string
}

export const ReceiverCard: FC<ReceiverCardProps> = ({ assignedReceiverDesireId, assignedReceiverWants }) => {
  const renderContent = () => {
    if (!assignedReceiverDesireId) {
      return <Text fw="bold">{translate('No assigned receiver')}</Text>
    } else if (!assignedReceiverWants) {
      return <Text fw="bold">{translate('The receiver did not set their desired gift')}</Text>
    }
    return (
      <>
        <Text>{translate('Prepare the following gift:')}</Text>
        <Text fw="bold" my="sm">
          {assignedReceiverWants}
        </Text>
        <Text>
          {translate('Put the following ID on the gift:')} <b>{assignedReceiverDesireId}</b>
        </Text>
      </>
    )
  }

  return (
    <Card shadow="sm" padding="md" radius="md">
      <Title mb="md" size="h2">
        {translate('Your mysterious gift receiver')}
      </Title>
      {renderContent()}
    </Card>
  )
}
