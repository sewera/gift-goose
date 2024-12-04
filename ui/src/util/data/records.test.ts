import { deleteFromRecord, recordFromIdArray } from './records'

it('should convert array to record', () => {
  // given
  const arr = [
    { id: '1', val: '1' },
    { id: '2', val: '2' },
  ]
  const expected = { '1': { id: '1', val: '1' }, '2': { id: '2', val: '2' } }

  // when
  const actual = recordFromIdArray(arr)

  // then
  expect(actual).toStrictEqual(expected)
})

it('should delete a value from a record', () => {
  // given
  const record = { '1': { id: '1', val: '1' }, '2': { id: '2', val: '2' } }
  const toDelete = { id: '1', val: '1' }
  const expected = { '2': { id: '2', val: '2' } }

  // when
  const actual = deleteFromRecord(record, toDelete)

  // then
  expect(actual).toStrictEqual(expected)
})
