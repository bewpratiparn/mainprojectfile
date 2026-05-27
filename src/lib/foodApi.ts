import { InstanceFoodAPI } from "./instances"

export default class FoodService extends InstanceFoodAPI {
  static getAllFood(shopId = null) {
    return shopId? this.api.get(`/show_all_food/?shop_id=${shopId}`): this.api.get("/show_all_food/")
  }

  static addFood(formData) {
    return this.api.post("/add_food/", formData)
  }
}
