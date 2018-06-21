<template>
  <div>
    <navigator url="/pages/search/search" class="search weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" placeholder="搜索" />
        </div>
        <label class="weui-search-bar__label">
          <icon class="weui-icon-search" type="search" size="14"></icon>
          <div class="weui-search-bar__text">搜索</div>
        </label>
      </div>
    </navigator>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/stylus/variable'
  .search
    background-color $green
    border none
</style>
