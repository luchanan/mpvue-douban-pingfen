<template>
  <div class="page-my">
    <div class="info">
      <image class="img" :src="imgSrc"/>
      <navigator v-if="hideLogin" class="login weui-flex" url="/pages/login/login" hover-class="navigator-hover"><icon-font iconClass="loginin" iconColor="#fff" />登录</navigator>
      <div class="nick-name">{{nickName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideLogin: true,
      nickName: '未登录',
      imgSrc: '/static/images/default.png'
    }
  },
  onShow () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权登录
          console.log('已授权登录')
          let uInfo = wx.getStorageSync('getUserInfoSuccess')
          console.log(uInfo, 'uInfo')
          if (uInfo) {
            uInfo = JSON.parse(uInfo)
            this.nickName = uInfo.nickName 
            this.imgSrc = uInfo.avatarUrl 
            return
          }
          wx.showNavigationBarLoading()
          wx.getUserInfo({
            success: (res) => {
              this.nickName = res.userInfo.nickName 
              this.imgSrc = res.userInfo.avatarUrl 
              wx.hideNavigationBarLoading()
              wx.setStorageSync('getUserInfoSuccess', JSON.stringify(res.userInfo))
              console.log(res)
            }
          })
          this.hideLogin = false
        } else {
          // 引导用户登录授权
          console.log('尚未授权登录')
          wx.removeStorageSync('getUserInfoSuccess')
          this.nickName = '未登录' 
          this.imgSrc = '/static/images/default.png'
          // wx.navigateTo({url: '/pages/login/login'})
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/stylus/variable'
  @import '~@/stylus/onePx'
  .page-my
    .info
      background url('~@/images/bg.png')
      height 170px
      background-size cover
      text-align center
      padding 30px 0 0 0
      position relative
      .nick-name
        font-size 24px
        color $white
        margin-top 10px
      .img
        width 100px
        height 100px
        border-radius 50%
      .login
        position absolute !important
        right 15px
        top 15px
        setLine($white)
        color $white
        background rgba(255, 255, 255, .1)
        padding 2px 8px
        text-align center
        align-items center
        font-size 12px
        >>> .iconfont
          margin-right 5px
</style>
