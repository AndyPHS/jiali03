<template>
  <div class="container mx-auto">
    <div>
      <el-form label-position="top" label-width="160px">
        <div class="ml-5">
          <div class="text-2xl font-bold text-center py-8">为了更高效地为您定制专属协议，请填写如下问题：</div>
          <div class="w-3/5 text-left mx-auto bg-white px-5 py-5 border-2 border-green-200 rounded-lg shadow-lg">
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
                          @change="userAddAnswerAction($$item)"
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
                      <el-form-item label="" class="text-base">
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
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
                      <el-form-item label=""  class="text-base">
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
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
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                        <el-radio-group v-model="$$item.answer"  @change="userAddAnswerAction($$item)">
                          <el-radio :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    <!-- 多选框 -->
                    <div v-if="$$item.type == 'checkbox'">
                      <el-form-item label="">
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                        <el-checkbox-group v-model="$$item.answer"  @change="userAddAnswerAction($$item)">
                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex">{{list.label}}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <div v-if="$$item.grandson">
                        <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                          <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                            <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                              <el-form-item label="">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
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
                            <div v-if="$$$$item.type == 'select'">
                              <el-form-item label="">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--下拉框(单选)-->
                    <div v-if="$$item.type == 'select'">
                      <el-form-item label="">
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                        <el-select v-model="$$item.answer" @change="userAddAnswerAction($$item)">
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
                      <el-form-item label="">
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                        <el-select v-model="$$item.answer" multiple placeholder="请选择"  @change="userAddAnswerAction($$item)">
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
                              <el-checkbox-group v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)">
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
                                  <div v-if="$$$$$item.type == 'select'">
                                    <el-form-item :label="$$$$$item.isRequired==false ?'(选填)'+$$$$$item.title:$$$$$item.title">
                                      <el-select v-model="$$$$$item.answer" @change="userAddAnswerAction($$$$$item)">
                                        <el-option
                                          size="small"
                                          v-for="(s,i) in $$$$$item.listData"
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
                         <!-- 下拉单选 -->
                         <div v-if="$$$item.type == 'select'">
                           <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                             <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                               <el-option
                                 size="small"
                                 v-for="(s,i) in $$$item.listData"
                                 :key="i"
                                 :label="s.label"
                                 :value="s.value"
                                 >
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
                                    <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
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
                                    <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
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
                         <!-- 下拉多选 -->
                         <div v-if="$$$item.type == 'select_multiple'">
                            <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                              <el-select v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
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
                              @blur="userAddAnswerAction($$$item)"
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
                              <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
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
                                <div v-if="$$$$$item.type == 'select'">
                                  <el-form-item :label="$$$$$item.isRequired==false ?'(选填)'+$$$$$item.title:$$$$$item.title">
                                    <el-select v-model="$$$$$item.answer" @change="userAddAnswerAction($$$$$item)">
                                      <el-option
                                        size="small"
                                        v-for="(s,i) in $$$$$item.listData"
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
                        <!--下拉框-->
                        <div v-if="$$$item.type == 'select'">
                          <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                            <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
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
                            <el-select v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
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
                              <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
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
                              <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
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
                            <el-select v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)">
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
                              <!-- 多选框 -->
                              <div v-if="$$$$item.type == 'checkbox'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-checkbox-group v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                    <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                  </el-checkbox-group>
                                </el-form-item>
                                <div v-if="$$$$item.grandson">
                                <div v-for="($$$$$item, $$$$$index) in $$$$item.answer" :key="$$$$$index">
                                  <div v-for="($$$$$$item,$$$$$$index) in $$$$item.grandson[$$$$$item]">
                                    <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='number'">
                                      <el-form-item :label="$$$$$$item.isRequired==false ?'(选填)'+$$$$$$item.title:$$$$$$item.title" class="text-base">
                                        <el-input
                                          type="text"
                                          class="ban"
                                          v-model="$$$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$$$item.placeholder"
                                          @blur="userAddAnswerAction($$$$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <div v-if="$$$$$$item.type == 'select'">
                                      <el-form-item :label="$$$$$$item.isRequired==false ?'(选填)'+$$$$$$item.title:$$$$$$item.title">
                                        <el-select v-model="$$$$$$item.answer" @change="userAddAnswerAction($$$$$$item)">
                                          <el-option
                                            size="small"
                                            v-for="(s,i) in $$$$$$item.listData"
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
                               <!--下拉框(多选)-->
                              <div v-if="$$$$item.type == 'select_multiple'">
                                <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                  <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
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
                                    <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
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
                                    <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
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
                                  <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
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
      <div class="w-1/3 my-8 mx-auto">
        <div>
          <!-- <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="NextPage">
            确定
          </div> -->
           <el-button type="primary" @click="NextPage">开始定制</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
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
        this.childList();
      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        childMsg1 () {
          return [
            {
              title: '',
              questions: [
                {
                  title: '1、您离婚想要达到的诉求是什么？',
                  id: '649',
                  isRequired: false,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '要求对方净身出户', value: '1' },
                    { label: '争夺孩子抚养权', value: '2' },
                    { label: '以上都是', value: '3' }
                  ]
                },
                {
                  title: '2、你们感情破裂的原因是什么？（可多选）',
                  id: '650',
                  isRequired: false,
                  type: 'select_multiple',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '婚前感情基础薄弱', value: '1' },
                    { label: '性格不合，琐事矛盾', value: '2' },
                    { label: '出轨', value: '3' },
                    { label: '与人同居', value: '4' },
                    { label: '重婚', value: '5' },
                    { label: '虐待', value: '6' },
                    { label: '遗弃', value: '7' },
                    { label: '赌博', value: '8' },
                    { label: '吸毒', value: '9' },
                    { label: '沉迷网络游戏', value: '10' },
                    { label: '嫖娼', value: '11' },
                    { label: '酗酒', value: '12' },
                    { label: '暴力倾向', value: '13' },
                    { label: '家庭成员矛盾', value: '14' },
                    { label: '子女抚养方面的矛盾', value: '15' },
                    { label: '隐瞒疾病', value: '16' },
                    { label: '长期分居两地', value: '17' },
                    { label: '对方在服刑', value: '18' }
                  ]
                },
                {
                  title: '3、你们都是初婚吗？',
                  id: '3',
                  isRequired: false,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '均初婚', value: '1' },
                    { label: '均再婚', value: '2' },
                    { label: '男方初婚，女方再婚', value: '3' },
                    { label: '女方初婚，男方再婚', value: '4' }
                  ]
                },
                {
                  title:'4、您与配偶是否育有子女？',
                  id: '875',
                  isRequired: true,
                  type: 'radio',
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '2' }
                  ]
                },
                {
                  title: '您与配偶生育了几个子女？',
                  id: '518',
                  isRequired: true,
                  type: 'select',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                    { label: '7', value: '7' }
                  ],
                  requireQidAndAnswer: { id: '875', answer: '1' }
                },
                {
                  title: '5、是否有需要处理的共同财产？',
                  id: '652',
                  isRequired: true,
                  type: 'radio',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '无夫妻共同财产', value: '1' },
                    { label: '有财产待处理', value: '2' }
                  ],
                  childQuestion: {
                    2: [
                      {
                        title: '请勾选您需要处理的夫妻共同财产',
                        id: '520',
                        isRequired: true,
                        type: 'checkbox',
                        tip: '提示',
                        answer: [],
                        listData: [
                          { label: '房子', value: '1' },
                          { label: '存款', value: '2' },
                          { label: '理财', value: '3' },
                          { label: '车子', value: '4' },
                          { label: '家具家电', value: '5' },
                          { label: '保险', value: '6' },
                          { label: '其他', value: '7' }
                        ],
                        // grandson: {
                        //   1: [
                        //     {
                        //       title: '您与配有有几套房产需要处理？',
                        //       id: '521',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   2: [
                        //     {
                        //       title: '您与配有有几笔存款需要处理？',
                        //       id: '637',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   3: [
                        //     {
                        //       title: '您与配有有几笔理财需要处理？',
                        //       id: '523',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   4: [
                        //     {
                        //       title: '您与配有有几辆车子需要处理？',
                        //       id: '522',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   5: [
                        //     {
                        //       title: '您与配有有多少家电需要处理？',
                        //       id: '636',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   6: [
                        //     {
                        //       title: '您与配有有几份保险需要处理？',
                        //       id: '524',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ]
                        // }
                      }
                    ]
                  }
                },
                {
                  title: '6、外债的具体情形？',
                  id: '653',
                  isRequired: true,
                  type: 'radio',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '无外债', value: '1' },
                    { label: '有外债', value: '2' }
                  ],
                  childQuestion: {
                    2: [
                      {
                        title: '外债的具体情形是',
                        id: '654',
                        isRequired: true,
                        type: 'checkbox',
                        tip: '提示',
                        answer: [],
                        listData: [
                          { label: '有债权（别人欠/借你们钱）', value: '1' },
                          { label: '有债务（你们欠/借了别人钱）', value: '2' }
                        ],
                        // grandson: {
                        //   1: [
                        //     {
                        //       title: '您与配有有几笔债权需要处理？',
                        //       id: '655',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ],
                        //   2: [
                        //     {
                        //       title: '您与配有有几笔债务需要处理？',
                        //       id: '656',
                        //       isRequired: true,
                        //       type: 'select',
                        //       // input_type: 'number',
                        //       placeholder: '如：3',
                        //       tip: '提示',
                        //       answer: '',
                        //       listData: [
                        //         { label: '1', value: '1' },
                        //         { label: '2', value: '2' },
                        //         { label: '3', value: '3' },
                        //         { label: '4', value: '4' },
                        //         { label: '5', value: '5' },
                        //         { label: '6', value: '6' },
                        //         { label: '7', value: '7' }
                        //       ]
                        //     }
                        //   ]
                        // }
                      }
                    ]
                  }
                },
                {
                  title: '7、您与配偶对离婚是否达成一致？',
                  id: '657',
                  isRequired: true,
                  type: 'radio',
                  tip: '',
                  answer: '',
                  listData: [
                    { label: '是', value: '1' },
                    { label: '否', value: '2' }
                  ],
                  childQuestion: {
                    2: [
                      {
                        title: '您与配偶对离婚的争议是什么？',
                        id: '658',
                        isRequired: true,
                        type: 'checkbox',
                        tip: '提示',
                        answer: [],
                        listData: [
                          { label: '子女', value: '1' },
                          { label: '财产', value: '2' },
                          { label: '外债', value: '3' }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        childList (e) {
          this.$forceUpdate();
          this.childAll = [];
          this.$set(this.childAll, 1, this.childMsg1())
        },
        userAddAnswerAction (e){
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
          if(e.id == 520){
            e.answer.forEach((item)=>{
              if(item==1){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 521, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==2){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 637, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==3){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 523, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==4){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 522, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==5){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 636, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==6){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 524, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }
            })
          }else if(e.id == 654){
            e.answer.forEach((item)=>{
              if(item==1){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 655, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else if(item==2){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 656, // 关联id
                  quid: 6 //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }
            })
          }

        },
        NextPage () {
          this.$router.replace("/BasicInformation");
        },
        addChildBirthday1 (e) {
           console.log(e,12312313)
        },
        addChildBirthday (e) {
          console.log(e,12312313)
        },
        addChildName (e) {    // 添加姓名
          console.log(e)
          alert(e)
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
.ban{width:100% !important;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-cascader{width:100% !important;}
.el-select{width:100% !important;}
</style>
