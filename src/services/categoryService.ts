import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const categoryService = {
    async getAllCategories() {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    },

    async createCategory(category) {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    },

    async updateCategory(id, category) {
        const response = await axios.put(`${API_URL}/categories/${id}`, category);
        return response.data;
    },

    async deleteCategory(id) {
        const response = await axios.delete(`${API_URL}/categories/${id}`);
        return response.data;
    }
}