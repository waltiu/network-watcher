const request = (imgUrl, timeout) => {
  return new Promise((resolve) => {
    let imgRef = null;
    let isRespond = false;
    imgRef = document.createElement('img');
    imgRef.onerror = () => {
      isRespond = true;
      resolve(false);
      return '';
    };
    imgRef.onload = () => {
      isRespond = true;
      resolve(true);
      return '';
    };
    imgRef.src = `${imgUrl}?time=${new Date().toLocaleString()}`;
    if (timeout) {
      setTimeout(() => {
        if (!isRespond) {
          resolve(false);
        }
      }, timeout);
    }
  });
};

type CheckNetworkOptionsType = {
  interval: number; // 循环时间 单位ms
  timeout: number; // 请求超时时间 单位ms
};

type CheckNetworkType = (
  imgUrl: string, // 图片url
  callback: (isOnline: boolean) => void,  // 回调，返回网络是否在线
  options?: CheckNetworkOptionsType, // 配置项
) => void;

const checkNetwork: CheckNetworkType = (imgUrl, callback, options) => {
  const { interval = 30_000, timeout } = options || {};
  setInterval(async () => {
    const status = (await request(imgUrl, timeout)) as boolean;
    callback(status);
  }, interval);
};

export default checkNetwork