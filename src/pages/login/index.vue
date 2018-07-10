<template>
  <div class="page-login">
    <div class="page__hd page__bd_spacing">
      <button class="weui-btn" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
    bindGetUserInfo (e) {
      console.log(e)
      wx.navigateBack()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
