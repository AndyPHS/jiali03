<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="text-left">{{answerMsg[2].title}}</div>
        <div class="ml-5">
          <el-form-item :label="questionMsg[0].title" class="w-1/2 mx-auto">
            <el-select v-model="answerMsg[2].data[0].value" placeholder="几个孩子" @change="childList(answerMsg[2].data[0])">
              <el-option label="一个孩子" value="1"></el-option>
              <el-option label="两个孩子" value="2"></el-option>
              <el-option label="三个孩子" value="3"></el-option>
              <el-option label="四个孩子" value="4"></el-option>
              <el-option label="五个孩子" value="5"></el-option>
              <el-option label="六个孩子" value="6"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="ml-5">
          <div v-for="(item, index) in answerMsg[2].data[0].problemValue" :key="index+1" >
            <h2 class="text-left ml-5">{{answerMsg[2].data[0].problemRepeatName}}{{index+1}}</h2>
            <h2 class="text-left">问题一：{{answerMsg[2].data[0].data[0].title}}</h2>
              <div  class="w-2/3 mx-auto">
                <!--孩子的出生日期-->
                <el-form-item :label="'1、'+questionMsg[1].title" class="text-base">
                  <el-date-picker
                    v-model="item[index].data[0].value"
                    type="date"
                    size="small"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item :label="'2、'+questionMsg[2].title" class="text-base">
                  <el-input class="ban" v-model="answerMsg[2].data[0].problemValue[index][0].data[1].value" size="small" @blur="addChildName(answerMsg[2].data[0].problemValue[index][0].data[1].value)"></el-input>
                </el-form-item>
                <el-form-item :label="'3、'+questionMsg[3].title" class="text-base">
                  <el-select v-model="answerMsg[2].data[0].problemValue[index][0].data[2].value" placeholder="孩子性别" @change="addChildSex(answerMsg[2].data[0].problemValue[index][0].data[2].value)">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="'4、'+questionMsg[4].title" class="text-base">
                  <el-input type="number" class="ban" v-model="answerMsg[2].data[0].problemValue[index][0].data[3].value" size="small" @blur="addChildId(answerMsg[2].data[0].problemValue[index][0].data[3].value)"></el-input>
                </el-form-item>
              </div>
            <div>
              <h2 class="text-left">问题二：{{answerMsg[2].data[0].data[1].title}}</h2>
              <div  class="w-2/3 mx-auto">
                <el-form-item :label="'5、'+questionMsg[5].title" class="text-base">
                  <!--<el-radio-group v-model="item[index][1].data[0][0].value">-->
                    <!--<el-radio :label="1">男方</el-radio>-->
                    <!--<el-radio :label="2">女方</el-radio>-->
                    <!--<el-radio :label="3">共同抚养</el-radio>-->
                  <!--</el-radio-group>-->
                </el-form-item>
                <!--<div v-if="answerMsg[2].data[0].problemValue[index][1].data[0].value == '3'">-->
                  <!--<div>-->
                    <!--<el-form-item :label="'6、'+questionMsg[6].title" class="text-base">-->
                      <!--<el-radio-group v-model="answerMsg[2].data[0].problemValue[index][1].data[1].value">-->
                        <!--<el-radio :label="1">轮流循环抚养</el-radio>-->
                        <!--<el-radio :label="2">按阶段分别抚养</el-radio>-->
                      <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                    <!--&lt;!&ndash;<div class="w-1/2 mx-auto" v-if="answerMsg[2].data[0].problemValue[index][1].data[1].value != null">&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-form-item :label="questionMsg[7].title" class="text-base">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
                          <!--&lt;!&ndash;v-model="answerMsg[2].data[0].problemValue[index][1].data[1].data[0].value[0]"&ndash;&gt;-->
                          <!--&lt;!&ndash;type="date"&ndash;&gt;-->
                          <!--&lt;!&ndash;size="small"&ndash;&gt;-->
                          <!--&lt;!&ndash;@change="addChildBirthday(answerMsg[2].data[0].problemValue[index][1].data[1].data[0].value[0])"&ndash;&gt;-->
                          <!--&lt;!&ndash;placeholder="选择日期">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
                      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-form-item :label="questionMsg[8].title" class="text-base">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-date-picker&ndash;&gt;-->
                          <!--&lt;!&ndash;v-model="answerMsg[2].data[0].problemValue[index][1].data[1].data[0].value[1]"&ndash;&gt;-->
                          <!--&lt;!&ndash;type="date"&ndash;&gt;-->
                          <!--&lt;!&ndash;size="small"&ndash;&gt;-->
                          <!--&lt;!&ndash;@change="addChildBirthday(answerMsg[2].data[0].problemValue[index][1].data[1].data[0].value[1])"&ndash;&gt;-->
                          <!--&lt;!&ndash;placeholder="选择日期">&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
                      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->

                  <!--</div>-->
                <!--</div>-->
              </div>
            </div>
            <!--<div>-->
              <!--<h2 class="text-left">问题三：{{item.data[2].title}}</h2>-->
              <!--<h2 class="text-left">{{item.data[2].data[0].title}}</h2>-->
              <!--&lt;!&ndash;<div>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form-item :label="'7、'+questionMsg[8].title" class="text-base">&ndash;&gt;-->
                  <!--&lt;!&ndash;<el-radio-group v-model="text">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-radio :label="1">是</el-radio>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-radio :label="2">否</el-radio>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->

          </div>
        </div>
      </el-form>
      <!--<h2>{{answerMsg}}</h2>-->
    </div>
  </div>
