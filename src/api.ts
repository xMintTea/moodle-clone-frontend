import axios from 'axios'


const isBrowser = typeof window !== 'undefined'

function getAccessToken(): string | null {
  return isBrowser ? localStorage.getItem('access_token') : null
}

function getRefreshToken(): string | null {
  return isBrowser ? localStorage.getItem('refresh_token') : null
}

function setTokens(access: string, refresh: string) {
  if (isBrowser) {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }
}

function clearTokens() {
  if (isBrowser) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}



const api = axios.create({
    baseURL: "http://localhost:8000/v1/"
})

api.interceptors.request.use(config => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api