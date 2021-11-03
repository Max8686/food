<template>
  <div class="menu-detail">
    <detail-header :info="menuInfo"></detail-header>
    <detail-content :info="menuInfo"></detail-content>
    <Comment :info="menuInfo"></Comment>
  </div>
</template>
<script>
import DetailHeader from './detail-header'
import DetailContent from './detail-content'
import Comment from './comment'
import {menuInfo} from '@/service/api';
export default {
  components: {DetailHeader, DetailContent, Comment},
  data(){
    return {
      menuInfo:[]
    }
  },
  
watch:{
    $route:{
      handler(){
        //获取参数
        let {menuId} = this.$route.query;
        if(menuId){//发布请求
            menuInfo({menuId}).then(({data})=>{
              //将请求到的数据赋值给data里面定义的数组
              this.menuInfo=data.info;
              // console.log(this.menuInfo);
            })
        }else{
          // 如果没有参数，就警示用户
          this.$message({
            showClose:true,
            message:'请重新进入',
            type:'warning'
          })
        }
      },
      // 初始化监听
      immediate:true
    }
  }
}
</script>
