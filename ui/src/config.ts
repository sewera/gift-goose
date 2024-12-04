import { pbHost } from '../app.config.json'

export const BACKEND_URL = `http://${pbHost}` || 'http://localhost:8090'
