export const deleteFromRecord = <T extends { id: string }>(
  record: Record<string, T>,
  toDelete: T,
): Record<string, T> => {
  const {
    [toDelete.id]: {},
    ...recordWithoutDeleted
  } = record
  return recordWithoutDeleted
}

export const recordFromIdArray = <T extends { id: string }>(arr: T[]): Record<string, T> =>
  arr.reduce((prev, curr) => ({ [curr.id]: curr, ...prev }), {})
