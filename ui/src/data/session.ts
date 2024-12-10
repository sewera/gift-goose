import { ADMIN_PARTICIPANT_ID, BASE_APP_URL } from '../config'

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
  return BASE_APP_URL.endsWith('/') ? `${BASE_APP_URL}${participantId}` : `${BASE_APP_URL}/${participantId}`
}
