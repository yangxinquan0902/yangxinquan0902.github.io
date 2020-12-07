import axios from 'axios';

// 处理首页的魔方组件
export const widgetNameSpace = {
    // 轮播图
    '@wanmi/wechat-slider': '轮播动图',
    '@wanmi/wechat-title': '标题DIY',
    '@wanmi/wechat-nav': '百变导航',
    '@wanmi/wechat-freelayout': '自定义',
    '@wanmi/wechat-goodslist': '商品列表',
    '@wanmi/wechat-hotarea': '万能热区',
    '@wanmi/wechat-notice': '公告',
    '@wanmi/wechat-richtext': '富文本',
    '@wanmi/wechat-blank': '辅助线'
};

// 选择环境
const config = {
  si: {
    magicHost: 'https://sieapp-render.ecej.com',
    marketHost: 'https://siemobilebff.ecej.com'
  },
  st: {
    magicHost: 'https://steapp-render.ecej.com',
    marketHost: 'https://stemobilebff.ecej.com'
  },
  prod: {
    magicHost: 'https://eapp-render.ecej.com',
    marketHost: 'https://emobilebff.ecej.com'
  },
  default: {
    magicHost: 'https://sieapp-render.ecej.com',
    marketHost: 'https://siemobilebff.ecej.com'
  }
};


// 获取城市信息
export const getCityList = (env, cb)=>{
  const baseUrl = config[env] || config['default'];
  axios(`${baseUrl.marketHost}/city/list-sort-initial`, {
    method: 'POST',
    data: {
      reqId: getUuid()
    }
  }).then((res)=>{
    if(res.status === 200){
      cb && cb(res.data);
    }
  })
};
// 获取magic数据
export const getMagicDate = (env, requestUrl, cb)=>{
  const baseUrl = config[env] || config['default'];
  axios.get(`${baseUrl.magicHost}${requestUrl}`)
  .then((res)=>{
    if(res.status === 200){
      cb && cb(res.data)
    }
  })
};

// uuid
export const getUuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
};

