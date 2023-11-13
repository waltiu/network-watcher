var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var network_watcher_exports = {};
__export(network_watcher_exports, {
  default: () => network_watcher_default
});
module.exports = __toCommonJS(network_watcher_exports);
var request = (imgUrl, timeout) => {
  return new Promise((resolve) => {
    let imgRef = null;
    let isRespond = false;
    imgRef = document.createElement("img");
    imgRef.onerror = () => {
      isRespond = true;
      resolve(false);
      return "";
    };
    imgRef.onload = () => {
      isRespond = true;
      resolve(true);
      return "";
    };
    imgRef.src = `${imgUrl}?time=${(/* @__PURE__ */ new Date()).toLocaleString()}`;
    if (timeout) {
      setTimeout(() => {
        if (!isRespond) {
          resolve(false);
        }
      }, timeout);
    }
  });
};
var checkNetwork = (imgUrl, callback, options) => {
  const { interval = 3e4, timeout, errorTime } = options || {};
  const timer = setInterval(async () => {
    const status = await request(imgUrl, timeout);
    if (!status) {
      request(imgUrl, errorTime || timeout);
    }
    callback(status);
  }, interval);
  return timer;
};
var network_watcher_default = checkNetwork;
