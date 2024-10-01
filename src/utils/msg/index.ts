import { ElMessage, ElMessageBox } from "element-plus";
import { nextTick } from "vue";
type Topt = {
  plain?: boolean;
  showClose?: boolean;
};
class Message {
  opt = {};
  constructor(_opt: Topt = {}) {
    this.opt = _opt;
  }
  success(message: any = "操作成功") {
    ElMessage({ message, type: "success" });
  }
  warnning(message: any) {
    ElMessage({ message, type: "warning" });
  }
  info(message: any) {
    ElMessage({ message, type: "info" });
  }

  error(message: any) {
    ElMessage({ message, type: "error" });
  }

  closeAll() {
    ElMessage.closeAll();
  }

  alert(msg: string, title = "提示") {
    ElMessageBox.alert(msg, title, {
      confirmButtonText: "确定",
      callback: () => {},
    });
  }
  
  //   ElMessageBox
  confirm(msg: string, title = "提示", opt = {}) {
    ElMessageBox.confirm(msg, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      callback: () => {},
      ...opt,
    });
  }

  del(msg: any, title = "提示", opt = {}) {
    ElMessageBox.confirm(msg, title, {
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      confirmButtonClass: "el-button--danger",
      type: "warning",
      ...opt,
    });
  }

  async countdown(msg: string, title = "提示", opt = { time: 10 }) {
    let time = opt.time;
    let reduce = () => {
      setTimeout(() => {
        let el: any = document.querySelector(".countdown-confirm-btn");
        time--;
        el.innerText = `确定` + (time ? `(${time})` : "");
        if (time > 0) {
          reduce();
          el.classList.add("is-disabled");
        } else {
          el.classList.remove("is-disabled");
          el.removeAttribute("disabled");
        }
      }, 1000);
    };

    ElMessageBox.confirm(msg, title, {
      autofocus: false,
      confirmButtonText: `确定(${time})`,
      cancelButtonText: "取消",
      confirmButtonClass: "countdown-confirm-btn",
      type: "warning",
      ...opt,
    });
    await nextTick();
    let el: any = document.querySelector(".countdown-confirm-btn");
    el.classList.add("is-disabled");
    el.setAttribute("disabled", true);
    reduce();
  }
}
export const Msg = new Message();

// Msg.success()
