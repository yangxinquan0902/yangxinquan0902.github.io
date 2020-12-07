<template>
  <div class="home">
    <section class="homeKey">
      <h2>首页魔方key查询</h2>

      <div class="content">
        <div class="condition">
          <span @click="getCityByCityName">选择环境：</span>
          <select @change="selectEnv" name="env" id="env">
            <option value="si">dev</option>
            <option value="si">si</option>
            <option value="st">st</option>
            <option value="prod">prod</option>
          </select>

          <span class="cityIdTxt">选择城市：</span>
          <!-- <input @input="getCity" class="cityId" type="text" placeholder="请输入城市ID"> -->
          <select @change="selectCity" class="cityId" name="city" id="city">
            <option v-for="(item, index) in cityList" :key="index" :value="item.cityId">{{item.cityName}}</option>
          </select>

          <button @click="goHandle" class="go">查询</button>

          <ul class="showList">
            <li v-for="(item, index) in magicList" :key="index">位置：<span>{{index + 1}}</span>, &nbsp;&nbsp;&nbsp;&nbsp; 组件名称：<span>{{item.name}}</span>, &nbsp;&nbsp;&nbsp;&nbsp; 组件的key: <span>{{item.key}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <b @click="copyURL(item.key)">复制key</b></li>
          </ul>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { getMagicDate, widgetNameSpace, getCityList } from '../utils';

import { 
  reactive, 
  toRefs,
  onMounted
} from 'vue';

export default {
  name: 'Home',
  setup(props, ctx){
    const state = reactive({
      // 环境, 默认是dev
      env: 'dev',
      // 城市id, 默认是安宁区
      cityId: 2383,
      // 城市列表
      cityList: [],
      // 魔方数据列表
      magicList: [],
    });

    // 获取城市列表回调
    const getListCB = (res)=>{
      state.cityList = [];
      res.context.forEach((item)=>{
        item.menuItem.forEach(level=>{
          state.cityList.push({
            cityId: level.ecejCityId,
            cityName: level.cityName
          });
        });
      });
    };

    // 生命周期函数
    onMounted(()=>{
      getCityList('dev', getListCB);
    });

    // 选择环境
    const selectEnv = (e)=>{
      state.env = e.target.value;
      getCityList(state.env, getListCB);
    };

    // // 获取cityId
    // const getCity = (e)=>{
    //   state.cityId = e.target.value;
    // };

    // 选择cityId
    const selectCity = (e)=>{
      state.cityId = e.target.value;
    };

    // 处理请求数据
    const dataHandle = (res)=>{
      // 先清空
      state.magicList = [];

      const title = res && res.data && res.data.title || '';
      const data = res && res.data && res.data.configOrder && res.data.configOrder.children || [];
      data.forEach((item, index)=>{
        state.magicList.push({
          name: widgetNameSpace[item['widgetNameSpace']],
          key: item.props.key
        });
      });
    };

    // 查询
    const goHandle = ()=>{
      if(state.cityId){
        const url = `/magic/d2cStore/000000/weixin/index?cityId=${state.cityId}`;
        getMagicDate(state.env, url, dataHandle);
      }
    };

    // 复制文本
    const copyURL = (txt)=>{
      const el = document.createElement('textarea');
      el.value = txt;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert(`复制成功, 当前的key是：${txt}`);
    };

    return {
      ...toRefs(state),
      selectEnv,
      selectCity,
      goHandle,
      copyURL,
    }
  }
}
</script>

<style>
  .home {
    width: 600px;
    margin: 20px auto;
  }

  .home h2 {
    text-align: center;
  }

  #env {
    width: 80px;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
  }

  .homeKey .content {
    margin-top: 20px;
  }

  .homeKey .cityIdTxt {
    margin-left: 20px;
  }

  .homeKey .cityId{
    width: 160px;
    height: 28px;
    font-size: 14px;
    padding-left: 10px;
  }

  .homeKey .go{
    width: 80px;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
    margin-left: 20px;
    background: #00CC66;
    color: #fff;
    border: none;
  }

  .homeKey .showList {
    margin-top: 20px;
  }

  .homeKey .showList li {
    font-size: 14px;
    padding: 5px 0;
  }

  .homeKey .showList li span{
    color: purple;
    font-weight: bold;
  }

  .homeKey .showList li b {
    color: green;
    cursor: pointer;
  }

</style>