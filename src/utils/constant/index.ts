/*
 * @Description: 常量
 */
import { get } from "lodash";
import * as source from "./source";

class Constant {
  source = {};
  constructor(data: {}) {
    this.source = data;
  }

  getText(path: any, key: string | number) {
    return get(this.source, path)[key];
  }

  getOption(path: any) {
    let item = get(this.source, path);
    let opts: { key: string; value: any }[] = [];
    Object.keys(item).forEach((key) => {
      let value = item[key];
      opts.push({ key, value });
    });
    return opts;
  }
}
export const CONSTANT = new Constant(source);
