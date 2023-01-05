<template>
  <div class="app-add-form">
    <span v-if="formTitle" class="form-title">
      {{formTitle}}
      <helper v-if="help" class="helper-popper" :title="help" small />
    </span>
    <div class="add-form-content">
      <!-- 表单头部 -->
      <div class="form-item-label">
        <span v-for="item in Array.from(formConfigMap)" v-show="item[1].hasOwnProperty('label')" :key="item[0]"
          :style="{width: item[1].width}">
          <i v-if="item[1].required" class="is-required">*</i>
          {{item[1].label}}
        </span>
      </div>
      <!-- 表单内容 -->
      <div class="add-row-form" v-for="(data, dataIndex) in formData" :key="dataIndex">
        <el-form ref="addForm" :model="data" class="add-column-form" :disabled="disabled" @submit.prevent>
          <!-- 表单配置 -->
          <template v-for="item in Array.from(formConfigMap)">
            <el-form-item :key="item[0]" v-if="displayItemHandle(data, item[1])" :prop="item[0]"
              :rules="getFormRules(dataIndex, item[1])">

              <!-- 下拉选择框 -->
              <el-select v-if="item[1].type==='select'" v-model="data[item[0]]" :style="{width: item[1].width}"
                :placeholder="item[1].placeholder" @change="selectChangeHandle(item[0])">
                <el-option v-for="(option, optionIndex) in item[1].options" :key="optionIndex" v-bind="option">
                </el-option>
              </el-select>

              <!-- 输入框（默认） -->
              <el-input v-else v-model="data[item[0]]" :maxlength="item[1].maxlength" :style="{width: item[1].width}"
                :placeholder="item[1].placeholder"></el-input>

            </el-form-item>
          </template>
        </el-form>
        <i v-if="!disabled" v-show="showRemoveButton" class="remove-form iconfont icon_operate_delete icon-quxiaohuiyi"
          @click="removeFormData(dataIndex)"></i>
        <slot name="formatData" :data="data"></slot>
      </div>
    </div>
    <div v-if="!disabled" class="app-add__operator">
      <el-button v-show="showAddButton" size="mini" class="iconfont icon_add" :type="btnType" :plain="needPlain"
        :disabled="disableAddButton" @click="addFormData">
        {{buttonContent}}
      </el-button>
      <slot name="operate" />
    </div>
  </div>
</template>

<script>
import Helper from "../helper/Helper";
import {
  get,
  find,
  remove,
  pick,
  cloneDeep,
  isArray,
  isNumber,
  isEqual,
  isEmpty,
} from "lodash";

