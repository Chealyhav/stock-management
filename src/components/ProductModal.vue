<template>
  <div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Product Name</label>
              <input type="text" class="form-control" v-model="formData.name" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" v-model="formData.description" rows="3"></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Price</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" v-model="formData.price" step="0.01" required>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Quantity</label>
                <input type="number" class="form-control" v-model="formData.quantity" required>
              </div>
            </div>
            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Modal } from 'bootstrap'

const emit = defineEmits(['submit'])
const loading = ref(false)
const isEditing = ref(false)
const formData = ref({
  name: '',
  description: '',
  price: 0,
  quantity: 0
})

const openModal = (product = null) => {
  isEditing.value = !!product
  formData.value = product ? { ...product } : {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  }
  const modal = new Modal(document.getElementById('productModal'))
  modal.show()
}

const handleSubmit = async () => {
  loading.value = true
  try {
    await emit('submit', { ...formData.value })
    const modal = Modal.getInstance(document.getElementById('productModal'))
    modal?.hide()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

defineExpose({ openModal })
</script>