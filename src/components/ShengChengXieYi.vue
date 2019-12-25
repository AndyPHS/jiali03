<template>
  <div class="container mx-auto">
    <div>

      <div class="outputword shadow-md  mt-5 relative">
        <h2 class="py-2 text-xl">离婚协议书</h2>
        <div class="absolute top-0 right-0 mt-2 mr-2">
          <el-button class="text-right" type="primary" @click="GoBasicInformationPage">返回修改</el-button>
        </div>
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
.outputword{padding:10px;border:1px solid #ecf5ec;}
.outputword h2{border-bottom: 1px solid #dbe2db;}
.outputword .msg{text-indent:2em;white-space:pre-wrap;}
</style>
