<template>
  <div class="container mx-auto">
    <div>

      <div class="outputword rounded-lg shadow-lg mt-5 relative">
        <h2 class="py-2 text-xl">离婚协议书</h2>
        <div class="absolute top-0 right-0 mt-2 mr-2">
          <el-button class="text-right" type="primary" @click="GoBasicInformationPage">返回修改</el-button>
        </div>
        <div class="w-full">
          <div class="text-left px-2 py-2 msg">
            <div v-if="this.status_code ==330">
              <h2>以下<span class="text-red-500">必填项</span>未填写，请<span  @click="GoBasicInformationPage" class="text-blue-600">返回继续填写</span></h2>
              <ul>
                <li v-for="(item, index) in missField" :key="index">{{index+1}}、{{item.problemTitle}}</li>
              </ul>
            </div>
            <div v-if="this.status_code ==200">
              {{outputWord}}
            </div>
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
           outputWord: '',  // 获取离婚协议书
           status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
           missField: [] // 未填写项目
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
            this.status_code = data.data.status_code
            if(this.status_code == 330 ){
                this.missField = data.data.data
                console.log(this.missField)
            }else if(this.status_code == 200){
                this.outputWord = data.data.data
            }
          }).catch((data)=>{
              this.$router.replace("/");
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
.outputword>h2{border-bottom: 1px solid #dbe2db;}
.outputword .msg{white-space:pre-wrap;}
</style>
