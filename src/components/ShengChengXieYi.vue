<template>
  <div class="container mx-auto">
    <div>

      <div class="outputword">
        <h2 class="py-2">离婚协议书 <el-button class="text-right" @click="GoBasicInformationPage">返回修改</el-button></h2>
        <div class="w-full">
          <div class="text-left msg">
            {{outputWord}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  
  export default {
      data () {
          return {
           outputWord: ''
          }
      },
      name: 'WenJuan2',
      
      mounted () {
        this.GetOutPutWord () // 获取离婚协议书
      },
      methods: {
        GetOutPutWord () {
          localStorage.setItem('qid',5)
          outPutWord().then((data)=>{
            this.outputWord = data.data
          }).catch((data)=>{

          })
        },
        GoBasicInformationPage(){
           this.$router.replace("/BasicInformation");
        }
      }
    }
</script>
<style scoped>
.outputword .msg{text-indent:2em;white-space:pre-wrap;}
</style>
