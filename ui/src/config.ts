type AppConfig = {
  backendHost: string
  baseAppUrl?: string
  lang: string
}

const appConfig: AppConfig | undefined = (window as unknown as any)?.appConfig

export const BACKEND_HOST = appConfig?.backendHost ?? 'http://localhost:8090'
export const BASE_APP_URL = appConfig?.baseAppUrl ?? BACKEND_HOST
export const LANGUAGE = appConfig?.lang ?? 'en'
export const ADMIN_PARTICIPANT_ID = '0000'
