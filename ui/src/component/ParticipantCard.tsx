import { FC, useEffect, useState } from 'react'
import { Badge, Button, Card, Group, Text, TextInput } from '@mantine/core'
import { translate } from '../intl/translate'
import { updateWants } from '../data/backendClient'
import { Participant } from '../data/datatypes'

interface ParticipantCardProps {
  participant: Participant
}

export const ParticipantCard: FC<ParticipantCardProps> = ({ participant }) => {
  const [participantWants, setParticipantWants] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [updateError, setUpdateError] = useState(false)

  useEffect(() => {
    setParticipantWants(participant.wants)
  }, [participant.wants])

  return (
    <Card shadow="sm" padding="md" radius="md">
      <Group justify="space-between" my="md">
        <Text fw="bold">{participant.name}</Text>
        <Group>
          {participant.wants || participantWants ? (
            <></>
          ) : (
            <Badge size="sm" color="red">
              {translate('set your wish')}
            </Badge>
          )}
          {participant.assignedReceiverDesireId ? (
            <></>
          ) : (
            <Badge size="sm" color="yellow">
              {translate('not assigned')}
            </Badge>
          )}
        </Group>
      </Group>

      {editMode ? (
        <TextInput
          value={participantWants}
          onChange={event => setParticipantWants(event.currentTarget.value)}
        ></TextInput>
      ) : (
        <Text>{participantWants ?? participant.wants}</Text>
      )}
      <Group justify="space-between">
        {editMode ? (
          <Button
            onClick={() => {
              updateWants(participant, participantWants, setUpdateError)
              setEditMode(false)
            }}
          >
            {translate('Set')}
          </Button>
        ) : (
          <Button onClick={() => setEditMode(true)}>{translate('Edit')}</Button>
        )}
      </Group>
      {updateError && (
        <Text>{translate('There is a problem with updating your gift preference. Please try again')}</Text>
      )}
    </Card>
  )
}
