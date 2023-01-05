<!--
 * @FilePath: \tools\src\views\toolView\configTable\index.vue
 * @Description: 配置表格页面
-->
<template>
  <div>
    <el-button @click="showCode">打开源码</el-button>
    <el-button @click="reset">重置</el-button>
    <div>
      <span>prop</span>
      <span>label</span>
    </div>
    <config-form v-for="(item, i) in data.formData" :key="i" :form-items="formItems" :form="data.formData[i]" :inline="true"
      :tools="tools"></config-form>
    <!-- 源码展示 -->
    <el-drawer v-model="drawerVisible" title="源码" direction="rtl">
      <el-button @click="copy">复制</el-button>
      <el-input type="textarea" v-model="strFormItem" :rows="38" class="code-textarea" @input="strFormItemChanged">
      </el-input>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import configForm from "@/components/configForm/index.vue";
import { addClipboard } from "@/utils/tools";
import { cloneDeep } from "lodash-es";
import { computed, reactive, ref, watch } from "vue-demi";
let drawerVisible = ref(false);
let strFormItem = ref("");
const getDefaultForm = () => {
  return {
    id: +new Date(),
    prop: "",
    label: "",
  };
};
const tools = [
  {
    label: "添加",
    click: () => {
      data.formData.push(getDefaultForm());
    },
  },
];
const formItems = [
  {
    key: "prop",
    bind: {
      placeholder: "prop",
    },
  },
  {
    key: "label",
    bind: {
      placeholder: "label",
    },
  },
  {
    key: "sortable",
    comp: 'el-switch',
    label: "可排序",
    // bind: {
    //   placeholder: "可排序",
    // },
  },
];
let data = reactive({
  formData: [
    {
      id: +new Date(),
      prop: "",
      label: "",
      sortable: false
    },
  ],
});

const showCode = () => {
  drawerVisible.value = true;
  strFormItem.value = JSON.stringify(
    data.formData.map((v) => {
      let obj = handleObj(cloneDeep(v))
      return obj
    }),
    null,
    4
  );
};
const handleObj = (obj) => {
  delete obj.id
  if (!obj.sortable) {
    delete obj.sortable
  }
  return obj
}
const copy = () => {
  addClipboard(JSON.stringify(
    data.formData.map((v) => {
      let { prop, label } = v;
      return {
        prop,
        label: `this.$t('${label}')`,
      };
    }),
    null,
    4
  ));
};
const strFormItemChanged = (v) => {
  try {
    data.formData = reactive(JSON.parse(strFormItem.value));
  } catch (e) {}
};

const reset = ()=>{
  data.formData = [getDefaultForm()]
}
</script>