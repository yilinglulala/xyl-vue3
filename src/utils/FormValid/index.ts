import * as RE from "./RE";
const trigger = ["blur", "change"];

export const checkEmpty = {
  validator: (v: any, rule: any, callback: Function) => {
    if (v.test(RE.Empty)) {
      callback();
    } else {
      callback(new Error("必填"));
    }
  },
  trigger,
};

const checkName = {
  validator: (_value: any, rule: any) => {},
  trigger,
};
