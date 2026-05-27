import { InstanceShopAPI } from "./instances"

export default class ShopService extends InstanceShopAPI {
  static getShops() {
    return this.api.get("/shops/")
  }

  static addShop(formData) {
    return this.api.post("/add_shop/", formData)
  }

  static editShop(shopId, data) {
    return this.api.put(`/edit_shop/${shopId}`, data)
  }
}
