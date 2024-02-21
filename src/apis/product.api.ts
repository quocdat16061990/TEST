import http from 'src/utils/http'
import { ProductListConfig, ProductResponse } from 'src/types/product.type'
const URL = 'products'

const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<ProductResponse>(URL, {
      params
    })
  }
}


export default productApi