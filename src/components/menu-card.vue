<template>
  <el-row class="menu-card" type="flex" justify="start">
    <el-col style="flex:none;" :style="{'margin-left':marginLeft+'px'}" v-for="item in info" :key="item.id">
      <el-card :body-style="{ padding: '0px' }" >
        <router-link :to="{name:'detail',query:{menuId:item._id}}">
          <img :src="item.product_pic_url" class="image" style="width: 232px;height: 232px;">
          <div style="padding: 14px;" class="menu-card-detail">
            <strong>菜品名称:{{item.title}}</strong>
            <span>{{item.comments_len}} 评论</span>
            <router-link :to="{name:'space',query:{userId:item.userId}}" tag="em">
            作者:{{item.name}}
            </router-link>
          </div>
        </router-link> 
      </el-card>
      <!-- <router-link :to="{name:'car'}"> -->
        <button @click="add(item, 'PLUS')">加入购物车</button>
      <!-- </router-link> -->
      
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'menu-card',
  props:{
    marginLeft: {
      type: Number,
      default: 22
    },
    info:{
      type: Array,
      default:() => []
    },
  },
  methods:{
    add(item, _type){
      this.$store.dispatch("USER_INFO", {
        _id: item._id,
        title: item.title,
        product_pic_url: item.product_pic_url,
        name: item.name,
        comments_len:item.comments_len,
        _type,
      });
    },
  }
}
</script>


<style lang="stylus">
.menu-card 
  flex-wrap wrap
  .el-col-24
    width auto
    margin-bottom 20px
    margin-left: 22px
    
  .menu-card-detail
    > *
      display block
    strong 
      height 24px
      line-height 24px
      font-size 14px
      font-weight bold
      color #333
    span 
      height 26px
      line-height 26px
      font-size 12px
      color #999
    em 
      height 23px
      line-height 23px
      font-size 12px
      color #ff3232
</style>


