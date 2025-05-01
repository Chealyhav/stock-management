import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const productService = {
  async getAllProducts() {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  },

  async createProduct(product) {
    const response = await axios.post(`${API_URL}/products`, product)
    return response.data
  },

  async updateProduct(id, product) {
    const response = await axios.put(`${API_URL}/products/${id}`, product)
    return response.data
  },

  async deleteProduct(id) {
    const response = await axios.delete(`${API_URL}/products/${id}`)
    return response.data
  }
}