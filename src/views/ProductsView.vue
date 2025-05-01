<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Products Management</h5>
        <button class="btn btn-primary" @click="openAddModal">
          <i class="fas fa-plus me-1"></i>Add Product
        </button>
      </div>
      <div class="card-body">
        <!-- Search and Filter -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="input-group">
              <input 
                type="text" 
                class="form-control" 
                v-model="searchQuery"
                placeholder="Search products..."
              >
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="filterStatus">
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <!-- Products Table -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th @click="sortBy('name')">
                  Name <i :class="getSortIcon('name')"></i>
                </th>
                <th @click="sortBy('quantity')">
                  Quantity <i :class="getSortIcon('quantity')"></i>
                </th>
                <th @click="sortBy('price')">
                  Price <i :class="getSortIcon('price')"></i>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>${{ product.price }}</td>
                <td>
                  <span :class="`badge ${getStatusBadgeClass(product.status)}`">
                    {{ product.status }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-1" @click="editProduct(product)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ProductModal ref="productModal" @submit="handleModalSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '../services/productService'
import ProductModal from '../components/ProductModal.vue'
import { toast } from 'vue3-toastify'
import Swal from 'sweetalert2'

const productModal = ref()
const loading = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const sortField = ref('name')
const sortDirection = ref('asc')
const products = ref([])

// Computed products with filtering and sorting
const filteredProducts = computed(() => {
  return products.value
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterStatus.value ? product.status === filterStatus.value : true)
    )
    .sort((a, b) => {
      const modifier = sortDirection.value === 'asc' ? 1 : -1
      return a[sortField.value] > b[sortField.value] ? modifier : -modifier
    })
})

// Fetch products
const fetchProducts = async () => {
  loading.value = true
  try {
    products.value = await productService.getAllProducts()
  } catch (error) {
    toast.error('Failed to fetch products')
  } finally {
    loading.value = false
  }
}

// Add/Edit product
const openAddModal = () => {
  productModal.value.openModal()
}

const editProduct = (product) => {
  productModal.value.openModal(product)
}

const handleModalSubmit = async (data) => {
  try {
    if (data.id) {
      await productService.updateProduct(data.id, data)
      toast.success('Product updated successfully')
    } else {
      await productService.createProduct(data)
      toast.success('Product created successfully')
    }
    fetchProducts()
  } catch (error) {
    toast.error('Failed to save product')
  }
}

// Delete product
const deleteProduct = async (product) => {
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
      await productService.deleteProduct(product.id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }
}

// Utility functions
const getStatusBadgeClass = (status: string) => {
  const classes = {
    'In Stock': 'bg-success',
    'Low Stock': 'bg-warning',
    'Out of Stock': 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const getSortIcon = (field: string) => {
  if (sortField.value !== field) return 'fas fa-sort'
  return sortDirection.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'
}

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.table th {
  cursor: pointer;
}

.badge {
  font-size: 0.85em;
  padding: 0.5em 0.75em;
}
</style>
