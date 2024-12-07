import { language, pbHost } from '../app.config.json'

export const BACKEND_URL = pbHost ? `http://${pbHost}` : 'http://localhost:8090'
export const LANGUAGE = language ?? 'en'
export const ADMIN_PARTICIPANT_ID = '0000'
export const ADMIN_KEY = '2137'
