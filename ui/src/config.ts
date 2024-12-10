type AppConfig = {
  pbHost: string
  lang: string
}

const appConfig: AppConfig | undefined = (window as unknown as any)?.appConfig

export const BACKEND_URL = appConfig?.pbHost ?? 'http://localhost:8090'
export const LANGUAGE = appConfig?.lang ?? 'en'
export const ADMIN_PARTICIPANT_ID = '0000'
export const ADMIN_KEY = '8402'
