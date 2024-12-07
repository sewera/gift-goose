import { AdminParticipantData } from './datatypes'
import { shuffleReceivers } from './shuffle'

describe('shuffleReceivers', () => {
  const input: AdminParticipantData[] = [
    { id: '0000', name: 'First', exclude: false },
    { id: '0001', name: 'Second', exclude: false },
    { id: '0002', name: 'Third', exclude: false },
    { id: '0003', name: 'Fourth', exclude: true },
  ]

  it('shuffles receivers without excluded participants', () => {
    const output = shuffleReceivers(input)

    expect(output).toHaveLength(4)

    expect(output[0].assignedReceiver).toBeDefined()
    expect(output[0].assignedReceiver).toMatch(/000[12]/)
    expect(output[1].assignedReceiver).toBeDefined()
    expect(output[1].assignedReceiver).toMatch(/000[02]/)
    expect(output[2].assignedReceiver).toBeDefined()
    expect(output[2].assignedReceiver).toMatch(/000[01]/)

    expect(output[3].assignedReceiver).not.toBeDefined()
  })
  it('shuffles receivers without any participant being assigned to themselves', () => {
    const output = shuffleReceivers(input)

    expect(output[0].assignedReceiver).toBeDefined()
    expect(output[0].assignedReceiver).not.toEqual(input[0].id)
    expect(output[1].assignedReceiver).toBeDefined()
    expect(output[1].assignedReceiver).not.toEqual(input[1].id)
    expect(output[2].assignedReceiver).toBeDefined()
    expect(output[2].assignedReceiver).not.toEqual(input[2].id)
  })
})
