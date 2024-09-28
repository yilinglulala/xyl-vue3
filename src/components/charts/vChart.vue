<template>
  <div class="chart">
    <div v-show="!empty" class="chart__el" ref="chartEl"></div>
    <NoData v-show="empty" class="chart__empty"></NoData>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { useElementSize } from "@vueuse/core"
import * as ECharts from "echarts";

// 提供 props 属性 empty，让组件稳定感知当前是否是空数据
defineProps({
  empty: {
    type: Boolean,
    default: false
  }
})
// 向外弹射事件 'resize'
const emits = defineEmits(['resize'])

defineExpose(
  {
    // 向父组件暴露方法：获得ECharts实例
    getChart: () => {
    },
    // 向父组件暴露方法：更新ECharts配置
    setOption: () => {
    }
  }
)

const el = ref(null)
const { width, height } = useElementSize(el) // width和 height 都是响应式的 `ref` 对象
watchEffect(() => {
  if (width.value && height.value) {
    emits('resize', { width: width.value, height: height.value })
    chartRef.value?.resize();
  }
})

onMounted(() => {
  const chart = Echarts.init(chartEl.value, 'dark');
})

</script>