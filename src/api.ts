import axios from 'axios'

const isServer = typeof window === 'undefined';
const BASE_URL = "http://127.0.0.1:8000/v1/"
let accessToken: string | null = null;
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];


export const setAccessToken = (token: string | null) => {
  accessToken = token;
};


const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  let token = accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const refresh = async (): Promise<string> => {
  const { data } = await axios.post(
    `${BASE_URL}auth/refresh`,
    {},
    { withCredentials: true }
  );
  const newToken = data.access_token;
  setAccessToken(newToken);
  return newToken;
};




api.interceptors.response.use(
  (res) => res,
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(api(originalRequest))
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true

      try {
        const newToken = await refresh()
        queue.forEach((cb) => cb(newToken))
        queue = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        queue = [];
        setAccessToken(null);


        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
   }
)


export default api