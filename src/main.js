import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
import iconFont from '@/components/icon-font'
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
import '../static/weui/weui.css'
import '@/stylus/base.styl'

// 全局注册
Vue.component('icon-font', iconFont)

const app = new Vue({
  App
})
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/home/home'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#42BD56', // 顶部导航背景颜色
      navigationBarTitleText: '豆瓣评分',
      navigationBarTextStyle: '#fff' // 顶部导航背景颜色
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#1AAD16',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/home',
          text: '电影',
          iconPath: 'static/images/tabbar/film.png',
          selectedIconPath: 'static/images/tabbar/film_on.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
          iconPath: 'static/images/tabbar/my.png',
          selectedIconPath: 'static/images/tabbar/my_on.png'
        }
      ]
    }
  }
}
