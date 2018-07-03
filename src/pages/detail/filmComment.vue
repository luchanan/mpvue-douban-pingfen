<template>
  <div class="film-comment">
    <h2>影评({{detail.total}})</h2>
    <ul>
      <li v-for="(items, index) in detail.reviews" :key="index">
        <div class="content">{{items.title}}</div>
        <div class="weui-flex"><span class="name">{{items.user.name}}</span> <filmStarTwo :rating="items.rating" :show-score="false" /> <span class="useful">{{items.likers_count}}有用</span></div>
      </li>
    </ul>
    <div class="getMore">查看更多影评</div>
  </div>
</template>

<script>
import * as API from '@/api'
import filmStarTwo from '@/components/film/star'
export default {
  data() {
    return {
      detail: {
        total: 0,
        reviews: []
      }
    }
  },
  props: {
    params: {
      type: Object
    }
  },
  watch: {
    'params.id': {
      handler (val, oldVal) {
        this.getFilmComment()
      },
      deep: true
    }
  },
  components: { filmStarTwo },
  mounted () {
    this.getFilmComment()
  },
  methods: {
    getFilmComment () {
      API.getFilmComment({id: this.params.id}).then(res => {
        this.detail = Object.assign({}, this.detail, res.data)
        console.log(this.detail, `${this.params.type}影评`)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/stylus/variable'
  @import '~@/stylus/onePx'
  .film-comment
    font-size 14px
    .content
      padding 0 0 5px 0
    h2
      padding 0 10px 0 10px
      color $gray
    .name
      font-size 12px
      margin-right 10px
    .useful
      color $gray
      font-size 12px
    ul
      padding 0 10px
      li
        padding 10px 0 10px 0
        setBottomLine()
        &:last-child:after
          border none
    .getMore
      text-align center
      padding 20px 0 30px 0
      color $green
</style>
