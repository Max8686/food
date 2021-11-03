<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
    >
    <img v-if="imageUrl" :src="imageUrl"  class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  props:{
    action:String,
    maxSize:{
      type:Number,
      default:2
    },
    imageUrl:{
      type:String,
      default:''
    },
    imgMaxWidth:{
      type:[Number,String],
      default:'auto'
    }
  },
  data(){
    return {

    }
  },
  methods: {
    // 图片上传之后
      handleAvatarSuccess(res, file) {
        console.log(file);
        console.log(res);
        
        this.$emit('res-url',
          URL.createObjectURL(file.raw)
        )
         console.log('上传成功');
      },
      // 图片上传之前
      beforeAvatarUpload(file) {
        console.log(this.imageUrl);
       // 限制图片的类型
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
         // 限制图片的大小
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPEG PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!');
        }
        return isJPG &&isLt2M
      }
    }
}
</script>
<style scoped>
img{
  width: 200px;
}
</style>