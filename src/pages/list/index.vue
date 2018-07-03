<template>
  <div class="page-list">
    <search-bar></search-bar>
    <items :key="1" ref="items" :pass-params="passParams" :list-api="listApi" :useFloat="true" @loading="loading" @complete="complete"></items>
    <div class="weui-loadmore" :class="itemLoding ? 'hide' : ''">
      <div class="weui-loading" v-if="hasMore"></div>
      <div class="weui-loadmore__tips">{{hasMore ? '正在加载' : '没有更多了'}}</div>
    </div>
  </div>
</template>

<script>
import * as API from '@/api'
import items from '@/components/film/items'
import searchBar from '@/components/film/search'
export default {
  data () {
    return {
      listApi: '',
      title: '',
      itemLoding: true,
      hasMore: true,
      passParams: {
        start: 0
      }
    }
  },
  components: {
    items,
    searchBar
  },
  onShareAppMessage () {
    // 导航...点击
  },
  onReachBottom () {
    // 页面上拉触底事件的处理函数
    if (!this.itemLoding && this.hasMore) {
      this.passParams.start += 20
      this.$refs.items.getFilm()
    }
  },
  onLoad (options) {
    this.title = options.title
    this.listApi = options.listApi
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  methods: {
    complete (params) {
      this.itemLoding = false
      this.hasMore = params.hasMore
    },
    loading (params) {
      this.itemLoding = true
    },
  }
}
</script>

<style lang="stylus" scoped>
  .weui-loadmore
    padding 0 0 10px 0
</style>
