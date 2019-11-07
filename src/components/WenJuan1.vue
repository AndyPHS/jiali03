<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="text-left"></div>
        <div class="ml-5">
          <el-form-item label="您与配偶有几个子女" class="w-1/2 mx-auto">
            <el-select v-model="childNum" placeholder="几个孩子" size="small" @change="childList(childNum)">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="ml-5">
          <!--遍历有几个孩子-->
          <div  v-for="(item, index) in childAll" :key="index" :id="getId(index)" ref="childMsg">
            <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">第{{index+1}}个孩子</h2>
            <!--遍历孩子的基本信息-->
            <div v-for="($item,$index) in item" :key="$index">
              <h2 class="text-left">{{$item.title}}</h2>
              <!--遍历问题一中的子问题-->
              <div v-for="($$item,$$index) in $item.questionList" :key="$$index">
                <div  class="w-2/3 mx-auto">
                  <!--孩子的出生日期-->
                  <el-form-item :label="$$item.title" class="text-base" v-if="$$item.type=='dateTime_day'">
                    <el-date-picker
                      v-model="$$item.value"
                      type="date"
                      size="small"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item :label="$$item.title" class="text-base" v-if="$$item.type=='input' && $$item.input_type=='text' ">
                    <el-input
                      type="text"
                      class="ban"
                      v-model="$$item.value"
                      size="small"
                      placeholder="请输入姓名"
                      @blur="addChildName($$item.value)"
                    ></el-input>
                  </el-form-item>
                  <el-form-item :label="$$item.title" class="text-base"  v-if="$$item.type=='input' && $$item.input_type=='number' ">
                    <el-input
                      type="number"
                      class="ban"
                      v-model="$$item.value"
                      maxlength="18"
                      size="small"
                      placeholder="请输入18位身份证号"
                      @blur="addChildId(item.ID)"
                    ></el-input>
                  </el-form-item>
                  <el-form-item :label="$$item.title" v-if="$$item.type=='select'">
                    <el-radio-group v-model="$$item.value" @change="addChildSex($$item.value)">
                      <el-radio :label="list.value" v-for="(list , listIndex) in $$item.data" :key="'list'+listIndex">{{list.title}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="$$item.child && $$item.child[$$item.value] && $$item.type=='select'">
                    <el-form-item :label="$$$item.title" class="text-base" v-for="($$$item, $$$index) in $$item.child[$$item.value]" :key="$$$index">
                      <el-radio-group v-model="$$$item.value" @change="custody($$$item.value)"  v-for="($$$$item, $$$$index) in $$$item.data" :key="$$$$index">
                        <el-radio :label="$$$$item.value">{{$$$$item.title}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {question} from '@/api/api/requestLogin.js'
  import {answer} from '@/api/api/requestLogin.js'
  import label_case from '@/components/partials/legal_basis'  // 标签组件
  export default {
    components:{
      label_case,
    },
      data () {
          return {
            childNum: '',
            questionMsg: [
              {
                title: '女方是否支付抚养费？',
                value: '',
                class: 'IsWomanPay',
                type: 'select',
                id: 3,
                data: [{
                  title:'是',
                  value:'1',
                },{
                  title:'否',
                  value:'0',
                }]
              },
              {
                title: '是否明确女方探望时间？',
                value: '',
                class: 'IsWomanVisited',
                type: 'select',
                id: 3,
                data: [{
                  title:'是',
                  value:'1',
                },{
                  title:'否',
                  value:'0',
                }]
              },
              {
                title: '怎么探望？',
                value: '',
                class: 'HowVisited',
                type: 'select',
                id: 3,
                data: [{
                  title:'是',
                  value:'1',
                },{
                  title:'否',
                  value:'0',
                }]
              }
            ],
            answerMsg: [],
            childAll: [],
            ChildBirthday: '',
            ChildName: ''
          }
      },
      name: 'WenJuan',
      mounted () {
        this.getQuestion() //获取问题
        this.getAnswer()   // 获取答案
      },
      methods: {
        getQuestion () {     // 获取问题标题
          question().then((data) => {
            let getData = data.data.data
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
        getId (index) {
          return 'box_' + index
        },
        childMsg1 () {
          return [
            {
              title:'问题一：基本信息',
              questionList:[
                {
                  title: '孩子的出生日期是？',
                  value: '',
                  type: 'dateTime_day',
                  id: 1
                },
                {
                  title: '孩子的姓名是？',
                  input_type: 'text',
                  value: '',
                  type: 'input',
                  id: 2
                },
                {
                  title: '孩子的性别是？',
                  value: '',
                  type: 'select',
                  id: 3,
                  data: [{
                    title:'男',
                    value:'M',
                  },{
                    title:'女',
                    value:'F',
                  }]
                },
                {
                  title: '孩子的身份证号是？',
                  maxLineLen: '18',
                  input_type: 'number',
                  value: '',
                  type: 'input',
                  id: 3
                }
              ]
            },
            {
              title:'问题二：抚养权归属',
              questionList:[
                {
                  title: '孩子归谁抚养？',
                  belongsTo:'Custody',
                  value: '',
                  type: 'select',
                  id: 3,
                  data: [{
                    title:'男方',
                    value:'M',
                  },{
                    title:'女方',
                    value:'F',
                  },{
                    title:'共同抚养',
                    value:'G',
                  }],
                  child:{
                    M:[{
                      title: '女方是否支付抚养费？',
                      value: '',
                      type: 'select',
                      id: 3,
                      data: [{
                        title:'是',
                        value:'M',
                      },{
                        title:'否',
                        value:'F',
                      }]
                    }],
                    F:[{
                      title: '男方是否支付抚养费？',
                      value: '',
                      type: 'select',
                      id: 3,
                      data: [{
                        title:'是',
                        value:'M',
                      },{
                        title:'否',
                        value:'F',
                      }]
                    }],
                    G:[{
                      title: '共同抚养怎么规定？',
                      value: '',
                      type: 'select',
                      id: 3,
                      data: [{
                        title:'轮流循环抚养',
                        value:'M',
                      },{
                        title:'按阶段分别抚养',
                        value:'F',
                      }]
                    }]
                  }
                }
              ]
            }
          ]
        },
        childList (e) {
          this.$forceUpdate();
          this.childAll = [];
          for (let i = 0; i < e; i++) {
            this.$set(this.childAll, i, this.childMsg1())
          }
        },
        addChildBirthday1 (e) {
           console.log(e,12312313)
        },
        addChildBirthday (e) {
          console.log(e,12312313)
        },
        addChildName (e) {    // 添加姓名
          console.log(e)
        },
        addChildSex (e) {
          console.log(e)
        },
        addChildId (e) {
          console.log(e)
        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
</style>
