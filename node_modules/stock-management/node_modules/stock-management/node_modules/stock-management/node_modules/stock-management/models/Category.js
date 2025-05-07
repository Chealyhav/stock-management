class Category {
  static async getAll() {
    // Implement database logic to fetch all categories
    return [];
  }

  static async create(categoryData) {
    // Implement database logic to create a new category
    return categoryData;
  }

  static async update(id, categoryData) {
    // Implement database logic to update a category by id
    return { id, ...categoryData };
  }

  static async delete(id) {
    // Implement database logic to delete a category by id
    return { id };
  }
}

module.exports = Category;