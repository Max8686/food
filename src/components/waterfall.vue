<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-show="isloading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
import {throttle} from 'throttle-debounce'
export default {
  name: 'Waterfall',
  data(){
    return {
      isloading:false
    }
  },
  mounted(){
    // 节流
    this.scrollHanle=throttle(500,this.scroll.bind(this))
    window.addEventListener('scroll',this.scrollHanle)
  },
  // 解绑
  destroyed(){
    window.removeEventListener('scroll',this.scrollHanle)
  },
  methods:{
    scroll(){
          if(this.isloading) return
          if(this.$refs.waterfall.getBoundingClientRect().bottom<document.documentElement.clientHeight){
              this.isloading=true
              this.$emit('view')
          }
    },
  }
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>