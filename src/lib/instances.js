import axios from "axios"
import { createApiInstance, isDev } from "./api"

const defaultApi = createApiInstance({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const authApiDev = createApiInstance({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  withCredentials: true,
})

const shopApiDev = createApiInstance({
  baseURL: import.meta.env.VITE_SHOP_API_URL,
  withCredentials: true,
})

const foodApiDev = createApiInstance({
  baseURL: import.meta.env.VITE_FOOD_API_URL,
  withCredentials: true,
})

const translateApiDev = createApiInstance({
  baseURL: import.meta.env.VITE_TRANSLATE_API_URL,
  withCredentials: true,
})

export const fileStorageApi = axios.create({
  baseURL: import.meta.env.VITE_FILE_STORAGE_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
})

export class InstanceFileStorage {
  static api = fileStorageApi
}

export class InstanceAuthAPI {
  static api = isDev ? authApiDev : defaultApi
}

export class InstanceShopAPI {
  static api = isDev ? shopApiDev : defaultApi
}

export class InstanceFoodAPI {
  static api = isDev ? foodApiDev : defaultApi
}

export class InstanceTranslateAPI {
  static api = isDev ? translateApiDev : defaultApi
}
