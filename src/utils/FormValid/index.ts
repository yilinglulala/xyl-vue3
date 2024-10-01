import * as RE from "./RE";
const trigger = ["blur", "change"];

export function creValidator(arr: any[]) {
  return {
    validator: (rule: any, v: any, callback: Function) => {
      let error = "";
      for (let i in arr) {
        let { reg, msg = "格式错误", testFn } = arr[i];
        if (testFn ? testFn(v) : reg?.test(v)) {
          error = msg;
          break;
        }
      }
      if (error) {
        callback(new Error(error));
      } else {
        callback();
      }
    },
    trigger,
  };
}

export const checkEmpty = creValidator([{ reg: RE.Empty, msg: "必填" }]);
