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
  retry:number  // 请求失败时，间隔几秒重试
};

type CheckNetworkType = (
  imgUrl: string, // 图片url
  callback: (isOnline: boolean) => void,  // 回调，返回网络是否在线
  options?: CheckNetworkOptionsType, // 配置项
) => void;

const checkNetwork: CheckNetworkType = (imgUrl, callback, options) => {
  const { interval = 30_000, timeout, retry } = options || {};
  const timer = setInterval(async () => {
    const status = (await request(imgUrl, timeout)) as boolean;
    let retryTimer = null
    if (!status) {
      retryTimer = setInterval(async () => {
        const retryStatus = (await request(imgUrl, retry || timeout)) as boolean
        if (retryStatus) {
          clearInterval(retryTimer)
        }
        callback(retryStatus);
      }, retry || timeout)
    } else {
      clearInterval(retryTimer)
    }
    callback(status);
  }, interval);
  return timer
};

export default checkNetwork