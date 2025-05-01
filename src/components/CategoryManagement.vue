<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Categories Management</h5>
        <button class="btn btn-primary" @click="openAddModal">
          <i class="fas fa-plus me-1"></i>Add Category
        </button>
      </div>
      <div class="card-body">
        <!-- Categories Table -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" @click="editCategory(category)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="deleteCategory(category)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <div class="modal fade" id="categoryModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Category' : 'Add Category' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Category Name</label>
                <input type="text" class="form-control" v-model="formData.name" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="formData.description" rows="3"></textarea>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { categoryService } from '../services/categoryService'
import { toast } from 'vue3-toastify'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'

const categories = ref([])
const isEditing = ref(false)
const formData = ref({
  id: null,
  name: '',
  description: ''
})

const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getAllCategories()
  } catch (error) {
    toast.error('Failed to fetch categories')
  }
}

const openAddModal = () => {
  isEditing.value = false
  formData.value = { id: null, name: '', description: '' }
  const modal = new Modal(document.getElementById('categoryModal'))
  modal.show()
}

const editCategory = (category) => {
  isEditing.value = true
  formData.value = { ...category }
  const modal = new Modal(document.getElementById('categoryModal'))
  modal.show()
}

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await categoryService.updateCategory(formData.value.id, formData.value)
      toast.success('Category updated successfully')
    } else {
      await categoryService.createCategory(formData.value)
      toast.success('Category created successfully')
    }
    const modal = Modal.getInstance(document.getElementById('categoryModal'))
    modal?.hide()
    fetchCategories()
  } catch (error) {
    toast.error('Failed to save category')
  }
}

const deleteCategory = async (category) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      await categoryService.deleteCategory(category.id)
      toast.success('Category deleted successfully')
      fetchCategories()
    } catch (error) {
      toast.error('Failed to delete category')
    }
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
/* Add any additional styles here */
</style>