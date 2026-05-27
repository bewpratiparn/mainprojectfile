import { InstanceAuthAPI } from "./instances"

export default class AuthService extends InstanceAuthAPI {
  static getProfile() {
    return this.api.get("/authorize/")
  }

  static login(username, password) {
    return this.api.post("/login/", { username, password })
  }

  static register(data) {
    return this.api.post("/register/", data)
  }
}
