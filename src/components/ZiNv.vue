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
          <div >
            <!--遍历孩子的基本信息-->
            <div v-for="(item,index) in childAll" :key="index">
              <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">第{{index+1}}个孩子</h2>
              <!-- 大问题块 -->
              <div v-for="($item,$index) in item"  :key="$index">
                <h2 class="text-left">{{$item.title}}</h2>
                <!-- 一级问题块 -->
                <div v-for="($$item,$$index) in $item.questions" :key="$$index">
                  <div v-if="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
                    <!--日期-精确到日-->
                    <div v-if="$$item.type == 'dateTime_day'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title" class="text-base">
                        <el-date-picker
                          v-model="$$item.answer"
                          type="date"
                          size="small"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <!--输入框-文字类型-->
                    <div v-if="$$item.type == 'input' && $$item.input_type=='text'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title" class="text-base">
                        <el-input
                          type="text"
                          class="ban"
                          v-model="$$item.answer"
                          size="small"
                          :placeholder="$$item.placeholder"
                          @blur="addChildName($$item.answer)"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <!--输入框-数字类型（类似身份证号、金额）-->
                    <div v-if="$$item.type == 'input' && $$item.input_type=='number'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title" class="text-base">
                        <el-input
                          type="number"
                          class="ban"
                          v-model="$$item.answer"
                          size="small"
                          :placeholder="$$item.placeholder"
                          @blur="addChildName($$item.answer)"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <!--单选框-->
                    <div v-if="$$item.type == 'radio'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title">
                        <el-radio-group v-model="$$item.answer">
                          <el-radio :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    <!--下拉框-->
                    <div v-if="$$item.type == 'select'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title">
                        <el-select v-model="$$item.answer">
                          <el-option
                            size="small"
                            v-for="(s,i) in $$item.listData"
                            :key="i"
                            :label="s.label"
                            :value="s.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <!--只有问题无答案-->
                    <div v-if="$$item.type =='question'">
                      <h2 class="text-left">{{$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title}}</h2>
                       <div  v-for="($$$item,$$$index) in $$item.childQuestion" :key="$$$index">
                         <!--日期-精确到日-->
                         <div v-if="$$$item.type == 'dateTime_day'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                             <el-date-picker
                               v-model="$$$item.answer"
                               type="date"
                               size="small"
                               placeholder="选择日期"
                               format="yyyy 年 MM 月 dd 日"
                               value-format="yyyy-MM-dd">
                             </el-date-picker>
                           </el-form-item>
                         </div>
                         <!--日期-区间几点到几点-->
                         <div v-if="$$$item.type == 'dateTime_Time_Interval'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                             <el-time-picker
                               v-model="$$$item.answer"
                               is-range
                               size="small"
                               range-separator="至"
                               start-placeholder="开始日期"
                               end-placeholder="结束日期"
                               placeholder="选择时间范围">
                             </el-time-picker>
                           </el-form-item>
                         </div>
                         <!--日期-区间几号到几号-->
                         <div v-if="$$$item.type == 'dateTime_Day_Interval'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                             <el-date-picker
                               v-model="$$$item.answer"
                               type="daterange"
                               size="small"
                               range-separator="至"
                               start-placeholder="开始日期"
                               end-placeholder="结束日期"
                               placeholder="选择日期范围">
                             </el-date-picker>
                           </el-form-item>
                         </div>
                         <!--输入框-文字类型-->
                         <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                             <el-input
                               type="text"
                               class="ban"
                               v-model="$$$item.answer"
                               size="small"
                               :placeholder="$$$item.placeholder"
                               @blur="addChildName($$$item.answer)"
                             ></el-input>
                           </el-form-item>
                         </div>
                         <!--输入框-数字类型（类似身份证号、金额）-->
                         <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                             <el-input
                               type="number"
                               class="ban"
                               v-model="$$$item.answer"
                               size="small"
                               :placeholder="$$$item.placeholder"
                               @blur="addChildName($$$item.answer)"
                             ></el-input>
                           </el-form-item>
                         </div>
                         <!--单选框-->
                         <div v-if="$$$item.type == 'radio'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                             <el-radio-group v-model="$$$item.answer">
                               <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                             </el-radio-group>
                           </el-form-item>
                         </div>
                         <!--下拉框-->
                         <div v-if="$$$item.type == 'select'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                             <el-select v-model="$$$item.answer">
                               <el-option
                                 size="small"
                                 v-for="(s,i) in $$$item.listData"
                                 :key="i"
                                 :label="s.label"
                                 :value="s.value">
                               </el-option>
                             </el-select>
                           </el-form-item>
                           <!--下拉框中的问题又会迁出子问题-->
                           <div v-if="$$$item.grandson && $$$item.grandson[$$$item.answer]">
                              <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                <!--日期-精确到日-->
                                <div v-if="$$$$item.type == 'dateTime_day'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                    <el-date-picker
                                      v-model="$$$$item.answer"
                                      type="date"
                                      size="small"
                                      placeholder="选择日期"
                                      format="yyyy 年 MM 月 dd 日"
                                      value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                  </el-form-item>
                                </div>
                                <!--日期-区间几点到几点-->
                                <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                    <el-time-picker
                                      v-model="$$$$item.answer"
                                      is-range
                                      size="small"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择时间范围">
                                    </el-time-picker>
                                  </el-form-item>
                                </div>
                                <!--日期-区间几号到几号-->
                                <div v-if="$$$$item.type == 'dateTime_Day_Interval'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                    <el-date-picker
                                      v-model="$$$$item.answer"
                                      type="daterange"
                                      size="small"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择日期范围">
                                    </el-date-picker>
                                  </el-form-item>
                                </div>
                                <!--输入框-文字类型-->
                                <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                    <el-input
                                      type="text"
                                      class="ban"
                                      v-model="$$$$item.answer"
                                      size="small"
                                      :placeholder="$$$$item.placeholder"
                                      @blur="addChildName($$$$item.answer)"
                                    ></el-input>
                                  </el-form-item>
                                </div>
                                <!--输入框-数字类型（类似身份证号、金额）-->
                                <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                    <el-input
                                      type="number"
                                      class="ban"
                                      v-model="$$$$item.answer"
                                      size="small"
                                      :placeholder="$$$$item.placeholder"
                                      @blur="addChildName($$$$item.answer)"
                                    ></el-input>
                                  </el-form-item>
                                </div>
                                <!--单选框-->
                                <div v-if="$$$$item.type == 'radio'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-radio-group v-model="$$$$item.answer">
                                      <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                </div>
                                <!--下拉框-->
                                <div v-if="$$$$item.type == 'select'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-select v-model="$$$$item.answer">
                                      <el-option
                                        size="small"
                                        v-for="(s,i) in $$$$item.listData"
                                        :key="i"
                                        :label="s.label"
                                        :value="s.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </div>
                              </div>
                           </div>
                         </div>
                       </div>
                    </div>
                    <!-- 二级问题块 -->
                    <div v-if="$$item.childQuestion && $$item.childQuestion[$$item.answer]">
                      <div v-for="($$$item,$$$index) in $$item.childQuestion[$$item.answer]" :key="$$$index">
                        <!--日期-精确到日-->
                        <div v-if="$$$item.type == 'dateTime_day'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                            <el-date-picker
                              v-model="$$$item.answer"
                              type="date"
                              size="small"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                        <!--日期-区间几点到几点-->
                        <div v-if="$$$item.type == 'dateTime_Time_Interval'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                            <el-time-picker
                              v-model="$$$item.answer"
                              is-range
                              size="small"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              placeholder="选择时间范围">
                            </el-time-picker>
                          </el-form-item>
                        </div>
                        <!--日期-区间几号到几号-->
                        <div v-if="$$$item.type == 'dateTime_Day_Interval'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                            <el-date-picker
                              v-model="$$$item.answer"
                              type="daterange"
                              size="small"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              placeholder="选择日期范围">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                        <!--输入框-文字类型-->
                        <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                            <el-input
                              type="text"
                              class="ban"
                              v-model="$$$item.answer"
                              size="small"
                              :placeholder="$$$item.placeholder"
                              @blur="addChildName($$$item.answer)"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <!--输入框-数字类型（类似身份证号、金额）-->
                        <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                            <el-input
                              type="number"
                              class="ban"
                              v-model="$$$item.answer"
                              size="small"
                              :placeholder="$$$item.placeholder"
                              @blur="addChildName($$$item.answer)"
                            ></el-input>
                          </el-form-item>
                        </div>
                        <!--单选框-->
                        <div v-if="$$$item.type == 'radio'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-radio-group v-model="$$$item.answer">
                              <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                        <!--下拉框-->
                        <div v-if="$$$item.type == 'select'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-select v-model="$$$item.answer">
                              <el-option
                                size="small"
                                v-for="(s,i) in $$$item.listData"
                                :key="i"
                                :label="s.label"
                                :value="s.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <!--下拉框选择每月几号-->
                        <div v-if="$$$item.type == 'select_day_per'">
                            <span>
                              每月
                              <el-select v-model="$$$item.answer">
                                <el-option
                                  size="small"
                                  v-for="(s,i) in days"
                                  :key="i"
                                  :label="s"
                                  :value="s">
                                </el-option>
                              </el-select>
                              日前
                            </span>
                        </div>
                        <!--下拉框选择月几号-->
                        <div v-if="$$$item.type == 'select_day'">
                            <span>
                              月
                              <el-select v-model="$$$item.answer">
                                <el-option
                                  size="small"
                                  v-for="(s,i) in days"
                                  :key="i"
                                  :label="s"
                                  :value="s">
                                </el-option>
                              </el-select>
                              日前
                            </span>
                        </div>
                        <!--下拉选择一年中哪个月-->
                        <div v-if="$$$item.type == 'select_year'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-select v-model="$$$item.answer">
                              <el-option
                                size="small"
                                v-for="(s,i) in mon"
                                :key="i"
                                :label="s"
                                :value="s">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <div class="w-1/3 flex mx-auto">
        <div class="w-40 mr-2">
          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="NextPage">下一页</div>
        </div>
        <div class="w-40">
          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="UpPage">上一页</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      // label_case,
    },
      data () {
          return {
            hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            childNum: '',
            answerMsg: [],
            childAll: [],
            ChildBirthday: '',
            ChildName: ''
          }
      },
      name: 'WenJuan2',
      mounted () {

      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        childMsg1 () {
          return [
            {
              title: '问题一：基本信息',
              questions: [
                {
                  title: '1.孩子的出生日期是？',
                  id: '1',
                  isRequired: true,
                  type: 'dateTime_day',
                  tip: '',
                  answer: ''
                },
                {
                  title: '2、孩子的姓名是？',
                  id: '2',
                  isRequired: true,
                  type: 'input',
                  placeholder: '请输入姓名',
                  input_type: 'text',
                  tip: '提示',
                  answer: ''
                },
                {
                  title: '3、孩子的性别是？',
                  id: '3',
                  isRequired: true,
                  type: 'radio',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '男', value: '1' },
                    { label: '女', value: '2' }
                  ]
                },
                {
                  title: '4、孩子的身份证号是？',
                  id: '4',
                  isRequired: false,
                  type: 'input',
                  placeholder: '请输入身份证号',
                  input_type: 'number',
                  tip: '提示',
                  answer: ''
                }
              ]
            },
            {
              title: '问题二：抚养权归属',
              questions: [
                {
                  title: '5、孩子归谁抚养？',
                  id: '5',
                  isRequired: true,
                  type: 'radio',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '男方', value: '1' },
                    { label: '女方', value: '2' },
                    { label: '共同抚养', value: '3' }
                  ]
                },
                {
                  title: '6、共同抚养怎么规定？',
                  id: '6',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '具体时间双发自行协商', value: '1' },
                    { label: '轮流循环抚养', value: '2' },
                    { label: '按阶段分别抚养', value: '3' }
                  ],
                  childQuestion: {
                    2: [
                      {
                        title: '归男方的时间',
                        id: '6_2_1',
                        isRequired: true,
                        type: 'dateTime_Day_Interval',
                        placeholder: '男方抚养时间',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '归女方的时间',
                        id: '6_2_2',
                        isRequired: true,
                        type: 'dateTime_Day_Interval',
                        placeholder: '女方抚养时间',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    3: [
                      {
                        title: '归男方的时间',
                        id: '6_3_1',
                        isRequired: true,
                        type: 'dateTime_Day_Interval',
                        placeholder: '男方抚养时间',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '归女方的时间',
                        id: '6_3_2',
                        isRequired: true,
                        type: 'dateTime_Day_Interval',
                        placeholder: '女方抚养时间',
                        tip: '提示',
                        answer: ''
                      }
                    ]
                  },
                  requireQidAndAnswer: { id: '5', answer: '3' }
                },
                {
                  title: '7、女方是否支付抚养费？',
                  id: '7',
                  isRequired: true,
                  type: 'radio',
                  tip: '', //提示语
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '0' }
                  ],
                  //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
                  requireQidAndAnswer: { id: '5', answer: '1' }
                },
                {
                  title: '8、支付抚养费的方式？',
                  id: '8',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '一次性支付', value: '1' },
                    { label: '按月支付', value: '2' },
                    { label: '按季度支付', value: '3' },
                    { label: '按年支付', value: '4' }
                  ],
                  childQuestion: {
                     1: [
                       {
                         title: '时间',
                         id: '8_1_1',
                         isRequired: true,
                         type: 'dateTime_day',
                         tip: '',
                         answer: ''
                       },
                       {
                         title: '抚养费总额',
                         id: '8_1_2',
                         isRequired: true,
                         type: 'input',
                         placeholder: '请输入抚养费总额',
                         input_type: 'number',
                         tip: '提示',
                         answer: ''
                       }
                     ],
                     2: [
                      {
                        title: '每月',
                        id: '8_1_1',
                        isRequired: true,
                        type: 'select_day_per',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '月抚养费总额',
                        id: '8_1_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入月抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                     3: [
                      {
                        title: '每季度',
                        id: '8_3_1',
                        isRequired: true,
                        type: 'select',
                        tip: '',
                        answer: '',
                        listData: [
                          { label: '1', value: '1' },
                          { label: '2', value: '2' },
                          { label: '3', value: '3' }
                        ]
                      },
                      {
                        title: '月',
                        id: '8_3_2',
                        isRequired: true,
                        type: 'select_day',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '季度抚养费总额',
                        id: '8_3_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入季度抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                     4: [
                      {
                        title: '每年',
                        id: '8_4_1',
                        isRequired: true,
                        type: 'select_year',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '月',
                        id: '8_4_2',
                        isRequired: true,
                        type: 'select_day',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '年度抚养费总额',
                        id: '8_4_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入季度抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ]
                  },
                  requireQidAndAnswer: { id: '7', answer: '1' }
                },
                {
                  title: '9、支付到哪个账户？',
                  id: '9',
                  isRequired: false,
                  type: 'question',
                  tip: '',
                  childQuestion: [
                    {
                      title: '开户名',
                      id: '9_1',
                      isRequired: true,
                      type: 'input',
                      input_type: 'text',
                      placeholder: '请输姓名，如：刘德华',
                      tip: '',
                      answer: ''
                    },
                    {
                      title: '银行名称',
                      id: '9_2',
                      isRequired: true,
                      type: 'input',
                      input_type: 'text',
                      placeholder: '如：中国工商银行(建外大街支行)',
                      tip: '',
                      answer: ''
                    },
                    {
                      title: '账号',
                      id: '9_3',
                      isRequired: true,
                      type: 'input',
                      placeholder: '请输入银行卡号',
                      input_type: 'number',
                      tip: '',
                      answer: ''
                    }
                  ],
                  requireQidAndAnswer: { id: '7', answer: '1' }
                },
                {
                  title: '10、支付到什么时候？',
                  id: '10',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '孩子年满十八周岁', value: '1' },
                    { label: '孩子大学毕业', value: '2' },
                    { label: '具体时间', value: '3' }
                  ],
                  childQuestion: {
                    3: [
                      {
                        title: '具体支付时间',
                        id: '10_2',
                        isRequired: true,
                        type: 'dateTime_day',
                        tip: '',
                        answer: ''
                      }
                    ]
                  },
                  requireQidAndAnswer: { id: '7', answer: '1' }
                },
                {
                  title: '11、男方是否支付抚养费？',
                  id: '11',
                  isRequired: true,
                  type: 'radio',
                  tip: '', //提示语
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '0' }
                  ],
                  //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
                  requireQidAndAnswer: { id: '5', answer: '2' }
                },
                {
                  title: '12、支付抚养费的方式？',
                  id: '12',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '一次性支付', value: '1' },
                    { label: '按月支付', value: '2' },
                    { label: '按季度支付', value: '3' },
                    { label: '按年支付', value: '4' }
                  ],
                  childQuestion: {
                    1: [
                      {
                        title: '时间',
                        id: '8_1_1',
                        isRequired: true,
                        type: 'dateTime_day',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '抚养费总额',
                        id: '8_1_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    2: [
                      {
                        title: '每月',
                        id: '8_1_1',
                        isRequired: true,
                        type: 'select_day_per',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '月抚养费总额',
                        id: '8_1_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入月抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    3: [
                      {
                        title: '每季度',
                        id: '8_3_1',
                        isRequired: true,
                        type: 'select',
                        tip: '',
                        answer: '',
                        listData: [
                          { label: '1', value: '1' },
                          { label: '2', value: '2' },
                          { label: '3', value: '3' }
                        ]
                      },
                      {
                        title: '月',
                        id: '8_3_2',
                        isRequired: true,
                        type: 'select_day',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '季度抚养费总额',
                        id: '8_3_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入季度抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    4: [
                      {
                        title: '每年',
                        id: '8_4_1',
                        isRequired: true,
                        type: 'select_year',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '月',
                        id: '8_4_2',
                        isRequired: true,
                        type: 'select_day',
                        tip: '',
                        answer: ''
                      },
                      {
                        title: '年度抚养费总额',
                        id: '8_4_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请输入季度抚养费总额',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ]
                  },
                  requireQidAndAnswer: { id: '11', answer: '1' }
                },
                {
                  title: '13、支付到哪个账户？',
                  id: '13',
                  isRequired: false,
                  type: 'question',
                  tip: '',
                  childQuestion: [
                    {
                      title: '开户名',
                      id: '13_1',
                      isRequired: true,
                      type: 'input',
                      input_type: 'text',
                      placeholder: '请输姓名，如：刘德华',
                      tip: '',
                      answer: ''
                    },
                    {
                      title: '银行名称',
                      id: '13_2',
                      isRequired: true,
                      type: 'input',
                      input_type: 'text',
                      placeholder: '如：中国工商银行(建外大街支行)',
                      tip: '',
                      answer: ''
                    },
                    {
                      title: '账号',
                      id: '13_3',
                      isRequired: true,
                      type: 'input',
                      placeholder: '请输入银行卡号',
                      input_type: 'number',
                      tip: '',
                      answer: ''
                    }
                  ],
                  requireQidAndAnswer: { id: '11', answer: '1' }
                },
                {
                  title: '14、支付到什么时候？',
                  id: '14',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '孩子年满十八周岁', value: '1' },
                    { label: '孩子大学毕业', value: '2' },
                    { label: '具体时间', value: '3' }
                  ],
                  childQuestion: {
                    3: [
                      {
                        title: '具体支付时间',
                        id: '14_2',
                        isRequired: true,
                        type: 'dateTime_day',
                        tip: '',
                        answer: ''
                      }
                    ]
                  },
                  requireQidAndAnswer: { id: '11', answer: '1' }
                },
                {
                  title: '是否明确约定女方探望时间？',
                  id: '15',
                  isRequired: true,
                  type: 'radio',
                  tip: '提示333',
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '0' }
                  ],
                  requireQidAndAnswer: { id: '5', answer: '1' }
                },
                {
                  title: '16、怎么探望？',
                  id: '16',
                  isRequired: false,
                  type: 'question',
                  tip: '',
                  childQuestion: [
                    {
                      title: '日常探望时间',
                      id: '16_1',
                      isRequired: true,
                      type: 'select',
                      placeholder: '请选择探望时间',
                      tip: '',
                      answer: '',
                      listData: [
                        {
                          label: '随时探望',
                          value: '1'
                        },
                        {
                          label: '定时探望',
                          value: '2'
                        }
                      ],
                      grandson: {
                        2: [
                          {
                            title: '每',
                            id: '16_1_2_1',
                            isRequired: true,
                            type: 'select',
                            tip: '',
                            answer: '',
                            listData: [
                              {
                                label: '周',
                                value: '1'
                              },
                              {
                                label: '月',
                                value: '2'
                              },
                              {
                                label: '年',
                                value: '3'
                              }
                            ]
                          },
                          {
                            title: '探望次数',
                            id: '16_1_2_2',
                            isRequired: true,
                            type: 'select',
                            tip: '',
                            answer: '',
                            listData: [
                              {
                                label: '1',
                                value: '1'
                              },
                              {
                                label: '2',
                                value: '2'
                              },
                              {
                                label: '3',
                                value: '3'
                              },
                              {
                                label: '4',
                                value: '4'
                              },
                              {
                                label: '5',
                                value: '5'
                              }
                            ]
                          },
                          {
                            title: '每次',
                            id: '16_1_2_3',
                            isRequired: true,
                            type: 'dateTime_Time_Interval',
                            tip: '',
                            answer: ''
                          }
                        ]
                      }
                    },
                    {
                      title: '寒暑假探望时间',
                      id: '16_2',
                      isRequired: true,
                      type: 'select',
                      placeholder: '请选择探望时间',
                      tip: '',
                      answer: '',
                      listData: [
                        {
                          label: '双方协商确定',
                          value: '1'
                        },
                        {
                          label: '具体日期',
                          value: '2'
                        }
                      ],
                      grandson: {
                        2: [
                          {
                            title: '具体探望时间',
                            id: '16_2_2',
                            isRequired: true,
                            type: 'dateTime_Day_Interval',
                            tip: '',
                            answer: ''
                          }
                        ]
                      }
                    }
                  ],
                  requireQidAndAnswer: { id: '15', answer: '1' }
                },
                {
                  title: '是否明确约定女方探望时间？',
                  id: '17',
                  isRequired: true,
                  type: 'radio',
                  tip: '提示333',
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '0' }
                  ],
                  requireQidAndAnswer: { id: '5', answer: '2' }
                },
                {
                  title: '18、怎么探望？',
                  id: '18',
                  isRequired: false,
                  type: 'question',
                  tip: '',
                  childQuestion: [
                    {
                      title: '日常探望时间',
                      id: '16_1',
                      isRequired: true,
                      type: 'select',
                      placeholder: '请选择探望时间',
                      tip: '',
                      answer: '',
                      listData: [
                        {
                          label: '随时探望',
                          value: '1'
                        },
                        {
                          label: '定时探望',
                          value: '2'
                        }
                      ],
                      grandson: {
                        2: [
                          {
                            title: '每',
                            id: '16_1_2_1',
                            isRequired: true,
                            type: 'select',
                            tip: '',
                            answer: '',
                            listData: [
                              {
                                label: '周',
                                value: '1'
                              },
                              {
                                label: '月',
                                value: '2'
                              },
                              {
                                label: '年',
                                value: '3'
                              }
                            ]
                          },
                          {
                            title: '探望次数',
                            id: '16_1_2_2',
                            isRequired: true,
                            type: 'select',
                            tip: '',
                            answer: '',
                            listData: [
                              {
                                label: '1',
                                value: '1'
                              },
                              {
                                label: '2',
                                value: '2'
                              },
                              {
                                label: '3',
                                value: '3'
                              },
                              {
                                label: '4',
                                value: '4'
                              },
                              {
                                label: '5',
                                value: '5'
                              }
                            ]
                          },
                          {
                            title: '每次',
                            id: '16_1_2_3',
                            isRequired: true,
                            type: 'dateTime_Time_Interval',
                            tip: '',
                            answer: ''
                          }
                        ]
                      }
                    },
                    {
                      title: '寒暑假探望时间',
                      id: '16_2',
                      isRequired: true,
                      type: 'select',
                      placeholder: '请选择探望时间',
                      tip: '',
                      answer: '',
                      listData: [
                        {
                          label: '双方协商确定',
                          value: '1'
                        },
                        {
                          label: '具体日期',
                          value: '2'
                        }
                      ],
                      grandson: {
                        2: [
                          {
                            title: '具体探望时间',
                            id: '16_2_2',
                            isRequired: true,
                            type: 'dateTime_Day_Interval',
                            tip: '',
                            answer: ''
                          }
                        ]
                      }
                    }
                  ],
                  requireQidAndAnswer: { id: '17', answer: '1' }
                },
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
        UpPage () {
          this.$router.replace("/HunYin");
        },
        NextPage () {
          this.$router.replace("/FangChan");
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
        consoleChild () {

        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
</style>
