<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-white">
        <h5 class="card-title mb-0">Add New Product</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input type="text" class="form-control" v-model="product.name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea class="form-control" v-model="product.description" rows="3"></textarea>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Price</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input type="number" class="form-control" v-model="product.price" step="0.01" required>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Quantity</label>
              <input type="number" class="form-control" v-model="product.quantity" required>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <router-link to="/products" class="btn btn-secondary">Cancel</router-link>
            <button type="submit" class="btn btn-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const product = ref({
  name: '',
  description: '',
  price: 0,
  quantity: 0
})

const handleSubmit = async () => {
  try {
    // Add your API call here
    toast.success('Product added successfully')
    router.push('/products')
  } catch (error) {
    toast.error('Failed to add product')
  }
}
</script>