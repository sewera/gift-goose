import { FC } from 'react'
import { Card, Text } from '@mantine/core'
import { translate } from '../intl/translate'

interface ReceiverCardProps {
  assignedReceiverDesireId?: string
  assignedReceiverWants?: string
}

export const ReceiverCard: FC<ReceiverCardProps> = ({ assignedReceiverDesireId, assignedReceiverWants }) => {
  return (
    <Card shadow="sm" padding="md" radius="md">
      {assignedReceiverDesireId && assignedReceiverWants ? (
        <>
          <Text fw="bold">{translate('Assigned receiver')}</Text>
          <Text>{assignedReceiverWants}</Text>
          <Text>
            {translate('Put on the gift:')} <b>{assignedReceiverDesireId}</b>
          </Text>
        </>
      ) : (
        <>
          <Text fw="bold">{translate('No assigned receiver')}</Text>
        </>
      )}
    </Card>
  )
}
