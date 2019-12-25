<template>
  <div class="w-full bg-grey-100">
    <div class="container mx-auto">
      <div>
        <div class="my-6">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step :title="item.title" v-for="(item, index) in mokuai" :key="index"  @click.native ="stepClick(index)"></el-step>
          </el-steps>
        </div>
        <div v-for="(mo, key) in mokuai" :key="key">
          <div v-if="active=== key">
            <div>
              <el-form label-position="top" label-width="160px">
                <div class="w-3/5 text-left mx-auto">
                  <!--遍历有几个孩子-->
                  <div>
                    <!--遍历孩子的基本信息-->
                    <div v-for="(item,index) in aa[mo.part]" :key="index">
                      <!-- 大问题块 -->
                      <div>
                        <div v-if="mo.title=='子女状况' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个子女</h2>
                        </div>
                        <div v-if="mo.title=='房产' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">房产{{index+1}}</h2>
                        </div>
                        <div v-if="mo.title=='存款' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔存款</h2>
                        </div>
                        <div v-if="mo.title=='车子' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}辆车子</h2>
                        </div>
                        <div v-if="mo.title=='理财' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔理财</h2>
                        </div>
                        <div v-if="mo.title=='保险' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}份保险</h2>
                        </div>
                        <div v-if="mo.title=='债权' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔债权</h2>
                        </div>
                        <div v-if="mo.title=='债务' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔债务</h2>
                        </div>
                      </div>
                      
                     
                      <!-- 大问题块 -->
                      <div v-for="($item,$index) in item"  :key="$index">
                        <div class="py-2">
                          <el-divider> <h2 class="text-center text-xl">{{$item.title}}</h2></el-divider>
                        </div>
                        
                       
                        <!-- 一级问题块 -->
                        <div v-for="($$item,$$index) in $item.questions" :key="$$index">
                          <div v-if="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
                            <!--日期-精确到日-->
                            <div v-if="$$item.type == 'dateTime_day'">
                              <el-form-item label="">
                                <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-date-picker
                                  v-model="$$item.answer"
                                  type="date"
                                  size="small"
                                  placeholder="选择日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  @change="userAddAnswerAction($$item)"
                                  value-format="yyyy-MM-dd">
                                </el-date-picker>
                              </el-form-item>
                            </div>
                            <!--输入框-文字类型-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='text'">
                              <el-form-item label="" class="text-base">
                                 <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-input
                                  type="text"
                                  class="ban"
                                  v-model="$$item.answer"
                                  size="small"
                                  :placeholder="$$item.placeholder"
                                  @blur="userAddAnswerAction($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--输入框-数字类型（类似身份证号、金额）-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='number'">
                              <el-form-item label="" class="text-base">
                                <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-input
                                  type="number"
                                  class="ban"
                                  v-model="$$item.answer"
                                  size="small"
                                  :placeholder="$$item.placeholder"
                                  @blur="userAddAnswerAction($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--单选框-->
                            <div v-if="$$item.type == 'radio'">
                              <el-form-item label="">
                                <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-radio-group v-model="$$item.answer" @change='userAddAnswerAction($$item)'>
                                  <el-radio :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </div>
                            <!-- 多选框 -->
                            <div v-if="$$item.type == 'checkbox'">
                              <el-form-item label="">
                                <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-checkbox-group v-model="$$item.answer"  @change='userAddAnswerAction($$item)'>
                                  <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                              <div v-if="$$item.grandson">
                                <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                                  <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                      <el-form-item label="" class="text-base">
                                        <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-input
                                          type="text"
                                          class="ban"
                                          v-model="$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$item.placeholder"
                                          @blur="userAddAnswerAction($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--下拉框(单选)-->
                            <div v-if="$$item.type == 'select'">
                              <el-form-item label="">
                                <label slot="label"><span class="px-1 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-select v-model="$$item.answer"  @change='userAddAnswerAction($$item)' size="small">
                                  <el-option
                                    v-for="(s,i) in $$item.listData"
                                    :key="s.value"
                                    :label="s.label"
                                    :value="s.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                            <!--下拉框(多选)-->
                            <div v-if="$$item.type == 'select_multiple'">
                              <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title">
                                <el-select v-model="$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$item)'>
                                  <el-option
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
                              <h2 class="text-sm font-bold">{{$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title}}</h2>
                               <div  v-for="($$$item,$$$index) in $$item.childQuestion" :key="$$$index">
                                 <!--日期-精确到日-->
                                 <div v-if="$$$item.type == 'dateTime_day'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-date-picker
                                       v-model="$$$item.answer"
                                       type="date"
                                       size="small"
                                       placeholder="选择日期"
                                       @change="userAddAnswerAction($$$item)"
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
                                       @change="userAddAnswerAction($$$item)"
                                       type="datetimerange"
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
                                       @change="userAddAnswerAction($$$item)"
                                       type="daterange"
                                       format="yyyy-MM-dd"
                                       value-format="yyyy-MM-dd"
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
                                       @blur="userAddAnswerAction($$$item)"
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
                                       @blur="userAddAnswerAction($$$item)"
                                     ></el-input>
                                   </el-form-item>
                                 </div>
                                 <!--单选框-->
                                 <div v-if="$$$item.type == 'radio'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                     <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                       <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                     </el-radio-group>
                                   </el-form-item>
                                 </div>
                                 <!-- 多选框 -->
                                  <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-checkbox-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                        <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]">
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item :label="$$$$$item.isRequired==false ?'(选填)'+$$$$$item.title:$$$$$item.title" class="text-base">
                                              <el-input
                                                type="text"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                 <!-- 下拉单选 -->
                                 <div v-if="$$$item.type == 'select'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                     <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                       <el-option
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
                                               @change="userAddAnswerAction($$$$item)"
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
                                              @change="userAddAnswerAction($$$$item)"
                                              type="datetimerange"
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
                                              @change="userAddAnswerAction($$$$item)"
                                              type="daterange"
                                              format="yyyy-MM-dd"
                                              value-format="yyyy-MM-dd"
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
                                              @blur="userAddAnswerAction($$$$item)"
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
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                              <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框-->
                                        <div v-if="$$$$item.type == 'select'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
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
                                        <!-- 下拉框多选 -->
                                        <div v-if="$$$$item.type == 'select_multiple'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
                                              <el-option
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
                                 <!-- 下拉多选 -->
                                 <div v-if="$$$item.type == 'select_multiple'">
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
                                        <el-option
                                          v-for="(s,i) in $$$item.listData"
                                          :key="i"
                                          :label="s.label"
                                          :value="s.value">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
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
                                      @change="userAddAnswerAction($$$item)"
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
                                      @change="userAddAnswerAction($$$item)"
                                      type="datetimerange"
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
                                      @change="userAddAnswerAction($$$item)"
                                      type="daterange"
                                      format="yyyy-MM-dd"
                                      value-format="yyyy-MM-dd"
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
                                      @blur="userAddAnswerAction($$$item)"
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
                                      @blur="userAddAnswerAction($$$item)"
                                    ></el-input>
                                  </el-form-item>
                                </div>
                                <!--单选框-->
                                <div v-if="$$$item.type == 'radio'">
                                  <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                    <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                      <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                </div>
                                <!--下拉框-->
                                <div v-if="$$$item.type == 'select'">
                                  <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                    <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                      <el-option
                                        v-for="(s,i) in $$$item.listData"
                                        :key="i"
                                        :label="s.label"
                                        :value="s.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </div>
                                 <!--下拉框(多选)-->
                                <div v-if="$$$item.type == 'select_multiple'">
                                  <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                    <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
                                      <el-option
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
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                        <el-option
                                          v-for="(s,i) in days"
                                          :key="i"
                                          :label="s"
                                          :value="s">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                </div>
                                <!--下拉框选择月几号-->
                                <div v-if="$$$item.type == 'select_day'">
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)" >
                                        <el-option
                                          v-for="(s,i) in days"
                                          :key="i"
                                          :label="s"
                                          :value="s">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                </div>
                                <!--下拉选择一年中哪个月-->
                                <div v-if="$$$item.type == 'select_year'">
                                  <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                    <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                      <el-option
                                        v-for="(s,i) in mon"
                                        :key="i"
                                        :label="s"
                                        :value="s">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                </div>

                                <!-- 三级问题 -->

                                <div v-if="$$$item.questions ">
                                  <h2 class="text-left text-blue-500">{{$$$item.title}}</h2>
                                  <div v-for="($$$$item, $$$$index) in $$$item.questions">
                                     <!--日期-精确到日-->
                                      <div v-if="$$$$item.type == 'dateTime_day'">
                                        <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                          <el-date-picker
                                            v-model="$$$$item.answer"
                                            @change="userAddAnswerAction($$$$item)"
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
                                            @change="userAddAnswerAction($$$$item)"
                                            type="datetimerange"
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
                                            @change="userAddAnswerAction($$$$item)"
                                            type="daterange"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd"
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
                                            @blur="userAddAnswerAction($$$$item)"
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
                                            @blur="userAddAnswerAction($$$$item)"
                                          ></el-input>
                                        </el-form-item>
                                      </div>
                                      <!--单选框-->
                                      <div v-if="$$$$item.type == 'radio'">
                                        <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                          <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                            <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                          </el-radio-group>
                                        </el-form-item>
                                      </div>
                                      <!--下拉框-->
                                      <div v-if="$$$$item.type == 'select'">
                                        <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
                                              v-for="(s,i) in $$$$item.listData"
                                              :key="i"
                                              :label="s.label"
                                              :value="s.value">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                      </div>
                                       <!--下拉框(多选)-->
                                      <div v-if="$$$$item.type == 'select_multiple'">
                                        <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
                                            <el-option
                                              v-for="(s,i) in $$$$item.listData"
                                              :key="i"
                                              :label="s.label"
                                              :value="s.value">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                      </div>
                                      <!--下拉框选择每月几号-->
                                      <div v-if="$$$$item.type == 'select_day_per'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                              <el-option
                                                v-for="(s,i) in days"
                                                :key="i"
                                                :label="s"
                                                :value="s">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                      </div>
                                      <!--下拉框选择月几号-->
                                      <div v-if="$$$$item.type == 'select_day'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                              <el-option
                                                v-for="(s,i) in days"
                                                :key="i"
                                                :label="s"
                                                :value="s">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                      </div>
                                      <!--下拉选择一年中哪个月-->
                                      <div v-if="$$$$item.type == 'select_year'">
                                        <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
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
                      <div>
                        <div v-if="mo.title==='房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(521,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title==='子女状况' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(518,index)">删除孩子</div>
                        </div>
                        <div v-if="mo.title==='存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(637,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title==='车子' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(522,index)">删除车子</div>
                        </div>
                        <div v-if="mo.title==='理财' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(523,index)">删除理财</div>
                        </div>
                        <div v-if="mo.title==='家电' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(636,index)">删除家电</div>
                        </div>
                        <div v-if="mo.title==='保险' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(524,index)">删除保险</div>
                        </div>
                        <div v-if="mo.title==='债权' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(655,index)">删除债权</div>
                        </div>
                        <div v-if="mo.title==='债务' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(656,index)">删除债务</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(521)">添加房产</div>
                      </div>
                      <div v-if="mo.title== '子女状况' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(518)">添加孩子</div>
                      </div>
                      <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(637)">添加存款</div>
                      </div>
                      <div v-if="mo.title== '车子' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(522)">添加车子</div>
                      </div>
                      <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(523)">添加理财</div>
                      </div>
                      <div v-if="mo.title== '家电' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(636)">添加家电</div>
                      </div>
                      <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(524)">添加保险</div>
                      </div>
                      <div v-if="mo.title== '债权' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(655)">添加债权</div>
                      </div>
                      <div v-if="mo.title== '债务' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(656)">添加债务</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        
        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成协议吗？</h2>
          <div class="queren flex mx-auto">
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='quxiao'>
                取消
              </div>
            </div>
            <div class="w-24">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='complate'>
                确认
              </div>
            </div>
          </div>
        </div>
        
        <div v-show="WordShow" class="outputword">
          <h2 class="py-2">离婚协议书</h2>
          <div class="w-full">
            <div class="text-left msg">{{outputWord}}</div>
          </div>
        </div>
        <el-button v-if="active < this.mokuai.length && active > 0" class="my-5" @click="prev">上一步</el-button>
        <el-button v-if="active < this.mokuai.length-1 " class="my-5" @click="next">下一步</el-button>
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">生成协议</el-button>
      </div>
    </div>
  </div>
  
