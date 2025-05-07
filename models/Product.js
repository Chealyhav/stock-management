class Product {
  static async getAll() {
    // Implement database logic to fetch all products
    return [];
  }

  static async create(productData) {
    // Implement database logic to create a new product
    return productData;
  }

  static async update(id, productData) {
    // Implement database logic to update a product by id
    return { id, ...productData };
  }

  static async delete(id) {
    // Implement database logic to delete a product by id
    return { id };
  }
}

module.exports = Product;