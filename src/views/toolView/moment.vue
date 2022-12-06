<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="当前时间戳">
      <el-button type="primary" @click="getNow">生成</el-button>{{nowTimestamp}}
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.timestamp" placeholder="timestamp" />
      <el-button type="primary" @click="toTimestamp">&lt;</el-button>
      <el-button type="primary" @click="toDate">&gt;</el-button>
      <el-input v-model="form.date" placeholder="date" />
    </el-form-item>
    <el-form-item>

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
  nowTimestamp.value = moment().valueOf();
};
const toTimestamp = () => {
  form.timestamp = moment(form.date.valueOf()).valueOf();
};
const toDate = () => {
  console.log(moment(form.timestamp));
  form.date = moment(form.timestamp).format('YYYY-MM-DD HH:mm:ss')
};
</script>

