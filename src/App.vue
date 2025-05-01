<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from './components/Layout/MainLayout.vue'
</script>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #34495e;
  --accent-color: #3498db;
  --success-color: #2ecc71;
  --warning-color: #f1c40f;
  --danger-color: #e74c3c;
  --text-color: #2c3e50;
  --bg-color: #f8f9fa;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  background: var(--bg-color);
  margin: 0;
  padding: 0;
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn {
  border-radius: 6px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.table {
  --bs-table-hover-bg: rgba(0,0,0,0.02);
}

.form-control, .form-select {
  border-radius: 6px;
  border: 1px solid #dee2e6;
  padding: 8px 12px;
}

.form-control:focus, .form-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
}
</style>