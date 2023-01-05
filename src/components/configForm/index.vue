<!--
 * @FilePath: \tools\src\components\admin\configForm\index.vue
 * @Description: 配置表单
 * import configForm from '@/components/configForm/index.vue'
    <config-form :form-items="formItems" :form="formData"></config-form>
-->
<template>
  <el-form class="edit-form" :inline="true" :model="form" :rules="formRules" ref="form" :label-position="labelPosition">
    <div v-for="item in formItems" :key="item.key">
      <div v-if="item.isTitle" v-bind="item.bind" v-show="item.show === undefined || item.show()">{{item.title}}</div>
      <el-form-item v-else :label="item.label" :required="item.required" v-bind="item.formItemBind"
        @click="()=>{formItemClick&&formItemClick(item)}" v-on="formItemOn || item.formItemOn"
        v-show="item.show === undefined || item.show()" :prop="item.key">
        <!-- label -->
        <template #label>
          <span v-if="item.labelHelperText" class="title">
            {{item.label}}
            <helper is-gray>
              <template>{{ item.labelHelperText }}</template>
            </helper>
          </span>
        </template>
        <!-- tip -->
        <div class="tip">{{item.tip}}</div>
        <helper is-gray v-if="item.helperText">
          <template>{{ item.helperText }}</template>
        </helper>
        <!-- 表单控件 -->
        <el-select v-if="item.comp==='el-select'" v-model="form[item.key]" v-bind="item.bind">
          <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label" :value="opt.value"> </el-option>
        </el-select>
        <Component v-else :is="item.comp||'el-input'" v-model="form[item.key]" v-bind="item.bind">
        </Component>
      </el-form-item>
    </div>
    <div class="tools">
      <el-button v-for="item in tools" :key="item.type" :icon="Search" @click="item.click">{{item.label}}</el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
const props = defineProps({
  form: {}, // 表单数据
  formRules: {}, // 表单校验规则
  formItems: {},
  labelPosition: {},
  formItemOn: {},
  formItemClick: {},
  inline: {default: false}, 
  tools: {}
});
</script>
<style>
.el-form--inline {
  display: flex;
}
</style>