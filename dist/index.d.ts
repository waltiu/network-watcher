type CheckNetworkOptionsType = {
    interval: number;
    timeout: number;
};
type CheckNetworkType = (imgUrl: string, // 图片url
callback: (isOnline: boolean) => void, // 回调，返回网络是否在线
options?: CheckNetworkOptionsType) => void;
declare const checkNetwork: CheckNetworkType;

export { checkNetwork as default };
