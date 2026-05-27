import { InstanceTranslateAPI } from "./instances"

export default class TranslateService extends InstanceTranslateAPI {
  static get(direction, sentences) {
    return this.api.get(
      `/translate/${direction}/?sentences=${encodeURIComponent(sentences)}`
    )
  }

  static translate(direction, text) {
    return this.api.post(`/translate/${direction}/`, { text })
  }
}
