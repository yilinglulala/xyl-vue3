const fs = require("fs");
const path = require("path");
const root = path.join(__dirname);

// readDir(root)
/**
 * 目录遍历
 * @param {目录路径} path
 * @param {是目录回调} dirCb
 * @param {是文件回调} fileCb
 */
function readDir(path, dirCb, fileCb, { deep = true } = {}) {
  console.log("parh", path);
  fs.readdir(path, function (err, menu) {
    if (!menu) return;
    menu.forEach(function (ele) {
      const srcPath = path + "/" + ele;
      const destPath = path.join(path, ele).replace("tools", "tools2");
      fs.stat(path + "/" + ele, function (err, info) {
        // 是文件夹继续遍历
        if (info.isDirectory()) {
          console.log("dir: " + ele);
          dirCb && dirCb(destPath);
          console.log(222, destPath)
          deep && readDir(srcPath);
        } else {
          console.log("file: " + ele);
          fileCb && fileCb();
          fs.copyFile(srcPath, destPath, (e) => {
            console.log("e", e);
          });
        }
      });
    });
  });
}
copyDir(root);
function copyDir() {
  const dirCb = (path) => {
    fs.mkdir(path, ()=>{});
  };
  readDir(root, dirCb);
}
