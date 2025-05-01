<template>
  <!-- Loading Overlay -->
  <div v-if="loading" class="loading-overlay">
    <div class="spinner-border text-primary"></div>
  </div>

  <div class="container mt-4">
    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3" v-for="stat in stats" :key="stat.title">
        <div :class="`card stat-card ${stat.bgClass} text-white h-100`">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="card-subtitle mb-2">{{ stat.title }}</h6>
                <h2 class="card-title mb-0">{{ stat.value }}</h2>
              </div>
              <i :class="`${stat.icon} fa-2x opacity-50`"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-4">
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

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
      <div class="col-md-8">
        <div class="card h-100">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Stock Value Trend</h5>
          </div>
          <div class="card-body">
            <apexchart
              type="area"
              height="350"
              :options="chartOptions.trend"
              :series="chartSeries.trend"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-header bg-white">
            <h5 class="card-title mb-0">Stock Status</h5>
          </div>
          <div class="card-body">
            <apexchart
              type="donut"
              height="350"
              :options="chartOptions.status"
              :series="chartSeries.status"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Products -->
    <div class="card">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Recent Products</h5>
        <router-link to="/products/new" class="btn btn-primary btn-sm">
          <i class="fas fa-plus me-1"></i>Add Product
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in recentProducts" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>${{ product.price }}</td>
                <td>
                  <span :class="`badge ${getStatusBadgeClass(product.status)}`">
                    {{ product.status }}
                  </span>
                </td>
                <td>
                  <button 
                    class="btn btn-sm btn-outline-primary me-1"
                    @click="$router.push(`/products/${product.id}/edit`)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    class="btn btn-sm btn-outline-danger"
                    @click="handleDelete(product.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import Swal from 'sweetalert2'
import { useTransition } from '@vueuse/core'

const stats = ref([
  {
    title: 'Total Products',
    value: '156',
    icon: 'fas fa-boxes',
    bgClass: 'bg-primary'
  },
  {
    title: 'Total Value',
    value: '$45,250',
    icon: 'fas fa-dollar-sign',
    bgClass: 'bg-success'
  },
  {
    title: 'Low Stock Items',
    value: '12',
    icon: 'fas fa-exclamation-triangle',
    bgClass: 'bg-warning'
  },
  {
    title: 'Out of Stock',
    value: '3',
    icon: 'fas fa-ban',
    bgClass: 'bg-info'
  }
])

const chartOptions = ref({
  trend: {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  },
  status: {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    colors: ['#28a745', '#ffc107', '#dc3545']
  }
})

const chartSeries = ref({
  trend: [{
    name: 'Stock Value',
    data: [31000, 40000, 35000, 50000, 49000, 60000]
  }],
  status: [70, 20, 10]
})

const recentProducts = ref([
  // Add your product data here
])

const getStatusBadgeClass = (status: string) => {
  const classes = {
    'In Stock': 'bg-success',
    'Low Stock': 'bg-warning',
    'Out of Stock': 'bg-danger'
  }
  return classes[status] || 'bg-secondary'
}

const loading = ref(false)
const searchQuery = ref('')

// Add animated counter
const animateValue = (value: number) => {
  const counter = useTransition(value)
  return counter
}

// Add notification function
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000
  })
}

// Add delete confirmation
const handleDelete = async (productId: number) => {
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
      // Add your delete API call here
      showNotification('Product deleted successfully')
    } catch (error) {
      showNotification('Failed to delete product', 'error')
    }
  }
}

onMounted(async () => {
  loading.value = true
  try {
    // Add your API calls here
    showNotification('Data loaded successfully')
  } catch (error) {
    showNotification('Failed to load data', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.table th {
  cursor: pointer;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>