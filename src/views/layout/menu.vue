<!--
 * @FilePath: \tools\src\views\layout\menu.vue
 * @Description: 导航菜单
-->
<template>
  <div>
    <el-menu class="el-menu-vertical-demo" default-active="2">
      <el-sub-menu v-for="(item, i) in menu" :index="i" :key="item.title">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="(subMebu,j) in item.children" :index="`${i}-${j}`" :key="`${i}-${j}`" v-on="subMebu.vOn">
          {{subMebu.title}}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router";
const toolRouteChildren = routes[0].children.map((route) => ({
  title: route.name,
  vOn: {
    click: () => {
      pageTo(route.name);
    },
  },
}));
// 菜单项
let menu = [
  {
    title: "工具箱",
    children: toolRouteChildren,
  },
];

// 路由
import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router";
const router = useRouter();
const pageTo = (name: string) => {
  router.push({ name });
};
</script>
