<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="text-left"></div>
        <div class="ml-5">
          <el-form-item label="待处置的理财" class="w-1/2 mx-auto">
            <el-select v-model="childNum" placeholder="理财" size="small" @change="childList(childNum)">
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
          <!--遍历有几辆理财-->
          <div >
            <!--遍历孩子的基本信息-->
            <div v-for="(item,index) in childAll" :key="index">
              <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">理财{{index+1}}</h2>
              <!-- 大问题块 -->
              <div v-for="($item,$index) in item"  :key="$index">
                <h2 class="text-left">{{$item.title}}</h2>

                <!-- 一级问题块 -->

                <div v-for="($$item,$$index) in $item.questions" :key="$$index">
                  <div v-if="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
                    <!--日期-精确到日-->
                    <div v-if="$$item.type == 'select_city'">
                      <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title" class="text-base">
                        <el-cascader
                        v-model="$$item.answer"
                        :options="options"
                        @change="addChildName1($$item)">
                        </el-cascader>
                      </el-form-item>
                    </div>
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
                        <el-checkbox-group v-model="$$item.answer">
                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
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
                         <!-- 下拉单选 -->
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
                                <!-- 下拉框多选 -->
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
              <div class="text-right flex">
                <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="removeFangChan(index)">删除当前理财</div>
              </div>
            </div>
            <div class="text-right flex">
              <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="addFangChan">添加理财</div>
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
  import { regionData, CodeToText  } from 'element-china-area-data'

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
            ChildName: '',
            options: regionData,
            selectedOptions: [],
            aa: ''
          }
      },
      name: 'FangChan',
      mounted () {

      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        handleChange(value) {
          // console.log(value);
          this.aa = CodeToText[this.selectedOptions[0]] + '' + CodeToText[this.selectedOptions[1]] + CodeToText[this.selectedOptions[2]]
          // console.log(CodeToText['110000'])
          
          console.log(this.aa)
        },
        childMsg1 () {
          return [
            {
              title: '问题一：基本信息',
              questions: [
                {
                  title: '1、理财机构是？',
                  id: '1',
                  isRequired: false,
                  type: 'input',
                  input_type: 'text',
                  placeholder: '填写机构名称即可',
                  tip: '',
                  answer: ''
                },
                {
                  title: '1、理财机构是？',
                  id: '11',
                  isRequired: false,
                  type: 'select_city',
                  input_type: 'text',
                  placeholder: '填写机构名称即可',
                  tip: '',
                  answer: ''
                },
                {
                  title: '2、理财数额共计人民币多少元？',
                  id: '2',
                  isRequired: true,
                  type: 'input',
                  input_type: 'number',
                  placeholder: '如：5000',
                  tip: '',
                  answer: ''
                },
                {
                  title: '3、在谁名下？',
                  id: '3',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '男方', value: '1' },
                    { label: '女方', value: '2' }
                  ]
                }
              ]
            },
            {
              title: '问题二：离婚后理财归属',
              questions: [
                {
                  title: '4、离婚后这项理财归谁？',
                  id: '4',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '男方', value: '1' },
                    { label: '女方', value: '2' },
                    { label: '男方和女方', value: '3' },
                    { label: '孩子', value: '4' },
                    { label: '男方和孩子', value: '5' },
                    { label: '女方和孩子', value: '6' },
                    { label: '男方、女方和孩子', value: '7' }
                  ],
                  childQuestion: {
                    1: [
                      {
                        title: '男方拥有数额',
                        id: '2_1_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    2: [
                      {
                        title: '女方拥有数额',
                        id: '2_2_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    3: [
                      {
                        title: '男方拥有数额',
                        id: '2_3_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '女方拥有数额',
                        id: '2_3_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    4: [
                      {
                        title: '孩子拥有数额',
                        id: '2_4_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子的姓名',
                        id: '2_4_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请填写孩子姓名',
                        input_type: 'text',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    5: [
                      {
                        title: '男方拥有数额',
                        id: '2_5_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子方拥有数额',
                        id: '2_5_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子的姓名',
                        id: '2_5_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请填写孩子姓名',
                        input_type: 'text',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    6: [
                      {
                        title: '女方拥有数额',
                        id: '2_6_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子方拥有数额',
                        id: '2_6_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子的姓名',
                        id: '2_6_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请填写孩子姓名',
                        input_type: 'text',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                    7: [
                      {
                        title: '男方拥有数额',
                        id: '2_7_1',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '女方拥有数额',
                        id: '2_7_2',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子方拥有数额',
                        id: '2_7_3',
                        isRequired: true,
                        type: 'input',
                        placeholder: '填写百分比，如：80',
                        input_type: 'number',
                        tip: '提示',
                        answer: ''
                      },
                      {
                        title: '孩子的姓名',
                        id: '2_7_4',
                        isRequired: true,
                        type: 'input',
                        placeholder: '请填写孩子姓名',
                        input_type: 'text',
                        tip: '提示',
                        answer: ''
                      }
                    ],
                  }
                },
                {
                  title: '5、是否约定理财的分割时间',
                  id: '5',
                  isRequired: true,
                  type: 'select',
                  tip: '提示',
                  answer: '',
                  listData: [
                    { label: '无需约定/双方另行约定', value: '1' },
                    { label: '本协议生效之日起', value: '2' },
                    { label: '具体时间', value: '3' }
                  ]
                },
                {
                  title: '6具体时间？',
                  id: '6',
                  isRequired: true,
                  type: 'dateTime_day',
                  placeholder: '选择具体时间',
                  tip: '',
                  answer: '',
                  requireQidAndAnswer: { id: '5', answer: '3' }
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
        addFangChan () {
          this.childAll.push(this.childMsg1())
          alert('添加第'+this.childAll.length+'理财')
        },
        removeFangChan (index) {
          this.childAll.splice(index,1)
          alert('删除第'+(index+1)+'理财')
        },
        UpPage () {
          this.$router.replace("/Car");
        },
        NextPage () {
          this.$router.replace("/JiaDian");
        },
        addChildBirthday1 (e) {
           console.log(e,12312313)
        },
        addChildBirthday (e) {
          console.log(e,12312313)
        },
        addChildName1 (e) {  
          // 添加姓名
          
          console.log(CodeToText[e.answer[0]] + '' + CodeToText[e.answer[1]] + CodeToText[e.answer[2]])
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
