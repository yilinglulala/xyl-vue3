<!--
 * @FilePath: \tools\src\views\toolView\json.vue
 * @Description: json 工具
-->
<template>
  <div>123</div>
  <el-button @click="test">msg test</el-button>
  <el-form :model="form">
    <el-form-item label="label" prop="a" :rules="checkEmpty">
      <el-input v-model="form.a"></el-input>
    </el-form-item>
    <el-form-item label="label" prop="b" :rules="bRules">
      <el-input v-model="form.b"></el-input>
    </el-form-item>
  </el-form>
  <div class="test-attr" title="123" mycolor="#46b9c0" height="90">666</div>
</template>

<script lang="ts" setup>
import { Msg } from "@/utils/msg";
import { CONSTANT } from "@/utils/constant";
import { reactive } from "vue";
import { checkEmpty, creValidator } from "@/utils/FormValid";
const form = reactive({ a: "", b: "" });
const bRules = creValidator([
  {
    testFn: () => {
      return +form.b - +form.a < 0;
    },
  },
]);

function test() {
  Msg.countdown("123");
}
console.log(11, CONSTANT.getOption("Alarm.level.text"));
console.log(12, CONSTANT.getText("Alarm.level.text", 1));
</script>
<style lang="scss">
.test-attr {
  --title: attr(title);
  --mycolor: attr(mycolor);
  --height: attr(height px, 30px);
  height: var(--height);
  color: var(--mycolor);
  &::after {
    content: var(--title);
    background: var(--mycolor);
  }
}
</style>