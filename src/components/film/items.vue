<template>
  <ul :class="useFloat ? 'film-items film-items-float clearfix' : 'film-items clearfix'">
    <li v-for="(filmItem, filmIndex) in list" :key="filmIndex">
      <navigator v-if="filmItem.id" :url="'/pages/detail/detail?id=' + filmItem.id + '&type=' + filmItem.type" hover-class="navigator-hover">
        <div class="thumbnail">
          <img :src="filmItem.cover.url">
        </div>
        <div class="film-title ellipsis">{{filmItem.title}}</div>
        <film-star :rating="filmItem.rating" :show-text="filmItem.null_rating_reason ? filmItem.null_rating_reason : '暂无评分'" />
      </navigator>
    </li>
  </ul>
</template>

<script>
import * as API from '@/api'
import filmStar from './star'
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
  components: { filmStar },
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
        console.log(this.list, `${this.listApi}列表接口`)
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
  .film-title
    font-size 15px
    padding 5px 0 0 0
    text-align left
</style>
