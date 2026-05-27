import axios from "axios"

export const isDev = import.meta.env.DEV

let isRefreshing = false
let failedQueue = []

const SKIP_REFRESH_URLS = ["/login/", "/register/", "/auth/refresh/"]

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token)
  })
  failedQueue = []
}

export const createApiInstance = ({
  baseURL,
  withCredentials = true,
  headers = {},
  timeout,
} = {}) => {
  const instance = axios.create({
    ...(baseURL && { baseURL }),
    withCredentials,
    headers,
    ...(timeout && { timeout }),
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config
      const is401 = error.response?.status === 401
      const shouldSkip = SKIP_REFRESH_URLS.some((url) => original.url?.includes(url))

      if (is401 && !original._retry && !shouldSkip) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then((token) => {
            original.headers.Authorization = `Bearer ${token}`
            return instance(original)
          })
        }

        original._retry = true
        isRefreshing = true

        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          isRefreshing = false
          localStorage.removeItem("token")
          window.location.href = "/Login"
          return Promise.reject(error)
        }

        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_AUTH_API_URL}/auth/refresh/`,
            { refresh: refreshToken }
          )
          localStorage.setItem("token", data.token)
          processQueue(null, data.token)
          original.headers.Authorization = `Bearer ${data.token}`
          return instance(original)
        } catch (refreshError) {
          processQueue(refreshError, null)
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          window.location.href = "/Login"
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )

  return instance
}
