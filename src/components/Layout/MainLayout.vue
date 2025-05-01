<template>
  <div class="layout-wrapper">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <i class="fas fa-warehouse"></i>
        <span v-if="!isSidebarCollapsed">Stock Manager</span>
      </div>
      <div class="sidebar-menu">
        <router-link to="/" class="menu-item" :class="{ active: $route.path === '/' }">
          <i class="fas fa-home"></i>
          <span v-if="!isSidebarCollapsed">Dashboard</span>
        </router-link>
        <router-link to="/products" class="menu-item" :class="{ active: $route.path.includes('/products') }">
          <i class="fas fa-boxes"></i>
          <span v-if="!isSidebarCollapsed">Products</span>
        </router-link>
        <router-link to="/categories" class="menu-item" :class="{ active: $route.path.includes('/categories') }">
          <i class="fas fa-tags"></i>
          <span v-if="!isSidebarCollapsed">Categories</span>
        </router-link>
        <!-- <router-link to="/stock" class="menu-item" :class="{ active: $route.path.includes('/stock') }">
          <i class="fas fa-warehouse"></i>
          <span v-if="!isSidebarCollapsed">Stock</span>
        </router-link>
        <router-link to="/sales" class="menu-item" :class="{ active: $route.path.includes('/sales') }">
          <i class="fas fa-chart-line"></i>
          <span v-if="!isSidebarCollapsed">Sales</span>
        </router-link> -->
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navbar -->
      <nav class="top-navbar">
        <button class="toggle-btn" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
        <div class="navbar-right">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search...">
          </div>
          <div class="notifications">
            <i class="fas fa-bell"></i>
            <span class="badge">3</span>
          </div>
          <div class="user-menu">
            <img src="https://via.placeholder.com/32" alt="User" class="avatar">
            <span v-if="!isSidebarCollapsed">Admin</span>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  gap: 10px;
  transition: all 0.3s ease;
}

.menu-item:hover, .menu-item.active {
  background: rgba(255,255,255,0.1);
}

.main-content {
  flex: 1;
  background: #f8f9fa;
}

.top-navbar {
  background: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 8px 15px;
  border-radius: 20px;
}

.search-box input {
  border: none;
  background: none;
  outline: none;
}

.notifications {
  position: relative;
}

.notifications .badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 0.7rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.page-content {
  padding: 20px;
}
</style>