</template>
<script>
  import {question} from '@/api/api/requestLogin.js'
  import {answer} from '@/api/api/requestLogin.js'
  export default {
      data () {
          return {
            questionMsg: [],
            answerMsg: [],
            childAll: [],
            ChildBirthday: '',
            ChildName: ''
          }
      },
      name: 'WenJuan',
      components: {

      },
      mounted(){
        this.getQuestion() //获取问题
        this.getAnswer()   // 获取答案
      },
      methods: {
        getQuestion () {     // 获取问题标题
          question().then((data) => {
            let getData = data.data
            this.questionMsg = eval('(' + getData + ')')
            console.log(this.questionMsg)
          }).catch((data) => {
          })
        },
        getAnswer () {
          answer().then((data) => {
            let getData = data.data
            this.answerMsg = eval('(' + getData + ')')
            console.log(this.answerMsg)
          }).catch((data)=>{
          })
        },
        childList (e) {
          if(e.problemValue.length-e.value>=0){
            for(let i = e.problemValue.length; i >= e.value; i--) {
              e.problemValue.splice(i)
            }
          }
          for(let i = 0; i < e.value; i++) {
            // e.problemValue[i]=[]
            // 选择几个子女，将创建几个空数组放在problemValue中
            this.$set(this.answerMsg[2].data[0].problemValue,i,[]);
            // answerMsg[2].data[0].problemValue
            for(let a = 0;a<e.data.length; a++){     // 遍历一套子女问题的模板
              if(e.data[a].class == 'title'){
                // 如果子女问题第一级模板中包含title属性，就创建几组子女模板data的空数组
                this.$set(this.answerMsg[2].data[0].problemValue[i],a,{ 'data':[]});
                for(let b = 0;b<e.data[a].data.length; b++){
                  e.problemValue[i][a].data.push({
                    'value': ""
                  })
                  // this.$set(this.answerMsg[2].data[0].problemValue[i][a],data,{ 'value':"123123" });
                }
              }
            }
          }
          // this.$forceUpdate();
          let childs = this.answerMsg[2].data[0];
          this.childAll = []
          for (let i = 0; i < e.value; i++) {
            this.childAll.push(childs)
          }
          console.log(e)
        },
        addChildBirthday1 (e) {
           console.log(e,12312313)
        },
        addChildBirthday (e) {
          console.log(e,12312313)
        },
        addChildName (e) {    // 添加姓名
           alert(e)
        },
        addChildSex (e) {
          alert(e)
        },
        addChildId (e) {
          alert(e)
        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
</style>
