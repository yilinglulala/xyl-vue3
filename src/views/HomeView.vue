<!--
 * @FilePath: \tools\src\views\HomeView.vue
 * @Description: 首页
-->
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Menu from "../views/layout/menu.vue";
</script>
<style scoped>
.home-layout > .el-container {
  width: 100vw;
}
.main-container {
  height: calc(100vh - 60px);
}
</style>
<template>
  <div class="home-layout">
    <el-container>
      <el-header>LULALA</el-header>
      <el-container class="main-container">
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


