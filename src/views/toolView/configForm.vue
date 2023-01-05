<!--
 * @FilePath: \tools\src\views\toolView\configForm.vue
 * @Description: 配置表单
-->
<template>
  <section class="tool-config-form">
    <el-button @click="()=>{ drawerVisible=true }">打开源码</el-button>
    <el-button type="primary" @click="handleAdd">添加</el-button>

    <config-form style="width: 520px" :form-items="formItems" :form="form" label-position="top" :formItemClick="formItemClick"></config-form>
    
    <!-- 配置 -->
    <el-dialog v-model="dialogFormVisible" title="添加配置">
      <config-form :form-items="singleFormItems" :form="obj.curItemFormData" label-position="top"></config-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSingle">
            确定
          </el-button>
          <el-button type="primary" @click="handleCopy(obj.curItemFormData)">
            复制
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 源码展示 -->
    <el-drawer v-model="drawerVisible" title="源码" direction="rtl">
      <el-input type="textarea" v-model="strFormItem" :rows="38" class="code-textarea"></el-input>
    </el-drawer>
  </section>
</template>
<script lang='ts' setup>
interface IFormItem {
  // id?: string;
  key: string;
  label: string;
  [key: string]: any;
}
import { computed, reactive, ref } from "vue";
import configForm from "@/components/configForm/index.vue";
import { clone, cloneDeep } from "lodash-es";
import { addClipboard } from "@/utils/tools";
let drawerVisible = ref(false);
let dialogFormVisible = ref(false);
let addMode = ref(false);
let form = reactive({});
let curItemFormData: IFormItem = reactive({ key: "", label: "" });
let obj = reactive({
  curItemFormData: { key: "", label: "" },
});
let formItems = reactive([
  {
    key: "schedulerPolicy",
    label: "label",
    comp: "el-select",
    required: true,
    labelHelperText: "labelHelperText",
    options: [
      { label: 0, value: 0 },
      {
        label: 1,
        value: 1,
      },
    ],
  },
  {
    key: "a",
    label: "a",
  },
]);
let singleFormItems = reactive([
  {
    key: "key",
    label: "key",
  },
  {
    key: "label",
    label: "label",
  },
  {
    key: "comp",
    label: "comp",
    comp: "el-select",
    options: [
      { label: "el-input", value: "" },
      { label: "el-select", value: "el-select" },
      { label: "el-switch", value: "el-switch" },
      { label: "el-checkbox", value: "el-checkbox" },
      { label: "el-input-number", value: "el-input-number" },
      { label: "add-form", value: "add-form" },
    ],
  },
  {
    key: "required",
    label: "required",
    comp: "el-switch",
  },
  {
    key: "labelHelperText",
    label: "labelHelperText",
  },
]);
const strFormItem = computed({
  get() {
    let form = cloneDeep(formItems)
    form = form.map(v=>{
      return {
        ...v,
        label: `this.$t('${v.label}')`
      }
    })
    return JSON.stringify(form, null, 4);
  },
  set(value: string) {
    try {
      setTimeout((v) => {
        formItems = JSON.parse(value);
      }, 1000);
    } catch (error) {
      console.log("json error", error);
    }
  },
});
const formItemClick = (item: IFormItem) => {
  obj.curItemFormData = item;
  dialogFormVisible.value = true;
  addMode.value = false;
};
const handleSingle = () => {
  dialogFormVisible.value = false
  if (addMode.value) {
    formItems.push(obj.curItemFormData);
    obj.curItemFormData = reactive({ key: "", label: "" });
  }
};
const handleCopy = (data) => {
  addClipboard(JSON.stringify(data))
}
// 【添加】
const handleAdd = () => {
  dialogFormVisible.value = true;
  addMode.value = true;
};
</script>
<style>
.tool-config-form .code-textarea {
  height: 80vh;
}
</style>