export default {
  components: { Helper },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    formTitle: {
      type: String,
      default: "",
    },
    help: {
      type: String,
      default: "",
    },
    config: {
      type: [Array, Object],
      default: () => [],
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonContent: {
      type: String,
      default: function () {
        return this.$t("@i18n.add.to");
      },
    },
    dataUnique: {
      type: Boolean,
      default: true,
    },
    btnType: {
      type: String,
      default: "primary",
    },
    needPlain: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hasInit: false,

      formConfigMap: new Map(),
      formData: [],
      newRows: {},

      isSingle: false, // 数组格式
      singleProp: "", // 数组格式的prop
      onlySelect: false, // 表单类型为下拉框
      allOptionDisabled: false,

      someDataSet: new Set(), // 重复数据index缓存
    };
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler: function (value) {
        let formConfigMap = new Map(),
          newRows = {};

        this.isSingle = !isArray(value);
        const formatConfig = (data) => {
          data.prop = data.prop || "single";
          data.width =
            typeof data.width === "number" ? `${data.width}px` : data.width;
          data.maxlength = data.maxlength || 128;

          newRows[data.prop] =
            data.defaultValue ||
            (data.type === "select"
              ? get(data, ["options", 0, "value"], "")
              : "");
          formConfigMap.set(data.prop, data);
          return data.prop;
        };

        // 支持数组格式和对象格式
        if (this.isSingle) {
          if (this.value.length) {
            console.error(
              "[AddForm] Config is Object,Please use data in prop."
            );
            return false;
          }
          this.onlySelect = value.type === "select";
          this.singleProp = formatConfig(cloneDeep(value));
        } else {
          cloneDeep(value).forEach((item) => {
            formatConfig(item);
          });
        }

        this.newRows = newRows;
        this.formConfigMap = formConfigMap;
      },
    },
    "config.options": {
      deep: true,
      handler(value) {
        if (value && value.length) {
          this.selectChangeHandle(this.singleProp);
        }
      },
    },
    value: {
      deep: true,
      immediate: true,
      handler: "initFormData",
    },
    data: {
      deep: true,
      immediate: true,
      handler: "initFormData",
    },
    formData: {
      deep: true,
      handler: function (value) {
        this.$emit("input", value);
      },
    },
  },
  computed: {
    showRemoveButton() {
      return this.min !== this.formData.length;
    },
    showAddButton() {
      return this.max !== 1 || this.max !== this.formData.length;
    },
    disableAddButton() {
      return this.max === this.formData.length || this.allOptionDisabled;
    },
  },
  methods: {
    /* 数据初始化 */
    initFormData(value) {
      if (value.length) {
        // 支持数组格式和对象格式
        if (this.isSingle) {
          let singleForm = [];
          value.forEach((item) => {
            singleForm.push({ [this.singleProp]: item });
          });

          this.formData = singleForm;
          this.selectChangeHandle(this.singleProp);
        } else {
          this.formData = value;
        }
      } else if (
        (!this.hasInit || (!this.formData.length && !value.length)) &&
        this.min !== 0 &&
        !isEmpty(this.newRows)
      ) {
        // 初始添加数据
        this.addFormData();
        this.$emit("change");
      }
      this.hasInit = true;
    },

    /* 添加数据 */
    addFormData() {
      if (this.formData.length < this.max) {
        if (this.onlySelect && this.dataUnique) {
          // 单数组下拉框数据特殊处理
          const selectConfig = this.formConfigMap.get(this.singleProp);
          const unSelected = find(selectConfig.options, (x) => !x.disabled);

          this.formData.push({
            [this.singleProp]: unSelected ? unSelected.value : "",
          });
          this.selectChangeHandle(this.singleProp);
        } else {
          // 默认添加数据
          this.formData.push(cloneDeep(this.newRows));
        }

        this.$emit("change");
      } else {
        this.$message.warning(
          this.$t("@i18n.you.can.only.add.max.at", { max: this.max })
        );
      }
    },

    /* 删除数据 */
    removeFormData(dataIndex) {
      if (this.formData.length > this.min) {
        const removeData = this.formData[dataIndex];

        this.$emit("change", removeData);
        this.formData.splice(dataIndex, 1);

        // 单数组下拉框数据特殊处理
        if (this.onlySelect && this.dataUnique) {
          const entries = Object.entries(removeData);
          this.selectChangeHandle(get(entries, [0, 0]));
        }
        this.validateByDataIndex(dataIndex);
      } else {
        this.$message.warning(this.$t("@i18n.please.enter.at.least.min.data"), {
          min: this.min,
        });
      }
    },

    /* 获取有效数据 */
    getFormData() {
      if (this.validateForm()) {
        let formData = cloneDeep(this.formData);

        if (this.isSingle) {
          formData = formData
            .map((item) => item[this.singleProp])
            .filter((x) => x);
        }

        return formData;
      } else {
        return this.isSingle ? this.data : this.value;
      }
    },

    /* 默认添加数据唯一性校验 */
    getFormRules(dataIndex, data) {
      let validateRules = get(cloneDeep(data), "validate", []);
      validateRules = isArray(validateRules) ? validateRules : [validateRules];

      // 自定义校验
      if (
        data.paramValidate &&
        typeof data.paramValidate.validator === "function"
      ) {
        const rowKeys = Object.keys(this.newRows);
        const rowData = pick(this.formData[dataIndex], rowKeys);

        validateRules.push({
          validator: (rule, value, callback) =>
            data.paramValidate.validator(rule, value, callback, {
              rowData,
              rowIndex: dataIndex,
              rowFormRef: this.$refs["addForm"][dataIndex],
            }),
          trigger: data.paramValidate.trigger || ["change", "blur"],
        });
      }

      // 数据唯一性校验
      if (this.dataUnique) {
        validateRules.push({
          validator: (rule, value, callback) =>
            this.checkDataUnique(rule, value, callback, dataIndex),
          trigger: data.options && data.options.length ? "change" : "blur",
        });
      }

      return validateRules;
    },

    /* 验证数据唯一性 */
    checkDataUnique(rule, value, callback, dataIndex) {
      const rowKeys = Object.keys(this.newRows);
      const rowData = Object.values(pick(this.formData[dataIndex], rowKeys));

      let filterData = [],
        hasSomeData = false;
      // 过滤已填写数据
      this.formData.forEach((item, index) => {
        const validData = Object.values(pick(item, rowKeys));
        const allFill =
          Object.values(validData).filter((x) =>
            [null, undefined, ""].includes(x)
          ).length === 0;
        // 需要考虑Number和字符串Number
        if (
          allFill &&
          item[rule.field] == value &&
          isEqual(validData.join(), rowData.join())
        ) {
          filterData.push({ index, data: JSON.stringify(validData) });
        }
      });

      // 判断当前数据是否重复
      if (filterData.length > 1) {
        this.someDataSet.add(filterData.map((x) => x.index));
        hasSomeData = true;
      } else {
        this.validateByDataIndex(dataIndex);
      }

      hasSomeData
        ? callback(new Error(this.$t("@i18n.duplicate.data")))
        : callback();
    },

    /* 下拉选项数据唯一性处理 */
    selectChangeHandle(prop) {
      const formConfigMap = new Map(this.formConfigMap);
      let selectConfig = formConfigMap.get(prop),
        disabledCount = 0;

      if (selectConfig.type === "select" && this.isSingle && this.dataUnique) {
        const currentSelect = this.formData.map((x) => x[prop]);

        selectConfig.options.forEach((item) => {
          const isDisabled = currentSelect.includes(item.value);

          disabledCount += isDisabled ? 1 : 0;
          item.disabled = isDisabled;
        });

        formConfigMap.set(prop, selectConfig);
        this.formConfigMap = formConfigMap;
        this.allOptionDisabled =
          !!selectConfig.options.length &&
          disabledCount === selectConfig.options.length;
      }
    },

    /* 表单项显隐 */
    displayItemHandle(row, config) {
      // eslint-disable-next-line no-prototype-builtins
      if (config.hasOwnProperty("display")) {
        const display =
          typeof config.display === "function"
            ? config.display(row)
            : config.display;
        if (!display) {
          this.$set(row, config.prop, "");
        }
        return display;
      } else {
        return true;
      }
    },

    /* 表单验证相关 */
    validateForm() {
      if (this.$refs["addForm"] && this.$refs["addForm"].length > 0) {
        let validate = true;
        this.$refs["addForm"].map((item) => {
          item.validate((valid) => {
            if (!valid) {
              validate = false;
            }
          });
        });

        return validate;
      } else {
        return true;
      }
    },

    validateByDataIndex(dataIndex) {
      const someDateIndex = this.findSomeDataMapKey(dataIndex);
      if (someDateIndex && someDateIndex.length) {
        const newArray = cloneDeep(someDateIndex);
        this.someDataSet.delete(someDateIndex);

        if (
          !this.isSingle &&
          this.$refs["addForm"] &&
          this.$refs["addForm"][dataIndex]
        ) {
          this.$refs["addForm"][dataIndex].clearValidate();
        }

        remove(newArray, (x) => x === dataIndex);
        this.someDataSet.add(newArray);
        for (let index of newArray) {
          if (this.$refs["addForm"] && this.$refs["addForm"][index]) {
            this.$refs["addForm"][index].validate(() => {});
          }
        }
      }
    },

    findSomeDataMapKey(index) {
      if (isNumber(index) && this.someDataSet.size) {
        for (let key of this.someDataSet) {
          if (key.includes(index)) {
            return key;
          }
        }
      } else {
        return [];
      }
    },
  },
};
</script>
<style lang="scss">
.app-add-form {
  max-width: 780px;
  margin-bottom: 24px;

  .form-title {
    display: block;
    font-weight: bold;
    margin: 0 0 10px 0;
    font-size: 14px;
    color: $--font-color-black;
  }
  .add-form-content {
    margin-right: 20px;
    .form-item-label {
      color: #888888;
      display: flex;
      margin-bottom: 8px;

      .is-required {
        color: #ff5050;
        margin-right: 4px;
      }

      span + span {
        margin-left: 20px;
      }
      span {
        flex: none;
      }
    }

    .add-row-form {
      display: flex;
      align-items: center;
      /*flex-wrap: wrap;*/
      .remove-form {
        display: block;
        cursor: pointer;
        font-size: 20px;
        color: #f54849;
        margin-bottom: 8px;
      }
    }
    .add-column-form {
      display: flex;
      align-items: center;
      .el-form-item {
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
    .el-form-item__error {
      top: 75%;
    }
  }

  .el-select,
  .el-input {
    height: 32px;
    margin-bottom: 16px;
  }
  .el-input__inner {
    height: 32px;
  }
  .el-button {
    font-size: 14px;
  }
}
</style>