</template>
<script>
  
  import {returnQuestionnaireJson} from '@/api/api/requestLogin.js'    // 查询问卷json
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者房产等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者房产等
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  
  
  export default {
    components: {
      // label_case,
    },
      data () {
          return {
            demo:4,
            hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            a: {

            },
            aa: {
              BasicInformation: [],    //基本信息
              HunYinStatus: [],  // 婚姻状况
              ZiNv: [],  // 子女
              FangChan: [],               // 房产状况
              CunKuan: [],                // 存款
              Car: [],                // 车子
              LiCai: [],                // 理财
              JiaDian: [],                // 家电
              BaoXian: [],          // 保险
              ZhaiQuan: [],         // 债权
              ZhaiWu: [],            // 债务
              QiTaCaiChan: []       // 其他财产
            },           
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1},
              {title: '婚姻状况', part: 'HunYinStatus',id:2}
            ],
            active: 0,
            outputWord: '',
            WordShow: false,
            waitWordShow: true
          }
      },
      name: 'WenJuan2',
      
      mounted () {
        // this.childList();
        this.getBasicInformation() // 查询双方基本信息模块数据
        this.getHunYinStatus()  // 查询婚姻状况模块数据
        this.getZiNvMsg()  // 查询子女模块数据
        this.getFangChanMsg() // 查询房产模块数据
        this.getCunKuanMsg()  // 查询存款模块数据
        this.getCarMsg()   // 查询车子模块数据
        this.getLiCaiMsg()  // 查询理财模块数据
        this.getJiaDianMsg()  // 查询家电模块数据
        this.getBaoXianMsg() // 查询保险模块数据
        this.getZhaiQuanMsg()  // 查询债权模块数据
        this.getZhaiWuMsg()  // 查询债务模块数据
        // this.getShengChengXieYi() // 生成协议弹框
      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        getBasicInformation (){ // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 595}).then((data)=>{  // 查询双方基本信息模块数据
            this.aa.BasicInformation = data.data.data
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getHunYinStatus () {// 查询婚姻状况模块数据
          returnQuestionnaireJson({'qpid': 596}).then((data)=>{  // 查询婚姻状况模块数据
            this.aa.HunYinStatus = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getZiNvMsg () { // 查询子女模块数据
          returnQuestionnaireJson({'qpid': 518}).then((data)=>{ // 查询子女模块数据
            if(data.data.data !== undefined ){
              this.aa.ZiNv = data.data.data
              this.mokuai.push({
                title: '子女状况', 
                part: 'ZiNv',
                id: 3
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getFangChanMsg () {// 查询房产模块数据
          returnQuestionnaireJson({'qpid': 521}).then((data)=>{ // 查询房产模块数据
            if(data.data.data !== undefined ){
              this.aa.FangChan= data.data.data
              this.mokuai.push({
                title: '房产', 
                part: 'FangChan',
                id: 4
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getCunKuanMsg () {// 查询存款模块数据
          returnQuestionnaireJson({'qpid': 637}).then((data)=>{ // 查询存款模块数据
            if(data.data.data !== undefined ){
              this.aa.CunKuan= data.data.data
              this.mokuai.push({
                title: '存款', 
                part: 'CunKuan',
                id: 5
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getCarMsg () { // 查询车子模块数据
          returnQuestionnaireJson({'qpid': 522}).then((data)=>{  // 查询车子模块数据
            if(data.data.data !== undefined ){
              this.aa.Car= data.data.data
              this.mokuai.push({
                title: '车子', 
                part: 'Car',
                id: 6
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getLiCaiMsg () { // 查询理财模块数据
          returnQuestionnaireJson({'qpid': 523}).then((data)=>{  // 查询理财模块数据
            if(data.data.data !== undefined ){
              this.aa.LiCai= data.data.data
              this.mokuai.push({
                title: '理财', 
                part: 'LiCai',
                id: 7
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getJiaDianMsg () { // 查询家电模块数据
          returnQuestionnaireJson({'qpid': 636}).then((data)=>{ // 查询家电模块数据
            if(data.data.data !== undefined ){
              this.aa.JiaDian= data.data.data
              this.mokuai.push({
                title: '家电', 
                part: 'JiaDian',
                id: 8
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getBaoXianMsg (){// 查询保险模块数据
          returnQuestionnaireJson({'qpid': 524}).then((data)=>{  // 查询保险模块数据
            if(data.data.data !== undefined ){
              this.aa.BaoXian= data.data.data
              this.mokuai.push({
                title: '保险', 
                part: 'BaoXian',
                id: 9
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{

          })
        },
        getZhaiQuanMsg (){ // 查询债权模块数据
          returnQuestionnaireJson({'qpid': 655}).then((data)=>{  // 查询债权模块数据
            if(data.data.data !== undefined ){
              this.aa.ZhaiQuan= data.data.data
              this.mokuai.push({
                title: '债权', 
                part: 'ZhaiQuan',
                id: 10
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        getZhaiWuMsg (){ // 查询债务模块数据
          returnQuestionnaireJson({'qpid': 656}).then((data)=>{  // 查询债务模块数据
            if(data.data.data !== undefined ){
              this.aa.ZhaiWu= data.data.data
              this.mokuai.push({
                title: '债务', 
                part: 'ZhaiWu',
                id: 11
              })
              this.mokuai.sort(this.compare('id'));
            }
          }).catch((data)=>{
          })
        },
        // getShengChengXieYi(){  // 最后弹出生成弹框
        //   this.mokuai.push({
        //     title: '生成协议', 
        //     part: 'ShengChengXieYi',
        //     id: 12
        //   })
        //   this.mokuai.sort(this.compare('id'));
        // },

        getZiNv () { // 查询子女模块数据
          returnQuestionnaireJson({'qpid': 518}).then((data)=>{ // 查询子女模块数据
            if(data.data.data !== undefined ){
              this.aa.ZiNv = data.data.data
            }
          }).catch((data)=>{
          })
        },
        getFangChan () {// 查询房产模块数据
          returnQuestionnaireJson({'qpid': 521}).then((data)=>{ // 查询房产模块数据
            if(data.data.data !== undefined ){
              this.aa.FangChan= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getCunKuan () {// 查询存款模块数据
          returnQuestionnaireJson({'qpid': 637}).then((data)=>{ // 查询存款模块数据
            if(data.data.data !== undefined ){
              this.aa.CunKuan= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getCar () { // 查询车子模块数据
          returnQuestionnaireJson({'qpid': 522}).then((data)=>{  // 查询车子模块数据
            if(data.data.data !== undefined ){
              this.aa.Car= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getLiCai () { // 查询理财模块数据
          returnQuestionnaireJson({'qpid': 523}).then((data)=>{  // 查询理财模块数据
            if(data.data.data !== undefined ){
              this.aa.LiCai= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getJiaDian () { // 查询家电模块数据
          returnQuestionnaireJson({'qpid': 636}).then((data)=>{ // 查询家电模块数据
            if(data.data.data !== undefined ){
              this.aa.JiaDian= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getBaoXian (){// 查询保险模块数据
          returnQuestionnaireJson({'qpid': 524}).then((data)=>{  // 查询保险模块数据
            if(data.data.data !== undefined ){
              this.aa.BaoXian= data.data.data
            }
          }).catch((data)=>{

          })
        },
        getZhaiQuan (){ // 查询债权模块数据
          returnQuestionnaireJson({'qpid': 655}).then((data)=>{  // 查询债权模块数据
            if(data.data.data !== undefined ){
              this.aa.ZhaiQuan= data.data.data
            }
          }).catch((data)=>{
          })
        },
        getZhaiWu (){ // 查询债务模块数据
          returnQuestionnaireJson({'qpid': 656}).then((data)=>{  // 查询债务模块数据
            if(data.data.data !== undefined ){
              this.aa.ZhaiWu= data.data.data
            }
          }).catch((data)=>{
          })
        },
        compare(property){
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2
          }
        },
        userAddAnswerAction (e){
          if(e.fornum !== undefined){
            if(Array.isArray(e.answer)){
              userAddAnswer({
                value: JSON.stringify(e.answer),  // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: 6 //用户的问卷id
              }).then((data)=>{
                console.log("保存成功")
              }).catch((data)=>{
                 console.log("保存失败")
              })
            }else{
              userAddAnswer({
                value: e.answer,  // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: 6 //用户的问卷id
              }).then((data)=>{
                console.log("保存成功")
              }).catch((data)=>{
                 console.log("保存失败")
              })
            }
          }else{
             if(Array.isArray(e.answer)){
              userAddAnswer({
                value: JSON.stringify(e.answer),  // 值
                qpid: e.id, // 关联id
                // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: 6 //用户的问卷id
              }).then((data)=>{
                console.log("保存成功")
              }).catch((data)=>{
                 console.log("保存失败")
              })
            }else{
              userAddAnswer({
                value: e.answer,  // 值
                qpid: e.id, // 关联id
                // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: 6 //用户的问卷id
              }).then((data)=>{
                console.log("保存成功")
              }).catch((data)=>{
                 console.log("保存失败")
              })
            }
            
          }
        },
        userAddSelectAnswerAction (e){   // 添加子女或者房产等
            this.$message({
              message:'添加中请稍后……',
              duration: 1000
            });
            userAddSelectAnswer({
              qpid: e,
              quid: 6
            }).then((data)=>{
              if(e==518){
                this.getZiNv()  // 查询子女模块数据
              }else if(e==521){
                this.getFangChan() // 查询房产模块数据
              }else if(e==637){
                this.getCunKuan()  // 查询存款模块数据
              }else if(e==522){
                this.getCar()   // 查询车子模块数据
              }else if(e==523){
                this.getLiCai()  // 查询理财模块数据
              }else if(e==636){
                this.getJiaDian()  // 查询家电模块数据
              }else if(e==524){
                this.getBaoXian() // 查询保险模块数据
              }else if(e==655){
                this.getZhaiQuan()  // 查询债权模块数据
              }else if(e==656){
                this.getZhaiWu()  // 查询债务模块数据
              }
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            }).catch((data)=>{
               this.$message.error('添加失败，请联系管理员');
            })
        },
        userDeleteSelectAnswerAction (e,index) { // 删除子女或者房产等信息
          this.$message({
            message:'删除中请稍后……',
            duration: 1000
          });
          userDeleteSelectAnswer({
            qpid: e,
            quid: 6,
            fornum: index+1
          }).then((data)=>{
            if(e==518){
              this.getZiNv()  // 查询子女模块数据
            }else if(e==521){
              this.getFangChan() // 查询房产模块数据
            }else if(e==637){
              this.getCunKuan()  // 查询存款模块数据
            }else if(e==522){
              this.getCar()   // 查询车子模块数据
            }else if(e==523){
              this.getLiCai()  // 查询理财模块数据
            }else if(e==636){
              this.getJiaDian()  // 查询家电模块数据
            }else if(e==524){
              this.getBaoXian() // 查询保险模块数据
            }else if(e==655){
              this.getZhaiQuan()  // 查询债权模块数据
            }else if(e==656){
              this.getZhaiWu()  // 查询债务模块数据
            }
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }).catch((data)=>{
            this.$message.error('删除失败，请联系管理员');
          })
        },
        // BasicInformation1 () {
        //   return [
        //     {
        //       title: '问题一：男方基本信息',
        //       questions: [
        //         {
        //           title: '1、男方的姓名是？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入姓名',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '2.男方的出生日期是？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、男方的联系方式是？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入联系方式',
        //           input_type: 'number',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '4、男方身份证件类型是？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'select',
        //           placeholder: '请选择证件号',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '居民身份证', value: '1' },
        //             { label: '港澳身份证', value: '2' },
        //             { label: '护照', value: '3' },
        //             { label: '士官证', value: '4' },
        //             { label: '其他', value: '5' }
        //           ]
        //         },
        //         {
        //           title: '证件号码是？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入证件号',
        //           input_type: 'number',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '5、男方的国籍是？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select',
        //           placeholder: '请选择国籍',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '中国', value: '1' },
        //             { label: '美国', value: '2' },
        //             { label: '韩国', value: '3' },
        //             { label: '法国', value: '4' },
        //             { label: '日本', value: '5' },
        //             { label: '英国', value: '6' },
        //             { label: '法国', value: '7' },
        //             { label: '其他', value: '8' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '民族',
        //                 id: '6_1_1',
        //                 isRequired: true,
        //                 type: 'select',
        //                 placeholder: '请选择民族',
        //                 tip: '提示',
        //                 answer: '',
        //                 listData: [
        //                   {value:'1', label:'汉族'},
        //                   {value:'2', label:'蒙古族'},
        //                   {value:'3', label:'回族'},
        //                   {value:'4', label:'藏族'},
        //                   {value:'5', label:'维吾尔族'},
        //                   {value:'6', label:'苗族'},
        //                   {value:'7', label:'彝族'},
        //                   {value:'8', label:'壮族'},
        //                   {value:'9', label:'布依族'},
        //                   {value:'10', label:'朝鲜族'},
        //                   {value:'11', label:'满族'},
        //                   {value:'12', label:'侗族'},
        //                   {value:'13', label:'瑶族'},
        //                   {value:'14', label:'白族'},
        //                   {value:'15', label:'土家族'},
        //                   {value:'16', label:'哈尼族'},
        //                   {value:'17', label:'哈萨克族'},
        //                   {value:'18', label:'傣族'},
        //                   {value:'19', label:'黎族'},
        //                   {value:'20', label:'傈僳族'},
        //                   {value:'21', label:'佤族'},
        //                   {value:'22', label:'畲族'},
        //                   {value:'23', label:'高山族'},
        //                   {value:'24', label:'拉祜族'},
        //                   {value:'25', label:'水族'},
        //                   {value:'26', label:'东乡族'},
        //                   {value:'27', label:'纳西族'},
        //                   {value:'28', label:'景颇族'},
        //                   {value:'29', label:'柯尔克孜族'},
        //                   {value:'30', label:'土族'},
        //                   {value:'31', label:'达翰尔族'},
        //                   {value:'32', label:'么佬族'},
        //                   {value:'33', label:'羌族'},
        //                   {value:'34', label:'布朗族'},
        //                   {value:'35', label:'撒拉族'},
        //                   {value:'36', label:'毛南族'},
        //                   {value:'37', label:'仡佬族'},
        //                   {value:'38', label:'锡伯族'},
        //                   {value:'39', label:'阿昌族'},
        //                   {value:'40', label:'普米族'},
        //                   {value:'41', label:'塔吉克族'},
        //                   {value:'42', label:'怒族'},
        //                   {value:'43', label:'乌孜别克族'},
        //                   {value:'44', label:'俄罗斯族'},
        //                   {value:'45', label:'鄂温克族'},
        //                   {value:'46', label:'德昂族'},
        //                   {value:'47', label:'保安族'},
        //                   {value:'48', label:'裕固族'},
        //                   {value:'49', label:'京族'},
        //                   {value:'50', label:'塔塔尔族'},
        //                   {value:'51', label:'独龙族'},
        //                   {value:'52', label:'鄂伦春族'},
        //                   {value:'53', label:'赫哲族'},
        //                   {value:'54', label:'门巴族'},
        //                   {value:'55', label:'珞巴族'},
        //                   {value:'56', label:'基诺族'},
        //                 ]
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           title: '6、男方住址是？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '与身份证地址一致',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         }

        //       ]
        //     },
        //     {
        //       title: '问题二：女方基本信息',
        //       questions: [
        //         {
        //           title: '1、女方的姓名是？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入姓名',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '2.女方的出生日期是？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、女方的联系方式是？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入联系方式',
        //           input_type: 'number',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '4、女方身份证件类型是？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'select',
        //           placeholder: '请选择证件号',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '居民身份证', value: '1' },
        //             { label: '港澳身份证', value: '2' },
        //             { label: '护照', value: '3' },
        //             { label: '士官证', value: '4' },
        //             { label: '其他', value: '5' }
        //           ]
        //         },
        //         {
        //           title: '证件号码是？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入证件号',
        //           input_type: 'number',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '5、女方的国籍是？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select',
        //           placeholder: '请选择国籍',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '中国', value: '1' },
        //             { label: '美国', value: '2' },
        //             { label: '韩国', value: '3' },
        //             { label: '法国', value: '4' },
        //             { label: '日本', value: '5' },
        //             { label: '英国', value: '6' },
        //             { label: '法国', value: '7' },
        //             { label: '其他', value: '8' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '民族',
        //                 id: '6_1_1',
        //                 isRequired: true,
        //                 type: 'select',
        //                 placeholder: '请选择民族',
        //                 tip: '提示',
        //                 answer: '',
        //                 listData: [
        //                   {value:'1', label:'汉族'},
        //                   {value:'2', label:'蒙古族'},
        //                   {value:'3', label:'回族'},
        //                   {value:'4', label:'藏族'},
        //                   {value:'5', label:'维吾尔族'},
        //                   {value:'6', label:'苗族'},
        //                   {value:'7', label:'彝族'},
        //                   {value:'8', label:'壮族'},
        //                   {value:'9', label:'布依族'},
        //                   {value:'10', label:'朝鲜族'},
        //                   {value:'11', label:'满族'},
        //                   {value:'12', label:'侗族'},
        //                   {value:'13', label:'瑶族'},
        //                   {value:'14', label:'白族'},
        //                   {value:'15', label:'土家族'},
        //                   {value:'16', label:'哈尼族'},
        //                   {value:'17', label:'哈萨克族'},
        //                   {value:'18', label:'傣族'},
        //                   {value:'19', label:'黎族'},
        //                   {value:'20', label:'傈僳族'},
        //                   {value:'21', label:'佤族'},
        //                   {value:'22', label:'畲族'},
        //                   {value:'23', label:'高山族'},
        //                   {value:'24', label:'拉祜族'},
        //                   {value:'25', label:'水族'},
        //                   {value:'26', label:'东乡族'},
        //                   {value:'27', label:'纳西族'},
        //                   {value:'28', label:'景颇族'},
        //                   {value:'29', label:'柯尔克孜族'},
        //                   {value:'30', label:'土族'},
        //                   {value:'31', label:'达翰尔族'},
        //                   {value:'32', label:'么佬族'},
        //                   {value:'33', label:'羌族'},
        //                   {value:'34', label:'布朗族'},
        //                   {value:'35', label:'撒拉族'},
        //                   {value:'36', label:'毛南族'},
        //                   {value:'37', label:'仡佬族'},
        //                   {value:'38', label:'锡伯族'},
        //                   {value:'39', label:'阿昌族'},
        //                   {value:'40', label:'普米族'},
        //                   {value:'41', label:'塔吉克族'},
        //                   {value:'42', label:'怒族'},
        //                   {value:'43', label:'乌孜别克族'},
        //                   {value:'44', label:'俄罗斯族'},
        //                   {value:'45', label:'鄂温克族'},
        //                   {value:'46', label:'德昂族'},
        //                   {value:'47', label:'保安族'},
        //                   {value:'48', label:'裕固族'},
        //                   {value:'49', label:'京族'},
        //                   {value:'50', label:'塔塔尔族'},
        //                   {value:'51', label:'独龙族'},
        //                   {value:'52', label:'鄂伦春族'},
        //                   {value:'53', label:'赫哲族'},
        //                   {value:'54', label:'门巴族'},
        //                   {value:'55', label:'珞巴族'},
        //                   {value:'56', label:'基诺族'},
        //                 ]
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           title: '6、女方住址是？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '与身份证地址一致',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         }

        //       ]
        //     }
        //   ]
        // },
        // HunYinStatus1 () {
        //   return [
        //     {
        //       title: '',
        //       questions: [
        //         {
        //           title: '1、你们是哪天领取结婚证的？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '请选择日期',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '2.你们是在哪个民政局登记的？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '如：河北省石家庄市正定县',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、结婚证字号是多少？',
        //           id: '3',
        //           isRequired: false,
        //           type: 'input',
        //           placeholder: '请输入字号',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '4、你们相识的时间是？',
        //           id: '4',
        //           isRequired: false,
        //           type: 'dateTime_day',
        //           placeholder: '请选择日期',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '5、你们恋爱的时间是？',
        //           id: '5',
        //           isRequired: false,
        //           type: 'dateTime_day',
        //           placeholder: '请选择日期',
        //           tip: '提示',
        //           answer: ''
        //         }
        //       ]
        //     }
        //   ]
        // },
           // ZiNv1 (){
           //    returnQuestionnaireJson({'qpid': 518}).then((data)=>{ // 查询子女模块数据
           //      if(data.data.data !== undefined ){
           //       console.log(data.data.data)
           //        this.mokuai.push({
           //          title: '子女状况', 
           //          part: 'ZiNv',
           //          id: 3
           //        })
           //        this.mokuai.sort(this.compare('id'));
           //      }
           //    }).catch((data)=>{
           //    })
              
           // },
        // ZiNv1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1.孩子的出生日期是？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、孩子的姓名是？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'input',
        //           placeholder: '请输入姓名',
        //           input_type: 'text',
        //           tip: '提示',
        //           answer: ''
        //         },
        //         {
        //           title: '3、孩子的性别是？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男', value: '1' },
        //             { label: '女', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '4、孩子的身份证号是？',
        //           id: '4',
        //           isRequired: false,
        //           type: 'input',
        //           placeholder: '请输入身份证号',
        //           input_type: 'number',
        //           tip: '提示',
        //           answer: ''
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：抚养权归属',
        //       questions: [
        //         {
        //           title: '5、孩子归谁抚养？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '共同抚养', value: '3' }
        //           ]
        //         },
        //         {
        //           title: '6、共同抚养怎么规定？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '具体时间双发自行协商', value: '1' },
        //             { label: '轮流循环抚养', value: '2' },
        //             { label: '按阶段分别抚养', value: '3' }
        //           ],
        //           childQuestion: {
        //             2: [
        //               {
        //                 title: '归男方的时间',
        //                 id: '6_2_1',
        //                 isRequired: true,
        //                 type: 'dateTime_Day_Interval',
        //                 placeholder: '男方抚养时间',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '归女方的时间',
        //                 id: '6_2_2',
        //                 isRequired: true,
        //                 type: 'dateTime_Day_Interval',
        //                 placeholder: '女方抚养时间',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             3: [
        //               {
        //                 title: '归男方的时间',
        //                 id: '6_3_1',
        //                 isRequired: true,
        //                 type: 'dateTime_Day_Interval',
        //                 placeholder: '男方抚养时间',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '归女方的时间',
        //                 id: '6_3_2',
        //                 isRequired: true,
        //                 type: 'dateTime_Day_Interval',
        //                 placeholder: '女方抚养时间',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           },
        //           requireQidAndAnswer: { id: '5', answer: '3' }
        //         },
        //         {
        //           title: '7、女方是否支付抚养费？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '', //提示语
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
        //           requireQidAndAnswer: { id: '5', answer: '1' }
        //         },
        //         {
        //           title: '8、支付抚养费的方式？',
        //           id: '8',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '一次性支付', value: '1' },
        //             { label: '按月支付', value: '2' },
        //             { label: '按季度支付', value: '3' },
        //             { label: '按年支付', value: '4' }
        //           ],
        //           childQuestion: {
        //              1: [
        //                {
        //                  title: '时间',
        //                  id: '8_1_1',
        //                  isRequired: true,
        //                  type: 'dateTime_day',
        //                  tip: '',
        //                  answer: ''
        //                },
        //                {
        //                  title: '抚养费总额',
        //                  id: '8_1_2',
        //                  isRequired: true,
        //                  type: 'input',
        //                  placeholder: '请输入抚养费总额',
        //                  input_type: 'number',
        //                  tip: '提示',
        //                  answer: ''
        //                }
        //              ],
        //              2: [
        //               {
        //                 title: '每月',
        //                 id: '8_1_1',
        //                 isRequired: true,
        //                 type: 'select_day_per',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '月抚养费总额',
        //                 id: '8_1_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入月抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //              3: [
        //               {
        //                 title: '每季度',
        //                 id: '8_3_1',
        //                 isRequired: true,
        //                 type: 'select',
        //                 tip: '',
        //                 answer: '',
        //                 listData: [
        //                   { label: '1', value: '1' },
        //                   { label: '2', value: '2' },
        //                   { label: '3', value: '3' }
        //                 ]
        //               },
        //               {
        //                 title: '月',
        //                 id: '8_3_2',
        //                 isRequired: true,
        //                 type: 'select_day',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '季度抚养费总额',
        //                 id: '8_3_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入季度抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //              4: [
        //               {
        //                 title: '每年',
        //                 id: '8_4_1',
        //                 isRequired: true,
        //                 type: 'select_year',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '月',
        //                 id: '8_4_2',
        //                 isRequired: true,
        //                 type: 'select_day',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '年度抚养费总额',
        //                 id: '8_4_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入季度抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           },
        //           requireQidAndAnswer: { id: '7', answer: '1' }
        //         },
        //         {
        //           title: '9、支付到哪个账户？',
        //           id: '9',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '开户名',
        //               id: '9_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '9_2',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '9_3',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '7', answer: '1' }
        //         },
        //         {
        //           title: '10、支付到什么时候？',
        //           id: '10',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '孩子年满十八周岁', value: '1' },
        //             { label: '孩子大学毕业', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '具体支付时间',
        //                 id: '10_2',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 tip: '',
        //                 answer: ''
        //               }
        //             ]
        //           },
        //           requireQidAndAnswer: { id: '7', answer: '1' }
        //         },
        //         {
        //           title: '11、男方是否支付抚养费？',
        //           id: '11',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '', //提示语
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
        //           requireQidAndAnswer: { id: '5', answer: '2' }
        //         },
        //         {
        //           title: '12、支付抚养费的方式？',
        //           id: '12',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '一次性支付', value: '1' },
        //             { label: '按月支付', value: '2' },
        //             { label: '按季度支付', value: '3' },
        //             { label: '按年支付', value: '4' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '时间',
        //                 id: '8_1_1',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '抚养费总额',
        //                 id: '8_1_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             2: [
        //               {
        //                 title: '每月',
        //                 id: '8_1_1',
        //                 isRequired: true,
        //                 type: 'select_day_per',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '月抚养费总额',
        //                 id: '8_1_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入月抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             3: [
        //               {
        //                 title: '每季度',
        //                 id: '8_3_1',
        //                 isRequired: true,
        //                 type: 'select',
        //                 tip: '',
        //                 answer: '',
        //                 listData: [
        //                   { label: '1', value: '1' },
        //                   { label: '2', value: '2' },
        //                   { label: '3', value: '3' }
        //                 ]
        //               },
        //               {
        //                 title: '月',
        //                 id: '8_3_2',
        //                 isRequired: true,
        //                 type: 'select_day',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '季度抚养费总额',
        //                 id: '8_3_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入季度抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             4: [
        //               {
        //                 title: '每年',
        //                 id: '8_4_1',
        //                 isRequired: true,
        //                 type: 'select_year',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '月',
        //                 id: '8_4_2',
        //                 isRequired: true,
        //                 type: 'select_day',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '年度抚养费总额',
        //                 id: '8_4_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请输入季度抚养费总额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           },
        //           requireQidAndAnswer: { id: '11', answer: '1' }
        //         },
        //         {
        //           title: '13、支付到哪个账户？',
        //           id: '13',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '开户名',
        //               id: '13_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '13_2',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '13_3',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '11', answer: '1' }
        //         },
        //         {
        //           title: '14、支付到什么时候？',
        //           id: '14',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '孩子年满十八周岁', value: '1' },
        //             { label: '孩子大学毕业', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '具体支付时间',
        //                 id: '14_2',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 tip: '',
        //                 answer: ''
        //               }
        //             ]
        //           },
        //           requireQidAndAnswer: { id: '11', answer: '1' }
        //         },
        //         {
        //           title: '是否明确约定女方探望时间？',
        //           id: '15',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '提示333',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           requireQidAndAnswer: { id: '5', answer: '1' }
        //         },
        //         {
        //           title: '16、怎么探望？',
        //           id: '16',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '日常探望时间',
        //               id: '16_1',
        //               isRequired: true,
        //               type: 'select',
        //               placeholder: '请选择探望时间',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 {
        //                   label: '随时探望',
        //                   value: '1'
        //                 },
        //                 {
        //                   label: '定时探望',
        //                   value: '2'
        //                 }
        //               ],
        //               grandson: {
        //                 2: [
        //                   {
        //                     title: '每',
        //                     id: '16_1_2_1',
        //                     isRequired: true,
        //                     type: 'select',
        //                     tip: '',
        //                     answer: '',
        //                     listData: [
        //                       {
        //                         label: '周',
        //                         value: '1'
        //                       },
        //                       {
        //                         label: '月',
        //                         value: '2'
        //                       },
        //                       {
        //                         label: '年',
        //                         value: '3'
        //                       }
        //                     ]
        //                   },
        //                   {
        //                     title: '探望次数',
        //                     id: '16_1_2_2',
        //                     isRequired: true,
        //                     type: 'select',
        //                     tip: '',
        //                     answer: '',
        //                     listData: [
        //                       {
        //                         label: '1',
        //                         value: '1'
        //                       },
        //                       {
        //                         label: '2',
        //                         value: '2'
        //                       },
        //                       {
        //                         label: '3',
        //                         value: '3'
        //                       },
        //                       {
        //                         label: '4',
        //                         value: '4'
        //                       },
        //                       {
        //                         label: '5',
        //                         value: '5'
        //                       }
        //                     ]
        //                   },
        //                   {
        //                     title: '每次',
        //                     id: '16_1_2_3',
        //                     isRequired: true,
        //                     type: 'dateTime_Time_Interval',
        //                     tip: '',
        //                     answer: ''
        //                   }
        //                 ]
        //               }
        //             },
        //             {
        //               title: '寒暑假探望时间',
        //               id: '16_2',
        //               isRequired: true,
        //               type: 'select',
        //               placeholder: '请选择探望时间',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 {
        //                   label: '双方协商确定',
        //                   value: '1'
        //                 },
        //                 {
        //                   label: '具体日期',
        //                   value: '2'
        //                 }
        //               ],
        //               grandson: {
        //                 2: [
        //                   {
        //                     title: '具体探望时间',
        //                     id: '16_2_2',
        //                     isRequired: true,
        //                     type: 'dateTime_Day_Interval',
        //                     tip: '',
        //                     answer: ''
        //                   }
        //                 ]
        //               }
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '15', answer: '1' }
        //         },
        //         {
        //           title: '是否明确约定女方探望时间？',
        //           id: '17',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '提示333',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           requireQidAndAnswer: { id: '5', answer: '2' }
        //         },
        //         {
        //           title: '18、怎么探望？',
        //           id: '18',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '日常探望时间',
        //               id: '16_1',
        //               isRequired: true,
        //               type: 'select',
        //               placeholder: '请选择探望时间',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 {
        //                   label: '随时探望',
        //                   value: '1'
        //                 },
        //                 {
        //                   label: '定时探望',
        //                   value: '2'
        //                 }
        //               ],
        //               grandson: {
        //                 2: [
        //                   {
        //                     title: '每',
        //                     id: '16_1_2_1',
        //                     isRequired: true,
        //                     type: 'select',
        //                     tip: '',
        //                     answer: '',
        //                     listData: [
        //                       {
        //                         label: '周',
        //                         value: '1'
        //                       },
        //                       {
        //                         label: '月',
        //                         value: '2'
        //                       },
        //                       {
        //                         label: '年',
        //                         value: '3'
        //                       }
        //                     ]
        //                   },
        //                   {
        //                     title: '探望次数',
        //                     id: '16_1_2_2',
        //                     isRequired: true,
        //                     type: 'select',
        //                     tip: '',
        //                     answer: '',
        //                     listData: [
        //                       {
        //                         label: '1',
        //                         value: '1'
        //                       },
        //                       {
        //                         label: '2',
        //                         value: '2'
        //                       },
        //                       {
        //                         label: '3',
        //                         value: '3'
        //                       },
        //                       {
        //                         label: '4',
        //                         value: '4'
        //                       },
        //                       {
        //                         label: '5',
        //                         value: '5'
        //                       }
        //                     ]
        //                   },
        //                   {
        //                     title: '每次',
        //                     id: '16_1_2_3',
        //                     isRequired: true,
        //                     type: 'dateTime_Time_Interval',
        //                     tip: '',
        //                     answer: ''
        //                   }
        //                 ]
        //               }
        //             },
        //             {
        //               title: '寒暑假探望时间',
        //               id: '16_2',
        //               isRequired: true,
        //               type: 'select',
        //               placeholder: '请选择探望时间',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 {
        //                   label: '双方协商确定',
        //                   value: '1'
        //                 },
        //                 {
        //                   label: '具体日期',
        //                   value: '2'
        //                 }
        //               ],
        //               grandson: {
        //                 2: [
        //                   {
        //                     title: '具体探望时间',
        //                     id: '16_2_2',
        //                     isRequired: true,
        //                     type: 'dateTime_Day_Interval',
        //                     tip: '',
        //                     answer: ''
        //                   }
        //                 ]
        //               }
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '17', answer: '1' }
        //         },
        //       ]
        //     }
        //   ]
        // },
        // FangChan1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '房子的地址是',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2.什么时间购买的？',
        //           id: '2',
        //           isRequired: false,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、由谁出钱购买？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select_multiple',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '男方' },
        //             { label: '男方父母', value: '男方父母' },
        //             { label: '女方', value: '女方' },
        //             { label: '女方父母', value: '女方父母' },
        //             { label: '双方', value: '双方' },
        //             { label: '双方父母', value: '双方父母' }
        //           ]
        //         },
        //         {
        //           title: '4、全款还是贷款？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '全款', value: '1' },
        //             { label: '贷款', value: '2' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '全款额多少？',
        //                 id: '4_1_1',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '￥，请输入金额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //             ],
        //             2: [
        //               {
        //                 title: '首付金额多少？',
        //                 id: '4_2_1',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '￥，请输入金额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '剩余贷款多少多少？',
        //                 id: '4_2_2',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '￥，请输入金额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //             ]
        //           }
        //         },
        //         {
        //           title: '5、有没有房产证？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '无', value: '1' },
        //             { label: '有', value: '2' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '以谁的名义签订的购房合同？',
        //                 id: '5_1_1',
        //                 isRequired: true,
        //                 type: 'select',
        //                 tip: '',
        //                 answer: '',
        //                 listData: [
        //                   { label: '男方', value: '1' },
        //                   { label: '女方', value: '2' },
        //                   { label: '双方', value: '2' }
        //                 ]
        //               },
        //               {
        //                 title: '与谁签订的购房合同',
        //                 id: '5_1_2',
        //                 isRequired: false,
        //                 type: 'input',
        //                 input_type: 'text',
        //                 placeholder: '',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '合同全称',
        //                 id: '5_1_3',
        //                 isRequired: false,
        //                 type: 'input',
        //                 input_type: 'text',
        //                 placeholder: '',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             2: [
        //               {
        //                 title: '房产证号',
        //                 id: '5_2_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 input_type: 'number',
        //                 placeholder: '男方抚养时间',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '房子登记在谁名下',
        //                 id: '5_2_2',
        //                 isRequired: true,
        //                 type: 'select',
        //                 tip: '',
        //                 answer: '',
        //                 listData: [
        //                   { label: '男方', value: '男方' },
        //                   { label: '女方', value: '女方' },
        //                   { label: '双方', value: '双方' }
        //                 ]
        //               },
        //               {
        //                 title: '男方拥有份额',
        //                 id: '5_2_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 input_type: 'number',
        //                 tip: '',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有份额',
        //                 id: '5_2_4',
        //                 isRequired: true,
        //                 type: 'input',
        //                 input_type: 'number',
        //                 tip: '',
        //                 answer: ''
        //               }
        //             ]
        //           }
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后房子归属',
        //       questions: [
        //         {
        //           title: '6、离婚后房子归谁？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select_multiple',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '男方' },
        //             { label: '女方', value: '女方' },
        //             { label: '孩子', value: '孩子' }
        //           ]
        //         },
        //         {
        //           title: '7、是否支付对方补偿款？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '8、剩余贷款由谁偿还？',
        //           id: '8',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '', //提示语
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '双方', value: '3' }
        //           ]
        //           //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
        //         },
        //         {
        //           title: '9、是否约定过户更名事宜？',
        //           id: '9',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '不涉及更名问题，无需根明过户', value: '0' },
        //             { label: '需要更名过户，需约定具体事宜', value: '1' }
        //           ]
        //         },
        //         {
        //           title: '10、剩余贷款由谁偿还？',
        //           id: '10',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '', //提示语
        //           answer: '',
        //           listData: [
        //             { label: '随房走', value: '1' },
        //             { label: '另行约定', value: '2' }
        //           ]
        //           //此条问题（7.女方是否支付抚养费？） 是否出现 是根据id为6的问题的值来确定，如果第6条（6.孩子归谁抚养？）问题选择的值是1，那么此条数据需要显示
        //         }
        //       ]
        //     }
        //   ]
        // },
        // CunKuan1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、存款在谁名下？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '双方都有', value: '3' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '存款银行',
        //                 id: '1_1_1',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '请选择银行',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '存款账号',
        //                 id: '1_1_2',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '请输入账号',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '以上存款共计人民币多少？',
        //                 id: '1_1_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '￥，请输入金额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             2: [
        //               {
        //                 title: '存款银行',
        //                 id: '1_1_1',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '请选择银行',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '存款账号',
        //                 id: '1_1_2',
        //                 isRequired: false,
        //                 type: 'input',
        //                 placeholder: '请输入账号',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '以上存款共计人民币多少？',
        //                 id: '1_1_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '￥，请输入金额',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             3: [
        //               {
        //                 title: '男方名下存款',
        //                 questions: [
        //                   {
        //                     title: '存款银行',
        //                     id: '1_1_1',
        //                     isRequired: false,
        //                     type: 'input',
        //                     placeholder: '请选择银行',
        //                     input_type: 'text',
        //                     tip: '提示',
        //                     answer: ''
        //                   },
        //                   {
        //                     title: '存款账号',
        //                     id: '1_1_2',
        //                     isRequired: false,
        //                     type: 'input',
        //                     placeholder: '请输入账号',
        //                     input_type: 'number',
        //                     tip: '提示',
        //                     answer: ''
        //                   },
        //                   {
        //                     title: '以上存款共计人民币多少？',
        //                     id: '1_1_3',
        //                     isRequired: true,
        //                     type: 'input',
        //                     placeholder: '￥，请输入金额',
        //                     input_type: 'number',
        //                     tip: '提示',
        //                     answer: ''
        //                   }
        //                 ]
        //               },
        //               {
        //                 title: '女方名下存款',
        //                 questions: [
        //                   {
        //                     title: '存款银行',
        //                     id: '1_1_1',
        //                     isRequired: false,
        //                     type: 'input',
        //                     placeholder: '请选择银行',
        //                     input_type: 'text',
        //                     tip: '提示',
        //                     answer: ''
        //                   },
        //                   {
        //                     title: '存款账号',
        //                     id: '1_1_2',
        //                     isRequired: false,
        //                     type: 'input',
        //                     placeholder: '请输入账号',
        //                     input_type: 'number',
        //                     tip: '提示',
        //                     answer: ''
        //                   },
        //                   {
        //                     title: '以上存款共计人民币多少？',
        //                     id: '1_1_3',
        //                     isRequired: true,
        //                     type: 'input',
        //                     placeholder: '￥，请输入金额',
        //                     input_type: 'number',
        //                     tip: '提示',
        //                     answer: ''
        //                   }
        //                 ]
        //               }
        //             ]
        //           }
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后存款归属',
        //       questions: [
        //         {
        //           title: '2、离婚后存款归谁？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '男方和女方', value: '3' },
        //             { label: '孩子', value: '4' },
        //             { label: '男方和孩子', value: '5' },
        //             { label: '女方和孩子', value: '6' },
        //             { label: '男方、女方和孩子', value: '7' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_1_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             2: [
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_2_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             3: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_3_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_3_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             4: [
        //               {
        //                 title: '孩子拥有数额',
        //                 id: '2_4_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_4_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             5: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_5_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_5_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_5_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             6: [
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_6_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_6_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_6_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             7: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_7_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_7_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_7_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_7_4',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //           }
        //         },
        //         {
        //           title: '3、是否约定存款分割履行时间？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '无需约定/双方另行约定', value: '1' },
        //             { label: '本协议生效之日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '具体履行时间是',
        //                 id: '3_3_1',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 placeholder: '请填写具体履行时间',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // Car1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、花多少钱购买的？',
        //           id: '1',
        //           isRequired: false,
        //           type: 'input',
        //           input_type: 'number',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、什么时间购买的？',
        //           id: '2',
        //           isRequired: false,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、由谁出钱购买?（可多选）',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select_multiple',
        //           tip: '',
        //           answer: [],
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '男方父母', value: '2' },
        //             { label: '女方', value: '3' },
        //             { label: '女方父母', value: '4' },
        //             { label: '双方', value: '5' },
        //             { label: '双方父母', value: '6' }
        //           ]
        //         },
        //         {
        //           title: '4、车子登记在谁名下？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '5、车子的品牌是？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '6、车子的型号是？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '7、车子的种类是？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '小型汽车', value: '1' },
        //             { label: '客车', value: '2' },
        //             { label: '货车', value: '3' },
        //             { label: '三轮车', value: '4' },
        //             { label: '两轮摩托车', value: '5' },
        //             { label: '电车', value: '6' }
        //           ]
        //         },
        //         {
        //           title: '8、车牌号是多少？',
        //           id: '8',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后车子归属',
        //       questions: [
        //         {
        //           title: '9、离婚后车子归谁？',
        //           id: '9',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: [],
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '孩子', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '孩子的姓名',
        //                 id: '9_3_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写孩子的姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           title: '10、是否支付对方补偿款？',
        //           id: '10',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '（1）支付多少补偿',
        //                 id: '10_1_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '如：男方支付女方2000元',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '（2）什么时候支付',
        //                 id: '10_1_2',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 placeholder: '选择支付时间',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //               title: '（3）收款账户 开户名',
        //               id: '10_1_3',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '10_1_4',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '10_1_5',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //             ]
        //           }
        //         },
        //         {
        //           title: '11、是否约定车子分割履行时间？',
        //           id: '11',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '不涉及更名问题，无需更名过户', value: '1' },
        //             { label: '需要更名过户，需约定具体事宜', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '12、什么时间更名过户',
        //           id: '12',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '双方协商确定', value: '1' },
        //             { label: '符合过户条件即日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           requireQidAndAnswer: { id: '11', answer: '2' }
        //         },
        //         {
        //           title: '具体时间？',
        //           id: '13',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '选择具体时间',
        //           tip: '',
        //           answer: '',
        //           requireQidAndAnswer: { id: '12', answer: '3' }
        //         },
        //         {
        //           title: '14、谁承担过户费',
        //           id: '14',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '双方', value: '3' }
        //           ],
        //           requireQidAndAnswer: { id: '11', answer: '2' }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // LiCai1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、理财机构是？',
        //           id: '1',
        //           isRequired: false,
        //           type: 'input',
        //           input_type: 'text',
        //           placeholder: '填写机构名称即可',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、理财数额共计人民币多少元？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'number',
        //           placeholder: '如：5000',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、在谁名下？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后理财归属',
        //       questions: [
        //         {
        //           title: '4、离婚后这项理财归谁？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '男方和女方', value: '3' },
        //             { label: '孩子', value: '4' },
        //             { label: '男方和孩子', value: '5' },
        //             { label: '女方和孩子', value: '6' },
        //             { label: '男方、女方和孩子', value: '7' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_1_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             2: [
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_2_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             3: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_3_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_3_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             4: [
        //               {
        //                 title: '孩子拥有数额',
        //                 id: '2_4_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_4_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             5: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_5_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_5_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_5_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             6: [
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_6_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_6_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_6_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //             7: [
        //               {
        //                 title: '男方拥有数额',
        //                 id: '2_7_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有数额',
        //                 id: '2_7_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子方拥有数额',
        //                 id: '2_7_3',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如：80',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '孩子的姓名',
        //                 id: '2_7_4',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '请填写孩子姓名',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ],
        //           }
        //         },
        //         {
        //           title: '5、是否约定理财的分割时间',
        //           id: '5',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '无需约定/双方另行约定', value: '1' },
        //             { label: '本协议生效之日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ]
        //         },
        //         {
        //           title: '6具体时间？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '选择具体时间',
        //           tip: '',
        //           answer: '',
        //           requireQidAndAnswer: { id: '5', answer: '3' }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // JiaDian1 () {
        //   return [
        //     {
        //       title: '',
        //       questions: [
        //         {
        //           title: '1、需要分割的家电名称、数量和归属？',
        //           id: '1',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '名称、数量',
        //               id: '1_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '（示例：iphoneX手机一部）',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '归谁所有',
        //               id: '1_2',
        //               isRequired: true,
        //               type: 'select',
        //               placeholder: '',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             }
        //           ]
        //         },
        //         {
        //           title: '2、价值共计多少？',
        //           id: '2',
        //           isRequired: false,
        //           type: 'input',
        //           input_type: 'number',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、是否支付对方差价？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ]
        //         },
        //         {
        //           title: '4、支付多少差价？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '',
        //               id: '4_1',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '支付',
        //               id: '4_2',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '差价',
        //               id: '4_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'number',
        //               placeholder: '￥，支付多少钱',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '3', answer: '1' }
        //         },
        //         {
        //           title: '（2）、什么时候支付',
        //           id: '5',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '无需约定/双方另行约定', value: '1' },
        //             { label: '本协议生效之日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           requireQidAndAnswer: { id: '3', answer: '1' }
        //         },
        //         {
        //           title: '具体时间？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '选择具体时间',
        //           tip: '',
        //           answer: '',
        //           requireQidAndAnswer: { id: '5', answer: '3' }
        //         },
        //         {
        //           title: '(3)、收款账户？',
        //           id: '9',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '开户名',
        //               id: '9_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '9_2',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '9_3',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '3', answer: '1' }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // BaoXian1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、保险的名称是？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、哪个保险公司的保险？',
        //           id: '2',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '3、保险数额多少？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'number',
        //           placeholder: '￥，请输入金额，如：50000',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '4、什么时间投保的？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '5、投保人是谁？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '6、被保险人姓名？',
        //           id: '6',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '7、受益人姓名？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后保险收益归属',
        //       questions: [
        //         {
        //           title: '8、离婚后保险归谁？',
        //           id: '8',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '孩子', value: '3' }
        //           ]
        //         },
        //         {
        //           title: '9、剩余保费谁承担？',
        //           id: '9',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' }
        //           ]
        //         },
        //         {
        //           title: '10、是否支付对方补偿款？',
        //           id: '10',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ],
        //           childQuestion: {
        //             1: [
        //               {
        //                 title: '（1）支付多少补偿',
        //                 id: '10_1_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '如：男方支付女方2000元',
        //                 input_type: 'text',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '（2）什么时候支付',
        //                 id: '10_1_2',
        //                 isRequired: true,
        //                 type: 'dateTime_day',
        //                 placeholder: '选择支付时间',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //               title: '（3）收款账户 开户名',
        //               id: '10_1_3',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '10_1_4',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '10_1_5',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //             ]
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // ZhaiQuan1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、别人欠/借你们多少钱？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'number',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、欠款/借款人姓名？',
        //           id: '2',
        //           isRequired: false,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后债权归属(谁负责找欠钱的人还钱)',
        //       questions: [
        //         {
        //           title: '3、离婚后谁负责向欠款/借款人收回欠款/借款？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: [],
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '双方共同', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '男方拥有份额',
        //                 id: '3_3_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如50%',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方拥有份额',
        //                 id: '3_3_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如50%',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           title: '4、是否支付对方补偿款？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ]
        //         },
        //         {
        //           title: '（1）、支付多少差价？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '',
        //               id: '5_1',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '支付',
        //               id: '5_2',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '差价',
        //               id: '5_3',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'number',
        //               placeholder: '￥，支付多少钱',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         },
        //         {
        //           title: '（2）、什么时候支付',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '无需约定/双方另行约定', value: '1' },
        //             { label: '本协议生效之日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         },
        //         {
        //           title: '具体时间？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '选择具体时间',
        //           tip: '',
        //           answer: '',
        //           requireQidAndAnswer: { id: '6', answer: '3' }
        //         },
        //         {
        //           title: '(3)、收款账户？',
        //           id: '8',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '开户名',
        //               id: '8_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '8_2',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '8_3',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // ZhaiWu1 () {
        //   return [
        //     {
        //       title: '问题一：基本信息',
        //       questions: [
        //         {
        //           title: '1、我们欠/借别人多少钱？',
        //           id: '1',
        //           isRequired: true,
        //           type: 'input',
        //           input_type: 'number',
        //           tip: '',
        //           answer: ''
        //         },
        //         {
        //           title: '2、欠了/借了谁的钱？',
        //           id: '2',
        //           isRequired: false,
        //           type: 'input',
        //           input_type: 'text',
        //           tip: '',
        //           answer: ''
        //         }
        //       ]
        //     },
        //     {
        //       title: '问题二：离婚后债务承担',
        //       questions: [
        //         {
        //           title: '3、离婚后谁负责还债？',
        //           id: '3',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '',
        //           answer: [],
        //           listData: [
        //             { label: '男方', value: '1' },
        //             { label: '女方', value: '2' },
        //             { label: '双方共同', value: '3' }
        //           ],
        //           childQuestion: {
        //             3: [
        //               {
        //                 title: '男方承担份额',
        //                 id: '3_3_1',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如50%',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               },
        //               {
        //                 title: '女方承担份额',
        //                 id: '3_3_2',
        //                 isRequired: true,
        //                 type: 'input',
        //                 placeholder: '填写百分比，如50%',
        //                 input_type: 'number',
        //                 tip: '提示',
        //                 answer: ''
        //               }
        //             ]
        //           }
        //         },
        //         {
        //           title: '4、是否支付对方补偿款？',
        //           id: '4',
        //           isRequired: true,
        //           type: 'radio',
        //           tip: '',
        //           answer: '',
        //           listData: [
        //             { label: '是', value: '1' },
        //             { label: '否', value: '0' }
        //           ]
        //         },
        //         {
        //           title: '（1）、支付多少差价？',
        //           id: '5',
        //           isRequired: true,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '',
        //               id: '5_1',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '支付',
        //               id: '5_2',
        //               isRequired: true,
        //               type: 'select',
        //               tip: '',
        //               answer: '',
        //               listData: [
        //                 { label: '男方', value: '1' },
        //                 { label: '女方', value: '2' }
        //               ]
        //             },
        //             {
        //               title: '差价',
        //               id: '5_3',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'number',
        //               placeholder: '￥，支付多少钱',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         },
        //         {
        //           title: '（2）、什么时候支付',
        //           id: '6',
        //           isRequired: true,
        //           type: 'select',
        //           tip: '提示',
        //           answer: '',
        //           listData: [
        //             { label: '无需约定/双方另行约定', value: '1' },
        //             { label: '本协议生效之日起', value: '2' },
        //             { label: '具体时间', value: '3' }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         },
        //         {
        //           title: '具体时间？',
        //           id: '7',
        //           isRequired: true,
        //           type: 'dateTime_day',
        //           placeholder: '选择具体时间',
        //           tip: '',
        //           answer: '',
        //           requireQidAndAnswer: { id: '6', answer: '3' }
        //         },
        //         {
        //           title: '(3)、收款账户？',
        //           id: '8',
        //           isRequired: false,
        //           type: 'question',
        //           tip: '',
        //           childQuestion: [
        //             {
        //               title: '开户名',
        //               id: '8_1',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '请输姓名，如：刘德华',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '银行名称',
        //               id: '8_2',
        //               isRequired: true,
        //               type: 'input',
        //               input_type: 'text',
        //               placeholder: '如：中国工商银行(建外大街支行)',
        //               tip: '',
        //               answer: ''
        //             },
        //             {
        //               title: '账号',
        //               id: '8_3',
        //               isRequired: true,
        //               type: 'input',
        //               placeholder: '请输入银行卡号',
        //               input_type: 'number',
        //               tip: '',
        //               answer: ''
        //             }
        //           ],
        //           requireQidAndAnswer: { id: '4', answer: '1' }
        //         }
        //       ]
        //     }
        //   ]
        // },
        childList (e) {
          this.$forceUpdate();
          // this.aa.BasicInformation = [];
          // this.$set(this.aa.BasicInformation, 1, this.BasicInformation1())
          // this.aa.HunYinStatus = [];
          // this.$set(this.aa.HunYinStatus, 1, this.HunYinStatus1())
          // this.aa.ZiNv = [];
          // this.$set(this.aa.ZiNv, this.ZiNv1())
          // console.log(this.aa.ZiNv)
          // this.aa.CunKuan = [];
          // this.$set(this.aa.CunKuan, this.CunKuan1())
          // this.aa.FangChan = [];
          // this.$set(this.aa.FangChan, this.FangChan1())
          // this.aa.CunKuan = [];
          // this.$set(this.aa.CunKuan, this.CunKuan1())
          // this.aa.Car = [];
          // this.$set(this.aa.Car, this.Car1())
          // this.aa.LiCai = [];
          // this.$set(this.aa.LiCai, this.LiCai1())
          // this.aa.JiaDian = [];
          // this.$set(this.aa.JiaDian, this.JiaDian1())
          // this.aa.BaoXian = [];
          // this.$set(this.aa.BaoXian, this.BaoXian1())
          // this.aa.ZhaiQuan = [];
          // this.$set(this.aa.ZhaiQuan, this.ZhaiQuan1())
          // this.aa.ZhaiWu = [];
          // this.$set(this.aa.ZhaiWu, this.ZhaiWu1())
        },
        // addZiNv () { // 添加房产
        //   this.aa.ZiNv.push(this.ZiNv1())
        //   alert('添加第'+this.aa.ZiNv.length+'个孩子')
        // },
        // removeZiNv (index) {  // 删除房产
        //   this.aa.ZiNv.splice(index,1)
        //   alert('删除第'+(index+1)+'个孩子')
        // },
        // addFangChan () { // 添加房产
        //   this.aa.FangChan.push(this.FangChan1())
        //   alert('添加第'+this.aa.FangChan.length+'套房产')
        // },
        // removeFangChan (index) {  // 删除房产
        //   this.aa.FangChan.splice(index,1)
        //   alert('删除第'+(index+1)+'套房产')
        // },
        
        // addCunKuan () {  
        //   this.aa.CunKuan.push(this.CunKuan1())
        //   alert('添加第'+this.aa.CunKuan.length+'笔存款')
        // },
        // removeCunKuan (index) {
        //   this.aa.CunKuan.splice(index,1)
        //   alert('删除第'+(index+1)+'笔存款')
        // },
        
        // addCar () {
        //   this.aa.Car.push(this.Car1())
        //   alert('添加第'+this.aa.Car.length+'辆车子')
        // },
        // removeCar (index) {
        //   this.aa.Car.splice(index,1)
        //   alert('删除第'+(index+1)+'辆车子')
        // },
        // addLiCai () {
        //   this.aa.LiCai.push(this.LiCai1())
        //   alert('添加第'+this.aa.LiCai.length+'笔理财')
        // },
        // removeLiCai (index) {
        //   this.aa.LiCai.splice(index,1)
        //   alert('删除第'+(index+1)+'笔理财')
        // },
        // addJiaDian () {
        //   this.aa.JiaDian.push(this.JiaDian1())
        //   alert('添加第'+this.aa.JiaDian.length+'家电')
        // },
        // removeJiaDian (index) {
        //   this.aa.JiaDian.splice(index,1)
        //   alert('删除第'+(index+1)+'家电')
        // },
        // addBaoXian () {
        //   this.aa.BaoXian.push(this.BaoXian1())
        //   alert('添加第'+this.aa.BaoXian.length+'笔保险')
        // },
        // removeBaoXian (index) {
        //   this.aa.BaoXian.splice(index,1)
        //   alert('删除第'+(index+1)+'笔保险')
        // },
        // addZhaiQuan () {
        //   this.aa.ZhaiQuan.push(this.ZhaiQuan1())
        //   alert('添加第'+this.aa.ZhaiQuan.length+'笔债权')
        // },
        // removeZhaiQuan (index) {
        //   this.aa.ZhaiQuan.splice(index,1)
        //   alert('删除第'+(index+1)+'笔债权')
        // },
        // addZhaiWu () {
        //   this.aa.ZhaiWu.push(this.ZhaiWu1())
        //   alert('添加第'+this.aa.ZhaiWu.length+'笔债务')
        // },
        // removeZhaiWu (index) {
        //   this.aa.ZhaiWu.splice(index,1)
        //   alert('删除第'+(index+1)+'笔债务')
        // },

        GoComplatePage () {
          this.IsShow = true;
          
        },
        quxiao (){
          this.IsShow = false;
        },
        complate () {
          this.IsShow = false;
          this.$router.replace("/ShengChengXieYi");
        },
        stepClick (val) {
          var _that = this;
          _that.active = val;
        },
        prev () {
          --this.active;
          if(this.active < 0 ) this.active = 0;
        },
        next () {
          if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
        }
        // addChildBirthday1 (e) {
        //    console.log(e,12312313)
        // },
        // addChildBirthday (e) {
        //   console.log(e,12312313)
        // },
        // addChildName (e) {    // 添加姓名
        //   console.log(e)
        //   alert(e)
        // },
        // addChildSex (e) {
        //   console.log(e)
        // },
        // addChildId (e) {
        //   console.log(e)
        // },
        // consoleChild (e) {
        //   console.log(e)
        // }
      }
    }
</script>
<style>
.ban{width:100% !important;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-select{width:100% !important;}
#alert_xieyi{width:400px;height:300px;border:1px solid #343434;position:fixed;top:50%;margin-top:-150px;left:50%;margin-left:-200px;z-index: 1;background: #fff}
#alert_xieyi h2{margin-top:100px;}
#alert_xieyi .queren{width:80%;text-align: center;justify-content: space-around;margin-top:80px;margin-left: 20%}
.outputword .msg{text-indent:2em;}
</style>
