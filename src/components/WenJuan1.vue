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
                    <el-radio-group v-model="$$item.value">
                      <el-radio :label="list.value" v-for="(list , listIndex) in $$item.data" :key="'list'+listIndex"  @change="consoleChild(list.child)">{{list.title}}</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <!--<div v-if="$$item.type=='select' && $$item.belongsTo=='Custody' ">-->
                    <!--<div v-for="(ite, inde) in questionMsg" :key="inde">-->
                      <!--<div  v-if="$$item.value=='M' ">-->
                        <!--<el-form-item :label="ite.title" v-if="ite.class=='IsWomanPay' ">-->
                          <!--<el-radio-group v-model="ite.value" @change="addChildSex(ite.value)">-->
                            <!--<el-radio :label="IsWomanPay.value" v-for="(IsWomanPay , IsWomanPayIndex) in ite.data" :key="'IsWomanPay'+IsWomanPayIndex">{{IsWomanPay.title}}</el-radio>-->
                          <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<div v-if="ite.class=='IsWomanPay' && ite.value=='1' ">-->
                          <!--<div v-for="(it, ind) in questionMsg" :key="ind">-->
                            <!--&lt;!&ndash;选择支付方式&ndash;&gt;-->
                            <!--<el-form-item :label="it.title" v-if="it.class=='HowPay' ">-->
                              <!--<el-select v-model="it.value" placeholder="请选择">-->
                                <!--<el-option-->
                                  <!--size="small"-->
                                  <!--v-for="(HowPay , HowPayIndex) in it.data"-->
                                  <!--:key="'HowPay'+HowPayIndex"-->
                                  <!--:label="HowPay.title"-->
                                  <!--:value="HowPay.value">-->
                                <!--</el-option>-->
                              <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--<div>-->
                              <!--&lt;!&ndash;支付方式 1&ndash;&gt;-->
                              <!--<div v-if="it.class=='HowPay' && it.value=='1' ">-->
                                <!--<div v-for="($it, $ind) in it.data" :key="$ind">-->
                                  <!--<div v-for="($$it, $$ind) in $it.data" :key="$$ind" v-if="$it.value=='1' ">-->
                                    <!--<el-form-item v-if="$$it.type=='dateTime'  && it.value=='1'  " :label="$$it.title" class="text-base">-->
                                      <!--<el-date-picker-->
                                        <!--v-model="$$it.value"-->
                                        <!--type="date"-->
                                        <!--size="small"-->
                                        <!--placeholder="选择日期">-->
                                      <!--</el-date-picker>-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item  v-if="$$it.type=='text' " :label="$$it.title" class="text-base">-->
                                      <!--<el-input type="number" class="ban" v-model="$$it.value" size="small" ></el-input>-->
                                    <!--</el-form-item>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</div>-->
                              <!--&lt;!&ndash;支付方式 2&ndash;&gt;-->
                              <!--<div v-if="it.class=='HowPay' && it.value=='2' ">-->
                                <!--<div v-for="($it, $ind) in it.data" :key="$ind">-->
                                  <!--<div v-for="($$it, $$ind) in $it.data" :key="$$ind" v-if="$it.value=='2' ">-->
                                    <!--<div v-if="$$it.type=='select' ">-->
                                       <!--<span>每月-->
                                         <!--<el-select v-model="$$it.value" size="small" placeholder="请选择">-->
                                          <!--<el-option-->
                                            <!--v-for="ite in days"-->
                                            <!--:key="ite"-->
                                            <!--:label="ite"-->
                                            <!--:value="ite">-->
                                          <!--</el-option>-->
                                        <!--</el-select>-->
                                        <!--日前-->
                                     <!--</span>-->
                                    <!--</div>-->
                                    <!--<el-form-item  v-if="$$it.type=='text' " :label="$$it.title" class="text-base">-->
                                      <!--<el-input type="number" class="ban" v-model="$$it.value" size="small" ></el-input>-->
                                    <!--</el-form-item>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</div>-->
                              <!--&lt;!&ndash;支付方式三&ndash;&gt;-->
                              <!--<div v-if="it.class=='HowPay' && it.value=='3' ">-->
                                <!--<div v-for="($it, $ind) in it.data" :key="$ind">-->
                                  <!--<div v-for="($$it, $$ind) in $it.data" :key="$$ind" v-if="$it.value=='3' ">-->
                                    <!--<div v-if="$$it.type=='selectMonth' ">-->
                                       <!--<span>每季度-->
                                         <!--<el-select v-model="$$it.value" size="small" placeholder="请选择">-->
                                           <!--<el-option :value="1">1</el-option>-->
                                           <!--<el-option :value="2">2</el-option>-->
                                           <!--<el-option :value="3">3</el-option>-->
                                        <!--</el-select>-->
                                        <!--月-->
                                     <!--</span>-->
                                    <!--</div>-->
                                    <!--<div v-if="$$it.type=='selectDay' ">-->
                                       <!--<span>-->
                                         <!--<el-select v-model="$$it.value" size="small" placeholder="请选择">-->
                                          <!--<el-option-->
                                            <!--v-for="ite in days"-->
                                            <!--:key="ite"-->
                                            <!--:label="ite"-->
                                            <!--:value="ite">-->
                                          <!--</el-option>-->
                                        <!--</el-select>-->
                                        <!--日前-->
                                     <!--</span>-->
                                    <!--</div>-->
                                    <!--<el-form-item  v-if="$$it.type=='text' " :label="$$it.title" class="text-base">-->
                                      <!--<el-input type="number" class="ban" v-model="$$it.value" size="small" ></el-input>-->
                                    <!--</el-form-item>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</div>-->
                              <!--&lt;!&ndash;支付方式四&ndash;&gt;-->
                              <!--<div v-if="it.class=='HowPay' && it.value=='4' ">-->
                                <!--<div v-for="($it, $ind) in it.data" :key="$ind">-->
                                  <!--<div v-for="($$it, $$ind) in $it.data" :key="$$ind" v-if="$it.value=='4' ">-->
                                    <!--<div v-if="$$it.type=='selectYear' ">-->
                                       <!--<span>每年-->
                                         <!--<el-select v-model="$$it.value" size="small" placeholder="请选择">-->
                                           <!--<el-option-->
                                             <!--v-for="mo in mon"-->
                                             <!--:key="mo"-->
                                             <!--:label="mo"-->
                                             <!--:value="mo">-->
                                          <!--</el-option>-->
                                        <!--</el-select>-->
                                        <!--月-->
                                     <!--</span>-->
                                    <!--</div>-->
                                    <!--<div v-if="$$it.type=='selectDay' ">-->
                                       <!--<span>-->
                                         <!--<el-select v-model="$$it.value" size="small" placeholder="请选择">-->
                                          <!--<el-option-->
                                            <!--v-for="ite in days"-->
                                            <!--:key="ite"-->
                                            <!--:label="ite"-->
                                            <!--:value="ite">-->
                                          <!--</el-option>-->
                                        <!--</el-select>-->
                                        <!--日前-->
                                     <!--</span>-->
                                    <!--</div>-->
                                    <!--<el-form-item  v-if="$$it.type=='text' " :label="$$it.title" class="text-base">-->
                                      <!--<el-input type="number" class="ban" v-model="$$it.value" size="small" ></el-input>-->
                                    <!--</el-form-item>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;选择支付方式&ndash;&gt;-->
                            <!--<el-form-item :label="it.title" v-if="it.class=='PayLastTime' ">-->
                              <!--<el-select v-model="it.value" placeholder="请选择">-->
                                <!--<el-option-->
                                  <!--size="small"-->
                                  <!--v-for="(PayLastTime , PayLastTimeIndex) in it.data"-->
                                  <!--:key="'PayLastTime'+PayLastTimeIndex"-->
                                  <!--:label="PayLastTime.title"-->
                                  <!--:value="PayLastTime.value">-->
                                <!--</el-option>-->
                              <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--<div>-->
                              <!--<div  v-if="it.class=='PayLastTime' && it.value=='3' ">-->
                                <!--<div v-for="($it, $ind) in it.data" :key="$ind">-->
                                  <!--<div v-for="($$it, $$ind) in $it.data" :key="$$ind" v-if="$it.value=='3' ">-->
                                    <!--<el-form-item v-if="$$it.type=='dateTime' " :label="$$it.title" class="text-base">-->
                                      <!--<el-date-picker-->
                                        <!--v-model="$$it.value"-->
                                        <!--type="date"-->
                                        <!--size="small"-->
                                        <!--placeholder="选择日期">-->
                                      <!--</el-date-picker>-->
                                    <!--</el-form-item>-->
                                  <!--</div>-->
                                <!--</div>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</div>-->
                        <!--</div>-->
                        <!--<el-form-item :label="ite.title" v-if="ite.class=='IsWomanVisited' ">-->
                          <!--<el-radio-group v-model="ite.value" @change="addChildSex(ite.value)">-->
                            <!--<el-radio :label="IsWomanVisited.value" v-for="(IsWomanVisited , IsWomanVisitedIndex) in ite.data" :key="'IsWomanVisited'+IsWomanVisitedIndex">{{IsWomanVisited.title}}</el-radio>-->
                          <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<div v-if="ite.class=='IsWomanVisited' && ite.value=='1' ">-->
                             <!--<div>可以探望</div>-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div  v-else-if="$$item.value=='F' ">-->
                        <!--<el-form-item :label="ite.title" v-if="ite.class=='IsManPay' ">-->
                          <!--<el-radio-group v-model="ite.value" @change="addChildSex(ite.value)">-->
                            <!--<el-radio :label="IsManPay.value" v-for="(IsManPay , IsManPayIndex) in ite.data" :key="'IsManPay'+IsManPayIndex">{{IsManPay.title}}</el-radio>-->
                          <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                        <!--<div v-if="ite.class=='IsManPay' && ite.value=='1' ">-->
                          <!--<div v-for="(it, ind) in questionMsg" :key="ind">-->
                            <!--<el-form-item :label="it.title" v-if="it.class=='HowPay' ">-->
                              <!--<el-select v-model="it.value" placeholder="请选择">-->
                                <!--<el-option-->
                                  <!--size="small"-->
                                  <!--v-for="(HowPay , HowPayIndex) in it.data"-->
                                  <!--:key="'HowPay'+HowPayIndex"-->
                                  <!--:label="HowPay.title"-->
                                  <!--:value="HowPay.value">-->
                                <!--</el-option>-->
                              <!--</el-select>-->
                            <!--</el-form-item>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div v-else-if="$$item.value=='G' ">-->
                        <!--<el-form-item :label="ite.title" v-if="ite.class=='SharedCare' ">-->
                          <!--<el-select v-model="ite.value" placeholder="请选择">-->
                            <!--<el-option-->
                              <!--size="small"-->
                              <!--v-for="(SharedCare , SharedCareIndex) in ite.data"-->
                              <!--:key="'SharedCare'+SharedCareIndex"-->
                              <!--:label="SharedCare.title"-->
                              <!--:value="SharedCare.value">-->
                            <!--</el-option>-->
                          <!--</el-select>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
            <div v-for="(aa, aaIndex) in questionMsgTest" :key="aaIndex+1">
              <el-form-item :label="aa.title" v-if="aa.type=='select'">
                <el-radio-group v-model="aa.value">
                  <el-radio :label="$aa.value" v-for="($aa , $aaIndex) in aa.data" :key="$aaIndex"  @change="consoleChild($aa.child)">{{$aa.title}}</el-radio>
                </el-radio-group>
              </el-form-item>
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
            hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            childNum: '',
            questionMsg: [
              {
                title: '女方是否支付抚养费？',
                value: '',
                class: 'IsWomanPay',
                type: 'select',
                id: 3,
                data: [{
                  title: '是',
                  value: '1'
                },{
                  title: '否',
                  value: '0'
                }]
              },
              {
                title: '男方是否支付抚养费？',
                value: '',
                class: 'IsManPay',
                type: 'select',
                id: 3,
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                  title: '否',
                  value: '0'
                }]
              },
              {
                title: '支付抚养费的方式？',
                value: '',
                class: 'HowPay',
                type: 'select',
                id: 3,
                data: [{
                  title: '一次性支付',
                  value: '1',
                  data: [{
                    title: '时间',
                    type: 'dateTime',
                    value: ''
                  },
                  {
                    title: '抚养费总额',
                    type: 'text',
                    value: ''
                  }]
                },
                  {
                  title: '按月支付',
                  value: '2',
                  data: [{
                    title: '时间',
                    type: 'select',
                    value: ''
                  },
                    {
                      title: '月抚养费总额',
                      type: 'text',
                      value: ''
                    }]
                },
                  {
                    title: '按季度支付',
                    value: '3',
                    data: [{
                      title: '月',
                      type: 'selectMonth',
                      value: ''
                    },
                      {
                        title: '日',
                        type: 'selectDay',
                        value: ''
                      },
                      {
                        title: '季抚养费总额',
                        type: 'text',
                        value: ''
                      }]
                  },
                  {
                    title: '按年支付',
                    value: '4',
                    data: [{
                      title: '年',
                      type: 'selectYear',
                      value: ''
                    },
                      {
                        title: '日',
                        type: 'selectDay',
                        value: ''
                      },
                      {
                        title: '年抚养费总额',
                        type: 'text',
                        value: ''
                      }]
                  }]
              },
              {
                title: '支付到什么时候？',
                value: '',
                class: 'PayLastTime',
                type: 'select',
                id: 3,
                data: [{
                  title: '孩子年满十八周岁',
                  value: '1'
                },
                {
                  title: '孩子大学毕业',
                  value: '2'
                },
                {
                  title: '具体时间',
                  value: '3',
                  data: [{
                    title: '支付具体时间',
                    type: 'dateTime',
                    value: ''
                  }]
                }]
              },
              {
                title: '共同抚养怎么规定？',
                value: '',
                class: 'SharedCare',
                type: 'select',
                id: 3,
                data: [{
                  title: '具体时间双方自行商定',
                  value: '1'
                },
                  {
                    title: '轮流循环抚养',
                    value: '2'
                  },
                  {
                    title: '按阶段分别抚养',
                    value: '3'
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
                title: '是否明确男方探望时间？',
                value: '',
                class: 'IsManVisited',
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
            questionMsgTest: {
              1: {
                  title: '女方是否支付抚养费',
                  type: 'select',
                  value: '',
                  data: [{
                    title: '是',
                    value: '1',
                    child: [5, 6]
                  },
                  {
                    title: '否',
                    value: '0'
                  }]
              },
              2: {
                title: '女方是否探望',
                type: 'select',
                value: '',
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                    title: '否',
                    value: '0'
                  }]
              },
              3: {
                title: '男方是否支付抚养费',
                type: 'select',
                value: '',
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                    title: '否',
                    value: '0'
                  }]
              },
              4: {
                title: '男方是否探望',
                type: 'select',
                value: '',
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                    title: '否',
                    value: '0'
                  }]
              },
              5: {
                title: '女方怎么支付抚养费',
                type: 'select',
                value: '',
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                    title: '否',
                    value: '0'
                  }]
              },
              6: {
                title: '女方支付的时间',
                type: 'select',
                value: '',
                data: [{
                  title: '是',
                  value: '1'
                },
                  {
                    title: '否',
                    value: '0'
                  }]
              }
            },
            nextQuestion: [],
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
              title: '问题一：基本信息',
              questionList: [
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
                    title: '男',
                    value: 'M',
                  },
                    {
                    title: '女',
                    value: 'F',
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
              title: '问题二：抚养权归属',
              questionList: [
                {
                  title: '孩子归谁抚养？',
                  belongsTo: 'Custody',
                  value: '',
                  type: 'select',
                  id: 3,
                  data: [{
                    title: '男方',
                    value: 'M',
                    class: 'man',
                    level: "3",
                    child: [1, 2]
                  },
                  {
                    title: '女方',
                    value: 'F',
                    child: [3, 4]
                  },
                  {
                    title: '共同抚养',
                    value: 'G',
                    child: [5, 6]
                  }],
                  child: {
                    M: [{
                      title: '女方是否支付抚养费？',
                      value: '',
                      type: 'select',
                      id: 3,
                      data: [{
                        title:'是',
                        value:'1',
                      },{
                        title:'否',
                        value:'0',
                      }]
                    }],
                    F:[{
                      title: '男方是否支付抚养费？',
                      value: '',
                      type: 'select',
                      id: 3,
                      data: [{
                        title:'是',
                        value:'1',
                      },{
                        title:'否',
                        value:'0',
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
        },
        consoleChild (childAll) {
          console.log(childAll)
          // this.nextQuestion = childAll;
          this.nextQuestion =[];
          for(let i in childAll) {
            // console.log(childAll[i])
            // console.log(this.questionMsgTest[childAll[i]])
            this.nextQuestion.push(this.questionMsgTest[childAll[i]])
          }
          console.log(this.nextQuestion)
        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
</style>
