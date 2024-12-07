import { ADMIN_PARTICIPANT_ID } from '../config'

const participantIdRegex = new RegExp('([0-9]{4})')

export function participantIdFromURL() {
  const matches = participantIdRegex.exec(location.pathname)
  return matches ? matches[1] : null
}

export function adminKeyFromURL() {
  const query = new URLSearchParams(location.search)
  return query.get('key')
}

export function isAdmin() {
  return participantIdFromURL() === ADMIN_PARTICIPANT_ID
}

export function participantURLFromId(participantId: string) {
  const url = URL.parse(location.origin)
  if (!url) {
    return null
  }
  url.pathname = participantId
  return url.toString()
}
