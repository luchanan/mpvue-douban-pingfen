<template>
  <div class="page-home">
    <searchBars></searchBars>
    <film-items-wrapper :list-api="item.listApi" :title="item.title" v-for="(item, index) in items" :key="index" />
  </div>
</template>

<script>
import FilmItemsWrapper from '@/components/film/wrapper'
import searchBars from '@/components/film/search'
export default {
  data() {
    return {
      items: [
        {title: '近期上映', listApi: 'movie_showing'},
        {title: '热门电影', listApi: 'movie_hot_gaia'},
        {title: '电视剧', listApi: 'tv_hot'},
        {title: '综艺', listApi: 'tv_variety_show'},
      ]
    }
  },
  components: {
    FilmItemsWrapper,
    searchBars
  },
  onShareAppMessage () {
    // https://developers.weixin.qq.com/miniprogram/dev/api/share.html?search-key=%E5%88%86%E4%BA%AB
    // 导航...点击, 转发分享
    return {
      title: 'github',
      path: 'https://github.com/luchanan/mpvue-douban-pingfen',
      imageUrl: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
</style>
