<template>
  <ul :class="useFloat ? 'film-items film-items-float clearfix' : 'film-items clearfix'">
    <li v-for="(filmItem, filmIndex) in list" :key="filmIndex">
      <navigator v-if="filmItem.id" :url="'/pages/detail/detail?id=' + filmItem.id" hover-class="navigator-hover">
        <div class="thumbnail">
          <img :src="filmItem.cover.url">
        </div>
        <div class="film-title ellipsis">{{filmItem.title}}</div>
        <!--评分可以抽出-->
        <div class="film-star weui-flex">
          <div class="star-wrapper weui-flex" v-if="filmItem.rating && filmItem.rating.value">
            <div class="weui-flex" :style="{width: (filmItem.rating.value / filmItem.rating.max) * 100 + '%', overflow: 'hidden'}">
              <icon-font v-for="items in stars" iconColor="#F4F429" :key="items" iconClass="star"/>
            </div>
            <div class="weui-flex">
              <icon-font v-for="items in stars" :key="items" iconClass="star"/>
            </div>
          </div>{{filmItem.rating && filmItem.rating.value ? filmItem.rating.value : '暂无评分'}}
        </div>
        <!--评分可以抽出-->
      </navigator>
    </li>
  </ul>
</template>

<script>
import * as API from '@/api'
export default {
  data () {
    return {
      stars: [1, 2, 3, 4, 5],
      list: [],
      page: {
        current: 0, // 当前页数
        size: 20, // 每页多少条数据
        total: 0 // 总共多少页
      },
      loading: false
    }
  },
  props: {
    listApi: {
      type: String,
      require: true
    },
    useFloat: {
      type: Boolean,
      default: false
    },
    passParams: {
      type: Object,
      default: function () {
        return { count: 7 }
      }
    }
  },
  watch: {
    listApi () {
      this.page.current = 0
      this.page.total = 0
      this.list = []
      this.passParams.start = 0
      this.getFilm()
    }
  },
  mounted () {
    this.getFilm()
  },
  methods: {
    getFilm () {
      this.loading = true
      this.$emit('loading', {loading: this.loading})
      this.page.current += 1
      API.getFilm({listApi: this.listApi, data: this.passParams}).then(res => {
        this.list = this.list.concat(res.data.subject_collection_items)
        this.loading = false
        this.page.total = Math.ceil(res.data.total / this.page.size)
        this.$emit('complete', {loading: this.loading, hasMore: this.hasMore()})
      })
    },
    hasMore (total) {
      if (this.page.current >= this.page.total) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .film-items
    padding 0 0 0 0
    white-space nowrap
    li
      display inline-block
      padding 0 0 15px 10px
      width 100px
      &:last-child
        margin-right 10px
    .thumbnail
      width 100%
      height 140px
      img
        max-width 100%
        max-height 100%
    &.film-items-float
      white-space pre
      display flex
      flex-wrap wrap
      navigator
        width 100px
        display inline-block
      li
        padding 10px 0 0 0
        text-align center
        width 33.33333%
        &:last-child
          margin-right 0
  .film-star
    color #afafaf
    font-size 12px
    .star-wrapper
      position relative
      .weui-flex
        &:first-child
          position absolute
          top 0
          left 0
        &:last-child
          margin-right 5px
  .film-title
    font-size 15px
    padding 5px 0 0 0
    text-align left
</style>
