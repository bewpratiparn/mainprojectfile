import { RawAxiosResponseHeaders } from "axios"
import { InstanceShopAPI } from "./instances"

export default class ShopService extends InstanceShopAPI {
  static getShops():Promise<{data:any ,headers:RawAxiosResponseHeaders}> {
    return this.api.get("/shops/")
  }

  static addShop(formData:any):Promise<{data:any ,headers:RawAxiosResponseHeaders}> {
    return this.api.post("/add_shop/", formData)
  }

  static editShop(shopId:any, data:any):Promise<{data:any ,headers:RawAxiosResponseHeaders}> {
    return this.api.put(`/edit_shop/${shopId}`, data)
  }
}
