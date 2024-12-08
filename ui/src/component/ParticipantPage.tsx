import { Container } from '@mantine/core'
import { ParticipantCard } from './ParticipantCard'
import { ReceiverCard } from './ReceiverCard'
import { Participant } from '../data/datatypes'
import { FC } from 'react'

interface ParticipantPageProps {
  participant: Participant
}

export const ParticipantPage: FC<ParticipantPageProps> = ({ participant }) => {
  return (
    <Container size="sm" mt="lg">
      <ParticipantCard participant={participant} />
      <ReceiverCard
        assignedReceiverDesireId={participant.assignedReceiverDesireId}
        assignedReceiverWants={participant.assignedReceiverWants}
      />
    </Container>
  )
}
