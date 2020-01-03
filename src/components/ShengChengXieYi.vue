<template>
  <div class="w-full bg-color">
    <div class=" containermin mx-auto py-10">
      <div class="bg-white rounded-lg">
        <div class="outputword rounded-lg shadow-lg relative">
          <h2 class="py-2 text-2xl font-bold">离婚协议书</h2>
          <div class="absolute top-0 right-0 mt-4 mr-6">
            <el-button class="text-right" type="primary" @click="GoBasicInformationPage">返回修改</el-button>
          </div>
          <div class="w-full">
            <div class="text-left px-4 py-3 msg">
              <div  class="w-2/3" v-if="this.status_code ==330">
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
.bg-color{background: #eee;}
.containermin{width:800px;}
.outputword{padding:20px;border:1px solid #ecf5ec;}
.outputword>h2{border-bottom: 1px solid #dbe2db;}
.outputword .msg{white-space:pre-wrap;margin-top: -50px;}
</style>
