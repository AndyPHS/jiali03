<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="text-left mt-5 text-orange-500 text-bolder">子女问题</div>
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
          <div v-for="(item, index) in childAll" :key="index" :id="getId(index)">
            <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">第{{index+1}}个孩子</h2>
            <h2 class="text-left">问题一：基本信息</h2>
              <div  class="w-2/3 mx-auto">
                <!--孩子的出生日期-->
                <el-form-item label="1、孩子的出生日期是" class="text-base">
                  <el-date-picker
                    v-model="item.birthday"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    @change="changeFunc(item, index)"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="2、孩子的姓名是" class="text-base">
                  <el-input
                    class="ban"
                    v-model="item.name"
                    size="small"
                    placeholder="请输入姓名"
                    @blur="addChildName(item.name)"
                  ></el-input>
                </el-form-item>
                <el-form-item label="3、孩子的性别是" class="text-base">
                  <el-radio-group v-model="item.sex" @change="addChildSex(item.sex)">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="4、孩子的身份证号是" class="text-base">
                  <el-input
                    type="number"
                    class="ban"
                    v-model="item.ID"
                    maxlength="18"
                    size="small"
                    placeholder="请输入18位身份证号"
                    @blur="addChildId(item.ID)"
                  ></el-input>
                </el-form-item>
              </div>
            <div>
              <h2 class="text-left">问题二：抚养权归属</h2>
              <div class="w-2/3 mx-auto">
                <el-form-item label="5、孩子归谁抚养？" class="text-base">
                  <el-radio-group v-model="item.Custody" @change="custody(item.Custody)">
                    <el-radio :label="1">男方</el-radio>
                    <el-radio :label="2">女方</el-radio>
                    <el-radio :label="3">共同抚养</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="item.Custody == '1'">
                  <el-form-item label="6、女方是否支付抚养费？" class="text-base">
                    <el-radio-group v-model="item.womanMainten">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="item.womanMainten =='1'">
                    <el-form-item label="7、支付抚养费方式？" class="text-base">
                      <el-radio-group v-model="item.HowPay.value">
                        <el-radio :label="1">一次性支付</el-radio>
                        <el-radio :label="2">按月支付</el-radio>
                        <el-radio :label="3">按季度支付</el-radio>
                        <el-radio :label="4">按年支付</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='1' && item.womanMainten =='1'">
                    <el-form-item label="时间" class="text-base">
                      <el-date-picker
                        v-model="item.HowPay.data.onceTime"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        @change="changeFunc(item, index)"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.allMoney" size="small" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='2' && item.womanMainten =='1'">
                     <span>每月
                         <el-select v-model="item.HowPay.data.MonthPay" size="small" placeholder="请选择">
                          <el-option
                            v-for="ite in days"
                            :key="ite"
                            :label="ite"
                            :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="月抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.MonthMoney" size="small" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='3' && item.womanMainten =='1'">
                     <span>每季度
                         <el-select v-model="item.HowPay.data.Quarter[0]" size="small" placeholder="请选择">
                           <el-option :value="1">1</el-option>
                           <el-option :value="2">2</el-option>
                           <el-option :value="3">3</el-option>
                        </el-select>月
                       <el-select v-model="item.HowPay.data.Quarter[1]" size="small" placeholder="请选择">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="季度抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.QuarterMoney" size="small" @blur="addChildId(item)"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='4' && item.womanMainten =='1'">
                     <span>每年
                         <el-select v-model="item.HowPay.data.yearPay[0]" size="small" placeholder="请选择">
                           <el-option
                             v-for="mo in mon"
                             :key="mo"
                             :label="mo"
                             :value="mo">
                          </el-option>
                        </el-select>月
                       <el-select v-model="item.HowPay.data.yearPay[1]" size="small" placeholder="请选择">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="年抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.yearPayMoney" size="small" @blur="addChildId(item)"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.womanMainten =='1' && item.HowPay.value !='' ">
                    <el-form-item label="9、支付到什么时候？" class="text-base">
                      <el-radio-group v-model="item.PayTime" @change="custody(item.PayTime)">
                        <el-radio :label="1">孩子年满十八周岁</el-radio>
                        <el-radio :label="2">孩子大学毕业</el-radio>
                        <el-radio :label="3">具体时间</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.PayTime =='3'">
                      <el-date-picker
                        v-model="item.PayTimeOther"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        @change="changeFunc(item, index)"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div v-if="item.Custody == '2'">
                  <el-form-item label="6、男方是否支付抚养费？" class="text-base">
                    <el-radio-group v-model="item.manMainten">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="item.manMainten =='1'">
                    <el-form-item label="7、支付抚养费方式？" class="text-base">
                      <el-radio-group v-model="item.HowPay.value">
                        <el-radio :label="1">一次性支付</el-radio>
                        <el-radio :label="2">按月支付</el-radio>
                        <el-radio :label="3">按季度支付</el-radio>
                        <el-radio :label="4">按年支付</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='1' && item.manMainten =='1'">
                    <el-form-item label="时间" class="text-base">
                      <el-date-picker
                        v-model="item.HowPay.data.onceTime"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        @change="changeFunc(item, index)"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.allMoney" size="small" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='2' && item.manMainten =='1'">
                     <span>每月
                         <el-select v-model="item.HowPay.data.MonthPay" size="small" placeholder="请选择">
                          <el-option
                            v-for="ite in days"
                            :key="ite"
                            :label="ite"
                            :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="月抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.MonthMoney" size="small" ></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='3' && item.manMainten =='1'">
                     <span>每季度
                         <el-select v-model="item.HowPay.data.Quarter[0]" size="small" placeholder="请选择">
                           <el-option :value="1">1</el-option>
                           <el-option :value="2">2</el-option>
                           <el-option :value="3">3</el-option>
                        </el-select>月
                       <el-select v-model="item.HowPay.data.Quarter[1]" size="small" placeholder="请选择">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="季度抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.QuarterMoney" size="small" @blur="addChildId(item)"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.HowPay.value=='4' && item.manMainten =='1'">
                     <span>每年
                         <el-select v-model="item.HowPay.data.yearPay[0]" size="small" placeholder="请选择">
                           <el-option
                             v-for="mo in mon"
                             :key="mo"
                             :label="mo"
                             :value="mo">
                          </el-option>
                        </el-select>月
                       <el-select v-model="item.HowPay.data.yearPay[1]" size="small" placeholder="请选择">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        日前
                     </span>
                    <el-form-item label="年抚养费总额" class="text-base">
                      <el-input type="number" class="ban" v-model="item.HowPay.data.yearPayMoney" size="small" @blur="addChildId(item)"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="item.manMainten =='1' && item.HowPay.value !='' ">
                    <el-form-item label="9、支付到什么时候？" class="text-base">
                      <el-radio-group v-model="item.PayTime" @change="custody(item.PayTime)">
                        <el-radio :label="1">孩子年满十八周岁</el-radio>
                        <el-radio :label="2">孩子大学毕业</el-radio>
                        <el-radio :label="3">具体时间</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.PayTime =='3'">
                      <el-date-picker
                        v-model="item.PayTimeOther"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        @change="changeFunc(item, index)"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div v-if="item.Custody == '3'">
                  <div>
                    <el-form-item label="6、共同抚养怎么规定" class="text-base">
                      <el-radio-group v-model="item.SharedCare.value">
                        <el-radio :label="1">轮流循环抚养</el-radio>
                        <el-radio :label="2">按阶段分别抚养</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="w-1/2 mx-auto" v-if="item.SharedCare.value == '1'">
                      <el-form-item label="归男方时间" class="text-base">
                        <el-date-picker
                          v-model="item.SharedCare.data.ToTheMan"
                          type="date"
                          size="small"
                          @change="addChildBirthday(item.SharedCare.data.ToTheMan)"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="归女方时间" class="text-base">
                        <el-date-picker
                          v-model="item.SharedCare.data.ToTheWoMan"
                          type="date"
                          size="small"
                          @change="addChildBirthday(item.SharedCare.data.ToTheWoMan)"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <div class="w-1/2 mx-auto" v-if="item.SharedCare.value == '2'">
                      <el-form-item label="归男方时间" class="text-base">
                        <el-date-picker
                          v-model="item.SharedCare.data.ToTheMan"
                          type="date"
                          size="small"
                          @change="addChildBirthday(item.SharedCare.data.ToTheMan)"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="归女方时间" class="text-base">
                        <el-date-picker
                          v-model="item.SharedCare.data.ToTheWoMan"
                          type="date"
                          size="small"
                          @change="addChildBirthday(item.SharedCare.data.ToTheWoMan)"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.Custody =='1' ">
                <h2 class="text-left">问题三：探望权</h2>
                <div class="w-2/3 mx-auto">
                  <el-form-item label="10、是否明确约定女方探望时间？" class="text-base">
                    <el-radio-group v-model="item.SettingWomenVisitingHours" @change="custody(item.SettingWomenVisitingHours)">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="item.SettingWomenVisitingHours =='1' ">
                    <h2 class="text-left">11、怎么探望？</h2>
                    <el-form-item label="（1）日常探望时间：" class="text-base">
                      <el-radio-group v-model="item.DailyVisits.value" @change="custody(item.DailyVisits.value)">
                        <el-radio :label="1">随时探望</el-radio>
                        <el-radio :label="2">定时探望</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.DailyVisits.value=='2'">
                      <span>
                        每
                        <el-select v-model="item.DailyVisits.RegularVisits[0]" placeholder="请选择" size="small">
                          <el-option label="周" :value="1">周</el-option>
                          <el-option label="月" :value="2">月</el-option>
                          <el-option label="年" :value="3">年</el-option>
                        </el-select>
                        探望
                        <el-select v-model="item.DailyVisits.RegularVisits[1]" placeholder="请选择" size="small">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        次
                      </span>
                      <br/>
                      <span class="my-2 inline-block">
                         每次
                        <el-time-picker
                          is-range
                          v-model="item.DailyVisits.RegularVisitsTime"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
                         </el-time-picker>
                      </span>
                    </div>
                    <el-form-item label="（1）寒暑假探望时间：" class="text-base">
                      <el-radio-group v-model="item.HolidayVisits.value" @change="custody(item.HolidayVisits.value)">
                        <el-radio :label="1" value="1">双方协商确定</el-radio>
                        <el-radio :label="2" value="2">具体日期</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.HolidayVisits.value =='2' ">
                      <el-date-picker
                        v-model="item.HolidayVisits.HolidayVisitsTime"
                        type="daterange"
                        size="small"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="printMsg(item)"
                      ></el-date-picker>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.Custody =='2' ">
                <h2 class="text-left">问题三：探望权</h2>
                <div class="w-2/3 mx-auto">
                  <el-form-item label="10、是否明确约定男方探望时间？" class="text-base">
                    <el-radio-group v-model="item.SettingManVisitingHours" @change="custody(item.SettingManVisitingHours)">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div v-if="item.SettingManVisitingHours =='1' ">
                    <h2 class="text-left">11、怎么探望？</h2>
                    <el-form-item label="（1）日常探望时间：" class="text-base">
                      <el-radio-group v-model="item.DailyVisits.value" @change="custody(item.DailyVisits.value)">
                        <el-radio :label="1">随时探望</el-radio>
                        <el-radio :label="2">定时探望</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.DailyVisits.value=='2'">
                      <span>
                        每
                        <el-select v-model="item.DailyVisits.RegularVisits[0]" placeholder="请选择" size="small">
                          <el-option label="周" :value="1">周</el-option>
                          <el-option label="月" :value="2">月</el-option>
                          <el-option label="年" :value="3">年</el-option>
                        </el-select>
                        探望
                        <el-select v-model="item.DailyVisits.RegularVisits[1]" placeholder="请选择" size="small">
                           <el-option
                             v-for="ite in days"
                             :key="ite"
                             :label="ite"
                             :value="ite">
                          </el-option>
                        </el-select>
                        次
                      </span>
                      <br/>
                      <span class="my-2 inline-block">
                         每次
                         <el-time-picker
                           is-range
                           v-model="item.DailyVisits.RegularVisitsTime"
                           size="small"
                           range-separator="至"
                           start-placeholder="开始时间"
                           end-placeholder="结束时间"
                           placeholder="选择时间范围">
                         </el-time-picker>
                      </span>
                    </div>
                    <el-form-item label="（1）寒暑假探望时间：" class="text-base">
                      <el-radio-group v-model="item.HolidayVisits.value" @change="custody(item.HolidayVisits.value)">
                        <el-radio :label="1">双方协商确定</el-radio>
                        <el-radio :label="2">具体日期</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div v-if="item.HolidayVisits.value =='2' ">
                      <el-date-picker
                        v-model="item.HolidayVisits.HolidayVisitsTime"
                        size="small"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="printMsg(item)"
                      ></el-date-picker>
                    </div>
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
// import {question} from '@/api/api/requestLogin.js'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  data () {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      childNum: '',
      // childMsg: {
      //
      // },
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
  mounted () {
    // this.getAnswer() // 获取答案
    // this.getQuestion() // 获取问题
  },
  methods: {
    // getQuestion () {     // 获取问题标题
    //   question().then((data) => {
    //     let getData = data.data
    //     this.questionMsg = eval('(' + getData + ')')
    //     // console.log(this.questionMsg)
    //   }).catch((data) => {
    //   })
    // },
    // getAnswer () {
    //   answer().then((data) => {
    //     let getData = data.data
    //     this.answerMsg = eval('(' + getData + ')')
    //     // console.log(this.answerMsg)
    //   }).catch((data) =>{
    //   })
    // },
    getId (index) {
      return 'box_' + index
    },
    childMsg1 () {
      return {
        name: '',
        birthday: '',
        sex: '',
        ID: '',
        Custody: '',   // 抚养权归属 1男方  2女方  3共抚养
        SharedCare: {      //  共同抚养怎么规定
          value: '',   // 1 轮流抚养  2 按阶段分别抚养
          data: {
            ToTheMan: '',
            ToTheWoMan: ''
          }
        },
        womanMainten: '',  // 女方是否支付抚养费 0否，1是
        manMainten: '',   // 男方是福支付抚养费 0否，1是
        HowPay: {    // 支付抚养费方式 1一次性支付，2按月支付，3按季度支付
          value: '',
          data: {
            onceTime: '',          // 一次性支付
            allMoney: '',
            MonthPay: '',           // 每月几日前支付
            MonthMoney: '',
            Quarter: [],           // 按季度支付
            QuarterMoney: '',
            yearPay: [],  //按年支付
            yearPayMoney: ''
          }
        },
        PayTime: '',   // 支付到什么时候
        PayTimeOther: '',   //具体支付时间
        SettingWomenVisitingHours: '',   // 是否明确约定女方探望时间 1是 0否
        SettingManVisitingHours: '',      // 是否明确约定男方探望时间 1是 0否
        DailyVisits: {
          value: '',     // 1、随时探望 2、定时探望
          RegularVisits: [],  //每多久探望几次
          RegularVisitsTime: ''   //每次几点到几点
        },
        HolidayVisits: {
          value: '',  // 寒暑假探望时间
          HolidayVisitsTime: []  // 假期探望具体时间
        }
      }
    },
    childList (e) {
      this.$forceUpdate();
      this.childAll = []
      for (let i = 0; i < e; i++) {
        this.$set(this.childAll, i, this.childMsg1())
      }
    },
    changeFunc (item, index) {
      // console.log(item)
      console.log(this.childAll)
    },
    addChildBirthday1 (e) {
      console.log(e, 12312313)
      console.log(this.childAll)
    },
    addChildBirthday (e) {
      console.log(e,12312313)
      console.log(this.childAll)
    },
    addChildName (e) {    // 添加姓名
      console.log(this.childAll)
    },
    addChildSex (e) {
      console.log(this.childAll)
    },
    addChildId (e) {
      console.log(this.childAll)
    },
    custody (e) {
    },
    printMsg (e) {
      console.log(e)
    }
  }
}
</script>
<style scoped>
.ban{width:220px !important;}
.el-form-item{margin-bottom:10px !important;}
</style>
