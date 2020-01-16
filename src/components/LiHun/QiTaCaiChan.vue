<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="ml-5">
          <!--遍历有几套房子-->
          <div >
            <!--遍历孩子的基本信息-->
            <div v-for="(item,index) in childAll" :key="index">
              <!-- <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">其他财产</h2> -->
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
                    <!-- 多选框 -->
                    <div v-if="$$item.type == 'checkbox'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title">
                        <el-checkbox-group v-model="$$item.answer" >
                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$item)'>{{list.label}}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <div v-if="$$item.grandson">
                        <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                          <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                            <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--下拉框(单选)-->
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
                    <!--下拉框(多选)-->
                    <div v-if="$$item.type == 'select_multiple'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title">
                        <el-select v-model="$$item.answer" multiple placeholder="请选择">
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
                         <!-- 多选框 -->
                          <div v-if="$$$item.type == 'checkbox'">
                            <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                              <el-checkbox-group v-model="$$$item.answer">
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
                                        @blur="addChildName($$$$$item.answer)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            <!--下拉框(多选)-->
                          <div v-if="$$$item.type == 'select_multiple'">
                            <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                              <el-select v-model="$$$item.answer" multiple placeholder="请选择">
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
                                <!-- 多选框 -->
                                <div v-if="$$$$item.type == 'checkbox'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-checkbox-group v-model="$$$$item.answer">
                                      <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                    </el-checkbox-group>
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
                                 <!--下拉框(多选)-->
                              <div v-if="$$$$item.type == 'select_multiple'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-select v-model="$$$$item.answer" multiple placeholder="请选择">
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
                        <!-- 多选框 -->
                        <div v-if="$$$item.type == 'checkbox'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-checkbox-group v-model="$$$item.answer">
                              <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                            </el-checkbox-group>
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
                         <!--下拉框(多选)-->
                        <div v-if="$$$item.type == 'select_multiple'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-select v-model="$$$item.answer" multiple placeholder="请选择">
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

                        <!-- 三级问题 -->

                        <div v-if="$$$item.questions ">
                          <h2 class="text-left text-blue-500">{{$$$item.title}}</h2>
                          <div v-for="($$$$item, $$$$index) in $$$item.questions">
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
                              <!-- 多选框 -->
                              <div v-if="$$$$item.type == 'checkbox'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-checkbox-group v-model="$$$$item.answer">
                                    <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                  </el-checkbox-group>
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
                               <!--下拉框(多选)-->
                              <div v-if="$$$$item.type == 'select_multiple'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-select v-model="$$$$item.answer" multiple placeholder="请选择">
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
                              <!--下拉框选择每月几号-->
                              <div v-if="$$$$item.type == 'select_day_per'">
                                  <span>
                                    每月
                                    <el-select v-model="$$$$item.answer">
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
                              <div v-if="$$$$item.type == 'select_day'">
                                  <span>
                                    月
                                    <el-select v-model="$$$$item.answer">
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
                              <div v-if="$$$$item.type == 'select_year'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-select v-model="$$$$item.answer">
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
          </div>
        </div>
      </el-form>
      <div class="w-1/3 flex mx-auto">
        <div class="w-40 mr-2">
          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="NextPage">
            下一页
          </div>
        </div>
        <div class="w-40">
          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="UpPage">
            上一页
          </div>
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
      name: 'FangChan',
      mounted () {

      },
      mounted () {
        this.childList()
      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        childMsg1 () {
          return [
            {
              title: '其他财产',
              questions: [
                {
                  title: '请选择您与配偶需要处理的其他财产？',
                  id: '1',
                  isRequired: true,
                  type: 'checkbox',
                  tip: '',
                  answer: [],
                  listData: [
                    { label: '股权股份', value: '1' },
                    { label: '网上店铺', value: '2' },
                    { label: '虚拟财产', value: '3' },
                    { label: '住房公积金', value: '4' },
                    { label: '知识产权收益', value: '5' },
                    { label: '军人复原费、自主择业费', value: '6' },
                    { label: '买断工龄款', value: '7' },
                    { label: '宅基地相关', value: '8' },
                    { label: '珠宝首饰', value: '9' },
                    { label: '宠物', value: '10' },
                    { label: '收藏品、古董', value: '11' },
                    { label: '铺位承租权、转租权', value: '12' },
                    { label: '承包土地、山林', value: '13' },
                    { label: '体育竞技奖牌、奖金', value: '14' }
                  ]
                },
                {
                  title: '其他',
                  id: '2',
                  isRequired: true,
                  type: 'input',
                  placeholder: '填写其他财产',
                  input_type: 'text',
                  tip: '提示',
                  answer: ''
                }
              ]
            }
          ]
        },
        childList () {
          this.$forceUpdate();
          this.childAll = [];
          this.$set(this.childAll, 1, this.childMsg1())
        },
        addFangChan () {
          this.childAll.push(this.childMsg1())
          alert('添加第'+this.childAll.length+'存款')
        },
        removeFangChan (index) {
          this.childAll.splice(index,1)
          alert('删除第'+(index+1)+'存款')
        },
        UpPage () {
          this.$router.replace("/BaoXian");
        },
        NextPage () {
          this.$router.replace("/ZhaiQuan");
        },
        userAddAnswerAction(e){
          console.log(e.answer)
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
