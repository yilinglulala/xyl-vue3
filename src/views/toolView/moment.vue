<!--
 * @FilePath: \tools\src\views\toolView\moment.vue
 * @Description: 时间处理
-->
<template>
  <el-form :model="form" class="demo-form-inline">
    <el-form-item label="当前时间戳">
      <el-button type="primary" @click="getNow">生成</el-button>
    </el-form-item>
    <el-form-item>
      <el-input v-model.number="form.timestamp" placeholder="timestamp" clearable />
    </el-form-item>
    <el-form-item>
      <el-button @click="()=>form.timestamp*=1000">秒</el-button>
      <el-button type="primary" @click="toTimestamp">&lt;</el-button>
      <el-button type="primary" @click="toDate">&gt;</el-button>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.date" placeholder="date" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import moment from "moment";
import { reactive, ref } from "vue";

let nowTimestamp = ref(moment().valueOf());
const form = reactive({
  timestamp: nowTimestamp.value,
  date: "",
});

const getNow = () => {
  form.timestamp = moment().valueOf();
};
const toTimestamp = () => {
  form.timestamp = moment(form.date.valueOf()).valueOf();
};
const toDate = () => {
  form.date = moment(new Date(form.timestamp)).format("YYYY-MM-DD HH:mm:ss");
};
toDate();
</script>

