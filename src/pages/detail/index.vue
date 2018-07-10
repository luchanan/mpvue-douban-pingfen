<template>
  <div class="page-detail" v-if="!loading && (detail.rating && detail.rating.value || detail.null_rating_reason)">
    <div class="top">
      <div class="bg" :style="{background: 'url(' + detail.pic.large + ') scroll no-repeat top center'}"></div>
      <img :src="detail.pic.normal" class="poster" />
      <div class="intro">
        <div class="name ellipsis">{{detail.title}}</div>
        <div class="ename ellipsis">{{detail.original_title}}</div>
        <div v-if="detail.null_rating_reason" class="nullReason">{{detail.null_rating_reason}}</div>
        <div class="weui-flex" v-else>
          <div class="score">{{detail.rating.value}}</div>
          <div class="ratingbar-comment">
            <div><filmStar :rating="detail.rating" :show-score="false"></filmStar></div>
            <div class="comment">{{detail.rating.count}}人评价</div>
          </div>
        </div>
        
      </div>
    </div>
    <section class="wrapper">
      <section class="info">
        <!--{{不支持使用methos}}-->
        <p>{{detail.durations}} {{detail.genres}}</p>
        <p>{{detail.pubdate}}上映 {{detail.countries}}</p>
        <p v-if="detail.directors && detail.directors.length > 0">
          {{detail.directors[0].name}}({{detail.directors[0].roles[0]}}) / {{detail.actors}}
        </p>
        <div class="button-wrapper weui-flex">
          <button type="default" class="weui-btn weui-flex__item" plain="true">想看</button><button v-if="shortCommentParams.type === 'tv'" type="default" class="weui-btn weui-flex__item" plain="true">在看</button><button type="default" class="weui-btn weui-flex__item" plain="true">看过</button>
        </div>
      </section>
      <section class="sum">
        <h1>{{detail.title}}的剧情简介</h1>
        <article>
          {{detail.intro}}
        </article>
      </section>
    </section>
    <short-comment :params="shortCommentParams" :not-show="detail.null_rating_reason && detail.null_rating_reason === '尚未上映' ? true : false"></short-comment>
    <film-comment :params="shortCommentParams"></film-comment>
  </div>
</template>

<script>
import * as API from '@/api'
import shortComment from './shortComment'
import filmComment from './filmComment'
import filmStar from '@/components/film/star'
export default {
  data() {
    return {
      detail: {},
      loading: false,
      shortCommentParams: {id: '', type: 'movie'}
    }
  },
  components: {
    shortComment,
    filmComment,
    filmStar
  },
  mounted () {
    wx.showNavigationBarLoading()
    wx.showLoading()
    this.loading = true
    this.shortCommentParams.id = this.$root.$mp.query.id
    this.shortCommentParams.type = this.$root.$mp.query.type
    this.getDetail()
  },
  methods: {
    getDetail () {
      API.getFilmDetail({id: this.$root.$mp.query.id, type: this.$root.$mp.query.type}).then(res => {
        // 由于{{不支持methods方法和复杂的js表达式}}所以在返回数据的时候处理
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        this.loading = false
        res.data.genres =  res.data.genres.join(' / ')
        res.data.countries =  res.data.countries.join(' / ')
        let actors = []
        let actors3 = (res.data.actors.splice(0, 3))
        actors3.forEach(items => {
          actors.push(items.name)
        })
        res.data.actors = actors.join(' / ')
        this.detail = res.data
        wx.setNavigationBarTitle({
          title: this.detail.title
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/stylus/variable'
  .nullReason
    color $gray
    margin-top 10px
  .page-detail
    font-size 14px
  .button-wrapper
    padding 10px 0
    button
      margin 0
      color orange
      border-color orange
      line-height 1.2
      padding 8px 0
      font-size 14px
      margin-right 10px
      &:last-child
        margin-right 0
  .wrapper
    padding 0 10px
  .sum
    padding-bottom 20px
    h1
      color $gray
      margin-bottom 10px
      font-size 16px
  .info
    margin-top 30px
  .top
    line-height 1.2
    position relative
    .bg
      width 100%
      height 175px
      &:after
        content ''
        position absolute
        left 0
        top 0
        height 100%
        width 100%
        background rgba(0, 0, 0, .6)
    .poster
      position absolute
      height 119px
      width 88px
      top 75px
      left 10px
    .intro
      position absolute
      left 110px
      top 84px
      color $white
      font-size 12px
      .score
        margin-right 5px
        font-size 30px
      .name
        font-size 22px
        padding-right 10px
      .ename
        font-size 22px
        padding 5px 10px 0 0
        max-width 200px
      .weui-flex
        align-items center
</style>
