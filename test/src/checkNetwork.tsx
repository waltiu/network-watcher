import { notification } from 'antd';
import checkNetwork from "../../index";

const init = async () => {
  let previousStatus = true;
  checkNetwork(
    'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png',
    (currentStatus) => {
      if (!previousStatus || !currentStatus) {
        notification.open({
          key: '网络监测',
          message: currentStatus ? (
            '网络已恢复！'
          ) : (
            <span>
              网络异常，可能会对后台造成影响
              <br />
              请检查网络!
            </span>
          ),
          duration: currentStatus ? 2 : 0,
        });
        previousStatus = currentStatus;
      }
    },
    {
      interval:3000,
      timeout: 1000,
    },
  );
};
export default init;
