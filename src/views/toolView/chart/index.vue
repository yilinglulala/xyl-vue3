<template>
  <div class="container">
    <div v-for="item in chartConfig" :key="item.key" :style="{width:item.width}">
      {{ item.title }}
    </div>
  </div>
</template>
  
<script lang="ts">
import * as ECharts from "echarts";
export default {
  data() {
    return {
      chartConfig:  [
        { key: 1, title: "aaa", width:'' },
        {
          key: 2,
          title: "bbb",
        },
        {
          key: 3,
          title: "ccc",
        },
        {
          key: 4,
          title: "ddd",
        },
        {
          key: 5,
          title: "eee",
        },
      ],
    };
  },
  created(){
    this.chartConfig.forEach((item, i)=>{
        
        return {
            ...item,
            width: item.width || '50%'
        }
    })
  }
};
</script>
<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}
.container > div {
    width: 45%;
  height: 100px;
  border: 1px solid #ccc;
  margin: 8px;
}
</style>