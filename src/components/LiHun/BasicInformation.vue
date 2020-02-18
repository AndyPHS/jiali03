<template>
  <div class="w-full bg-gray-100 relative">
    <div class="container mx-auto">
      <div>
        <div class="py-6">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step :title="item.title" v-for="(item, index) in mokuai" :key="index"  @click.native ="stepClick(index)"></el-step>
          </el-steps>
        </div>
        <div v-for="(mo, key) in mokuai" :key="key" class="min">
          <div v-if="active=== key">
            <div>
              <el-form label-position="top" label-width="160px">
                <div class="text-left mx-auto bg-white px-5 py-5 border border-green-200 rounded-lg shadow-lg">
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
                      <div v-for="($item, $index) in item"  :key="$index">
                        <div class="py-2">
                          <el-divider> <h2 class="text-center text-xl">{{$item.title}}</h2></el-divider>
                        </div>
                        <!-- 一级问题块 -->
                        <div v-for="($$item,$$index) in $item.questions" :key="$$index">
                          <div v-show="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
                            <!-- 省市三级联动 -->
                            <div v-if="$$item.type == 'select_city'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
                                <el-cascader
                                v-model="$$item.answer"
                                :options="options"
                                @change="userAddAnswerAction($$item)">
                                </el-cascader>
                              </el-form-item>
                            </div>
                            <!--日期-精确到日-->
                            <div v-if="$$item.type == 'dateTime_day'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
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
                            <!--日期-区间几点到几点-->
                           <div v-if="$$item.type == 'dateTime_Time_Interval'">
                             <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                  <i class="el-icon-question"></i>
                                </el-tooltip>
                                <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                              </div>
                               <el-time-picker
                                 v-model="$$item.answer"
                                 @change="userAddAnswerAction($$item)"
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
                           <div v-if="$$item.type == 'dateTime_Day_Interval'">
                             <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>  
                                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                  <i class="el-icon-question"></i>
                                </el-tooltip>
                                <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                              </div>
                               <el-date-picker
                                 v-model="$$item.answer"
                                 @change="userAddAnswerAction($$item)"
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
                            <div v-if="$$item.type == 'input' && $$item.input_type=='text'">
                              <el-form-item label="" class="text-base">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
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
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
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
                                <div>
                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
                                <el-radio-group v-model="$$item.answer" @change='userAddAnswerAction($$item)'>
                                  <el-radio :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                              <div v-if="$$item.grandson">
                                <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                                  <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
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
                                      <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
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
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-cascader
                                        v-model="$$$$item.answer"
                                        :options="options"
                                        @change="userAddAnswerAction($$$$item)">
                                        </el-cascader>
                                      </el-form-item>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- 多选框 -->
                            <div v-if="$$item.type == 'checkbox'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
                                <el-checkbox-group v-model="$$item.answer" >
                                  <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$item)'>{{list.label}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                              <div v-if="$$item.grandson">
                                <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                                  <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
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
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-cascader
                                        v-model="$$$$item.answer"
                                        :options="options"
                                        @change="userAddAnswerAction($$$$item)">
                                        </el-cascader>
                                      </el-form-item>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--下拉框(单选)-->
                            <div v-if="$$item.type == 'select'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
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
                              <el-form-item label="">
                                 <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$item.description }}</div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
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
                              <h2 class="text-sm font-bold"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{$$item.title}}</h2>
                               <div  v-for="($$$item,$$$index) in $$item.childQuestion" :key="$$$index">
                                <!-- 省市三级联动 -->
                                <div v-if="$$$item.type == 'select_city'">
                                  <el-form-item label="">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
                                    <el-cascader
                                    v-model="$$$item.answer"
                                    :options="options"
                                    @change="userAddAnswerAction($$$item)">
                                    </el-cascader>
                                  </el-form-item>
                                </div>
                                 <!--日期-精确到日-->
                                 <div v-if="$$$item.type == 'dateTime_day'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                   <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                      </div>
                                     <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                       <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                     </el-radio-group>
                                   </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]">
                                          <!-- 省市三级联动 -->
                                          <div v-if="$$$$$item.type == 'select_city'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-cascader
                                              v-model="$$$$$item.answer"
                                              :options="options"
                                              @change="userAddAnswerAction($$$$$item)">
                                              </el-cascader>
                                            </el-form-item>
                                          </div>
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
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
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
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
                                 <!-- 多选框 -->
                                  <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-checkbox-group v-model="$$$item.answer">
                                        <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change="userAddAnswerAction($$$item)">{{list.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]">
                                          <!-- 省市三级联动 -->
                                          <div v-if="$$$$$item.type == 'select_city'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-cascader
                                              v-model="$$$$$item.answer"
                                              :options="options"
                                              @change="userAddAnswerAction($$$$$item)">
                                              </el-cascader>
                                            </el-form-item>
                                          </div>
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
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
                                  <el-form-item label="" class="text-base">
                                      <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                        <!-- 省市三级联动 -->
                                        <div v-if="$$$$item.type == 'select_city'">
                                          <el-form-item label="">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-cascader
                                            v-model="$$$$item.answer"
                                            :options="options"
                                            @change="userAddAnswerAction($$$$item)">
                                            </el-cascader>
                                          </el-form-item>
                                        </div>
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                         <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                              <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框-->
                                        <div v-if="$$$$item.type == 'select'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
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
                                        <!-- 下拉框 -->
                                        <div v-if="$$$$item.type == 'select_day'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                              <el-option
                                                v-for="(s,i) in days"
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
                                 <!-- 下拉多选 -->
                                 <div v-if="$$$item.type == 'select_multiple'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                <!-- 省市三级联动 -->
                                <div v-if="$$$item.type == 'select_city'">
                                  <el-form-item label="">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
                                    <el-cascader
                                    v-model="$$$item.answer"
                                    :options="options"
                                    @change="userAddAnswerAction($$$item)">
                                    </el-cascader>
                                  </el-form-item>
                                </div>
                                <!--日期-精确到日-->
                                <div v-if="$$$item.type == 'dateTime_day'">
                                  <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                  <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                  <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                 <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
                                    <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                      <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                  <div v-if="$$$item.grandson && $$$item.grandson[$$$item.answer]">
                                    <div v-for="($$$$item, $$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                      <!-- 省市三级联动 -->
                                      <div v-if="$$$$item.type == 'select_city'">
                                        <el-form-item label="">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-cascader
                                          v-model="$$$$item.answer"
                                          :options="options"
                                          @change="userAddAnswerAction($$$$item)">
                                          </el-cascader>
                                        </el-form-item>
                                      </div>
                                      <!-- 30天以内的下拉选项 -->
                                      <div v-if="$$$$item.type == 'select_day'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                      <!--日期-精确到日-->
                                      <div v-if="$$$$item.type == 'dateTime_day'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                            <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                            <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                       <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                            <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                          </el-radio-group>
                                        </el-form-item>
                                      </div>
                                      <div v-if="$$$$item.type == 'select'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
                                              v-for="(s,i) in $$$$item.listData"
                                              :key="i"
                                              :label="s.label"
                                              :value="s.value">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                        <div  v-if="$$$$item.grandson && $$$$item.grandson[$$$$item.answer]">
                                          <div v-for="($$$$$item, $$$$$index) in $$$$item.grandson[$$$$item.answer]" :key="$$$$$index">
                                            <!-- 省市三级联动 -->
                                            <div v-if="$$$$$item.type == 'select_city'">
                                              <el-form-item label="">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-cascader
                                                v-model="$$$$$item.answer"
                                                :options="options"
                                                @change="userAddAnswerAction($$$$$item)">
                                                </el-cascader>
                                              </el-form-item>
                                            </div>
                                            <!-- 30天以内的下拉选项 -->
                                            <div v-if="$$$$$item.type == 'select_day'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-select v-model="$$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                                  <el-option
                                                    v-for="(s,i) in days"
                                                    :key="i"
                                                    :label="s"
                                                    :value="s">
                                                  </el-option>
                                                </el-select>
                                              </el-form-item>
                                            </div>
                                            <!--日期-精确到日-->
                                            <div v-if="$$$$$item.type == 'dateTime_day'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-date-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
                                                  type="date"
                                                  size="small"
                                                  placeholder="选择日期"
                                                  format="yyyy 年 MM 月 dd 日"
                                                  value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                              </el-form-item>
                                            </div>
                                            <!--日期-区间几点到几点-->
                                            <div v-if="$$$$$item.type == 'dateTime_Time_Interval'">
                                              <el-form-item label="" class="text-base">
                                                  <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-time-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
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
                                            <div v-if="$$$$$item.type == 'dateTime_Day_Interval'">
                                              <el-form-item label="" class="text-base">
                                                  <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-date-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
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
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
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
                                            <!--输入框-数字类型（类似身份证号、金额）-->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$item.placeholder"
                                                  @blur="userAddAnswerAction($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!--单选框-->
                                            <div v-if="$$$$$item.type == 'radio'">
                                             <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-radio-group v-model="$$$$$item.answer" @change="userAddAnswerAction($$$$$item)">
                                                  <el-radio :label="list.value" v-for="(list, listIndex) in $$$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                                </el-radio-group>
                                              </el-form-item>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!--下拉框-->
                                <div v-if="$$$item.type == 'select'">
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
                                    <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                      <el-option
                                        v-for="(s,i) in $$$item.listData"
                                        :key="i"
                                        :label="s.label"
                                        :value="s.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <div v-if="$$$item.grandson && $$$item.grandson[$$$item.answer]">
                                    <div v-for="($$$$item, $$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                      <!-- 省市三级联动 -->
                                      <div v-if="$$$$item.type == 'select_city'">
                                        <el-form-item label="">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-cascader
                                          v-model="$$$$item.answer"
                                          :options="options"
                                          @change="userAddAnswerAction($$$$item)">
                                          </el-cascader>
                                        </el-form-item>
                                      </div>
                                      <!-- 30天以内的下拉选项 -->
                                      <div v-if="$$$$item.type == 'select_day'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                      <!--日期-精确到日-->
                                      <div v-if="$$$$item.type == 'dateTime_day'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                            <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                            <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
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
                                       <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                            <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                          </el-radio-group>
                                        </el-form-item>
                                      </div>
                                      <div v-if="$$$$item.type == 'select'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                              v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                              placement="right"
                                              width="400"
                                              trigger="hover">
                                              <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                 <img :src="imgModel">
                                              </div>
                                              <i  slot="reference" class="el-icon-picture"></i>
                                            </el-popover>
                                          </div>
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
                                              v-for="(s,i) in $$$$item.listData"
                                              :key="i"
                                              :label="s.label"
                                              :value="s.value">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                        <div  v-if="$$$$item.grandson && $$$$item.grandson[$$$$item.answer]">
                                          <div v-for="($$$$$item, $$$$$index) in $$$$item.grandson[$$$$item.answer]" :key="$$$$$index">
                                            <!-- 省市三级联动 -->
                                            <div v-if="$$$$$item.type == 'select_city'">
                                              <el-form-item label="">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-cascader
                                                v-model="$$$$$item.answer"
                                                :options="options"
                                                @change="userAddAnswerAction($$$$$item)">
                                                </el-cascader>
                                              </el-form-item>
                                            </div>
                                            <!-- 30天以内的下拉选项 -->
                                            <div v-if="$$$$$item.type == 'select_day'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-select v-model="$$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                                  <el-option
                                                    v-for="(s,i) in days"
                                                    :key="i"
                                                    :label="s"
                                                    :value="s">
                                                  </el-option>
                                                </el-select>
                                              </el-form-item>
                                            </div>
                                            <!--日期-精确到日-->
                                            <div v-if="$$$$$item.type == 'dateTime_day'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-date-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
                                                  type="date"
                                                  size="small"
                                                  placeholder="选择日期"
                                                  format="yyyy 年 MM 月 dd 日"
                                                  value-format="yyyy-MM-dd">
                                                </el-date-picker>
                                              </el-form-item>
                                            </div>
                                            <!--日期-区间几点到几点-->
                                            <div v-if="$$$$$item.type == 'dateTime_Time_Interval'">
                                              <el-form-item label="" class="text-base">
                                                  <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-time-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
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
                                            <div v-if="$$$$$item.type == 'dateTime_Day_Interval'">
                                              <el-form-item label="" class="text-base">
                                                  <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-date-picker
                                                  v-model="$$$$$item.answer"
                                                  @change="userAddAnswerAction($$$$$item)"
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
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
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
                                            <!--输入框-数字类型（类似身份证号、金额）-->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$item.placeholder"
                                                  @blur="userAddAnswerAction($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!--单选框-->
                                            <div v-if="$$$$$item.type == 'radio'">
                                             <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$$item.description }}</div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-radio-group v-model="$$$$$item.answer" @change="userAddAnswerAction($$$$$item)">
                                                  <el-radio :label="list.value" v-for="(list, listIndex) in $$$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                                </el-radio-group>
                                              </el-form-item>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                 <!--下拉框(多选)-->
                                <div v-if="$$$item.type == 'select_multiple'">
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                    <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                    <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
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
                                <!-- 多选框 -->
                                <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$item.description }}</div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                        v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                        placement="right"
                                        width="400"
                                        trigger="hover">
                                        <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                           <img :src="imgModel">
                                        </div>
                                        <i  slot="reference" class="el-icon-picture"></i>
                                      </el-popover>
                                    </div>
                                      <el-checkbox-group v-model="$$$item.answer">
                                        <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change="userAddAnswerAction($$$item)">{{list.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                 </div>
                                <!-- 三级问题 -->

                                <div v-if="$$$item.questions ">
                                  <h2 class="text-left text-blue-500">{{$$$item.title}}</h2>
                                  <div v-for="($$$$item, $$$$index) in $$$item.questions">
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-cascader
                                        v-model="$$$$item.answer"
                                        :options="options"
                                        @change="userAddAnswerAction($$$$item)">
                                        </el-cascader>
                                      </el-form-item>
                                    </div>
                                    <!--日期-精确到日-->
                                    <div v-if="$$$$item.type == 'dateTime_day'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                        <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                          <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                        </el-radio-group>
                                      </el-form-item>
                                    </div>
                                    <!--下拉框-->
                                    <div v-if="$$$$item.type == 'select'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
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
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
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
                                    <!-- 多选框 -->
                                    <div v-if="$$$$item.type == 'checkbox'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content"><h3 class="text-base w-full font-bold">小贴士</h3><br/>{{ $$$$item.description }}</div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                        <el-checkbox-group v-model="$$$$item.answer">
                                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex"  @change="userAddAnswerAction($$$$item)">{{list.label}}</el-checkbox>
                                        </el-checkbox-group>
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
                        <div v-if="mo.title==='家具家电' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(636,index)">删除家具家电</div>
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
                      <div v-if="mo.title== '家具家电' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(636)">添加家具家电</div>
                      </div>
                      <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(524)">添加保险</div>
                      </div>
                      <div v-if="mo.title== '其他财产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="addCaiChan">添加其他财产</div>
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
        <div v-show="missMsgBox" id="missMsgBox" class="border border-green-200 rounded-lg shadow-lg">
          <h2>以下信息未填写无法跳转到下一步</h2>
          <div class="w-3/4 mx-auto text-red-500" style="overflow-y: scroll;height: 60%" >
            <ul>
              <li class="my-2 text-left" v-for="(item, index) in missMsg" :key="index">{{item.title}}</li>
            </ul>
          </div>
          <div class="queren flex mx-auto">
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='closeMissMsgBox'>
                取消
              </div>
            </div>
            <div class="w-24">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='closeMissMsgBox'>
                继续填写
              </div>
            </div>
          </div>
        </div>
        <div v-show="missAlert" id="missAlert" v-if="this.status_code == 330">
          <h2>尚未填写的信息</h2>
          <div class="px-1 mx-auto text-red-500" style="overflow-y: scroll;height: 380px;white-space: hidden" >
            <ul>
              <li class="my-1 mx-1 text-left" v-for="(item, index) in missField" :key="index">{{index+1}}、{{item.problemTitle}}</li>
            </ul>
          </div>
        </div>
        <el-button v-if="active < this.mokuai.length && active > 0" class="my-5" @click="prev">上一步</el-button>
        <el-button v-if="active < this.mokuai.length-1 " class="my-5" @click="next">下一步</el-button>
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">生成协议</el-button>
      </div>
    </div>
    <div class="absolute returnUserList right-0">
      <el-button type="primary" @click="returnUserList">返回用户列表</el-button>
    </div>
  </div>
</template>
<script>
  
  import {returnQuestionnaireJson} from '@/api/api/requestLogin.js'    // 查询问卷json
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者房产等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者房产等
  import {verificationWord} from '@/api/api/requestLogin.js'    // 验证单独word
  import {demoYanZheng} from '@/api/api/requestLogin.js'    // 验证单独word demo
  import {getOnlyValue} from '@/api/api/requestLogin.js'    // 获取单独问题的值
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  import { regionData, CodeToText,TextToCode  } from 'element-china-area-data'    // 省市联动信息
  
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
              JiaDian: [],                // 家具家电
              BaoXian: [],          // 保险
              QiTaCaiChan: [],       // 其他财产
              ZhaiQuan: [],         // 债权
              ZhaiWu: []            // 债务
            },           
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1},
              {title: '婚姻状况', part: 'HunYinStatus',id:2}
            ],
            active: 0,
            options: regionData,  // 省市联动
            missMsgBox: false,      // 错误信息默认不显示
            missMsg:[],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [] // 未填写项目
          }
      },
      name: 'WenJuan2',
      
      beforeMount () {
        // this.getChuShi();  // 初始化保存当前页面
        this.getBasicInformation() // 查询双方基本信息模块数据
        this.getHunYinStatus()  // 查询婚姻状况模块数据
        this.getZiNvMsg()  // 查询子女模块数据
        this.getFangChanMsg() // 查询房产模块数据
        this.getCunKuanMsg()  // 查询存款模块数据
        this.getCarMsg()   // 查询车子模块数据
        this.getLiCaiMsg()  // 查询理财模块数据
        this.getJiaDianMsg()  // 查询家具家电模块数据
        this.getBaoXianMsg() // 查询保险模块数据
        this.getZhaiQuanMsg()  // 查询债权模块数据
        this.getZhaiWuMsg()  // 查询债务模块数据
        // this.getQiTaCaiChanMsg() // 查询其他财产
        // this.getShengChengXieYi() // 生成协议弹框
      },
      mounted (){
        this.getChuShi();  // 初始化保存当前页面
       },
      methods: {
        getChuShi () {
          getOnlyValue({
            qpid: 520, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            let getmodel = JSON.parse(data.data.data)
            if(getmodel.indexOf("7") > -1){
              this.getQiTaCaiChanMsg()
            }else{
              
            }
            
          }).catch((data)=>{
             console.log("保存失败")
          })
        },
        getBasicInformation (){ // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 595}).then((data)=>{  // 查询双方基本信息模块数据
            this.aa.BasicInformation = data.data.data
            // console.log(this.aa.BasicInformation)
            this.mokuai.push({
              title: '其他财产', 
              part: 'QiTaCaiChan',
              id: 10
            })
          }).catch((data)=>{

          })
          this.mokuai.sort(this.compare('id'));
        },
        getHunYinStatus () {// 查询婚姻状况模块数据
          returnQuestionnaireJson({'qpid': 596}).then((data)=>{  // 查询婚姻状况模块数据
            this.aa.HunYinStatus = data.data.data
            this.mokuai.sort(this.compare('id'));
            let cityAnswer = JSON.parse(this.aa.HunYinStatus[0][0].questions[1].answer)
            this.aa.HunYinStatus[0][0].questions[1].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
        },
        getZiNvMsg () { // 查询子女模块数据
          returnQuestionnaireJson({'qpid': 518}).then((data)=>{ // 查询子女模块数据
            this.aa.ZiNv = data.data.data
            this.mokuai.push({
              title: '子女状况', 
              part: 'ZiNv',
              id: 3
            })
            // console.log(this.aa.ZiNv)
            this.mokuai.sort(this.compare('id'));
            // console.log(this.aa.ZiNv[0][1].questions[7].childQuestion[1][2].answer)
            for ( let i = 0 ;i < this.aa.ZiNv.length; i++) {
              if(this.aa.ZiNv[i][1].questions[0].answer == 1){
                this.aa.ZiNv[i][1].questions[7].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[7].childQuestion[1][2].answer)
                this.aa.ZiNv[i][1].questions[8].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[8].childQuestion[2][0].answer)
              }else if(this.aa.ZiNv[i][1].questions[0].answer == 2){
                this.aa.ZiNv[i][1].questions[14].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[14].childQuestion[1][2].answer)
                this.aa.ZiNv[i][1].questions[15].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[15].childQuestion[2][0].answer)
              }else if(this.aa.ZiNv[i][1].questions[0].answer == 3){
                if(this.aa.ZiNv[i][1].questions[1].answer ==2){
                  this.aa.ZiNv[i][1].questions[1].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[2][0].answer)
                  this.aa.ZiNv[i][1].questions[1].childQuestion[2][1].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[2][1].answer)
                }else if(this.aa.ZiNv[i][1].questions[1].answer ==3){
                  this.aa.ZiNv[i][1].questions[1].childQuestion[3][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[3][0].answer)
                  this.aa.ZiNv[i][1].questions[1].childQuestion[3][1].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[3][1].answer)
                }
                this.aa.ZiNv[i][1].questions[21].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[21].childQuestion[1][2].answer)
                this.aa.ZiNv[i][1].questions[22].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[22].childQuestion[2][0].answer)
                this.aa.ZiNv[i][1].questions[28].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[28].childQuestion[1][2].answer)
                this.aa.ZiNv[i][1].questions[29].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[29].childQuestion[2][0].answer)
              }
            }
          }).catch((data)=>{
          })
        },
        getFangChanMsg () {// 查询房产模块数据
          returnQuestionnaireJson({'qpid': 521}).then((data)=>{ // 查询房产模块数据
            this.aa.FangChan= data.data.data
            this.mokuai.push({
              title: '房产', 
              part: 'FangChan',
              id: 4
            })
            this.mokuai.sort(this.compare('id'));
            for ( let i = 0 ;i < this.aa.FangChan.length; i++) {
              this.aa.FangChan[i][0].questions[2].answer = JSON.parse(this.aa.FangChan[i][0].questions[2].answer)
            }
          }).catch((data)=>{
          })
        },
        getCunKuanMsg () {// 查询存款模块数据
          returnQuestionnaireJson({'qpid': 637}).then((data)=>{ // 查询存款模块数据
            this.aa.CunKuan= data.data.data
            this.mokuai.push({
              title: '存款', 
              part: 'CunKuan',
              id: 5
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getCarMsg () { // 查询车子模块数据
          returnQuestionnaireJson({'qpid': 522}).then((data)=>{  // 查询车子模块数据
            this.aa.Car= data.data.data
            this.mokuai.push({
              title: '车子', 
              part: 'Car',
              id: 6
            })
            this.mokuai.sort(this.compare('id'));
            for ( let i = 0 ;i < this.aa.Car.length; i++) {
              this.aa.Car[i][0].questions[2].answer = JSON.parse(this.aa.Car[i][0].questions[2].answer)
            }
          }).catch((data)=>{
          })
        },
        getLiCaiMsg () { // 查询理财模块数据
          returnQuestionnaireJson({'qpid': 523}).then((data)=>{  // 查询理财模块数据
            this.aa.LiCai= data.data.data
            this.mokuai.push({
              title: '理财', 
              part: 'LiCai',
              id: 7
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getJiaDianMsg () { // 查询家具家电模块数据
          returnQuestionnaireJson({'qpid': 636}).then((data)=>{ // 查询家具家电模块数据
            this.aa.JiaDian= data.data.data
            this.mokuai.push({
              title: '家具家电', 
              part: 'JiaDian',
              id: 8
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getBaoXianMsg (){// 查询保险模块数据
          returnQuestionnaireJson({'qpid': 524}).then((data)=>{  // 查询保险模块数据
            this.aa.BaoXian= data.data.data
            this.mokuai.push({
              title: '保险', 
              part: 'BaoXian',
              id: 9
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{

          })
        },
        getQiTaCaiChanMsg (){// 查询其他财产
          returnQuestionnaireJson({'qpid': 332}).then((data)=>{  // 查询保险模块数据
            this.aa.QiTaCaiChan= data.data.data
            
            this.mokuai.sort(this.compare('id'));
            for ( let i = 0 ;i < this.aa.QiTaCaiChan.length; i++) {
              if(this.aa.QiTaCaiChan[i][0].questions[0].answer == 1 || this.aa.QiTaCaiChan[i][0].questions[0].answer == ""){
                this.aa.QiTaCaiChan[i][0].questions[0].answer = []
              }else{
                this.aa.QiTaCaiChan[i][0].questions[0].answer = JSON.parse(this.aa.QiTaCaiChan[i][0].questions[0].answer)
              }
              
            }
          }).catch((data)=>{

          })
        },
        getZhaiQuanMsg (){ // 查询债权模块数据
          returnQuestionnaireJson({'qpid': 655}).then((data)=>{  // 查询债权模块数据
            this.aa.ZhaiQuan= data.data.data
            this.mokuai.push({
              title: '债权', 
              part: 'ZhaiQuan',
              id: 11
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getZhaiWuMsg (){ // 查询债务模块数据
          returnQuestionnaireJson({'qpid': 656}).then((data)=>{  // 查询债务模块数据
            this.aa.ZhaiWu= data.data.data
            this.mokuai.push({
              title: '债务', 
              part: 'ZhaiWu',
              id: 12
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        
        getZiNv () { // 查询子女模块数据
          returnQuestionnaireJson({'qpid': 518}).then((data)=>{ // 查询子女模块数据
            this.aa.ZiNv = data.data.data
            // console.log(this.aa.ZiNv)
          }).catch((data)=>{
          })
        },
        getFangChan () {// 查询房产模块数据
          returnQuestionnaireJson({'qpid': 521}).then((data)=>{ // 查询房产模块数据
            this.aa.FangChan= data.data.data
          }).catch((data)=>{
          })
        },
        getCunKuan () {// 查询存款模块数据
          returnQuestionnaireJson({'qpid': 637}).then((data)=>{ // 查询存款模块数据
            this.aa.CunKuan= data.data.data
          }).catch((data)=>{
          })
        },
        getCar () { // 查询车子模块数据
          returnQuestionnaireJson({'qpid': 522}).then((data)=>{  // 查询车子模块数据
            this.aa.Car= data.data.data
          }).catch((data)=>{
          })
        },
        getLiCai () { // 查询理财模块数据
          returnQuestionnaireJson({'qpid': 523}).then((data)=>{  // 查询理财模块数据
            this.aa.LiCai= data.data.data
          }).catch((data)=>{
          })
        },
        getJiaDian () { // 查询家具家电模块数据
          returnQuestionnaireJson({'qpid': 636}).then((data)=>{ // 查询家具家电模块数据
            this.aa.JiaDian= data.data.data
          }).catch((data)=>{
          })
        },
        getBaoXian (){// 查询保险模块数据
          returnQuestionnaireJson({'qpid': 524}).then((data)=>{  // 查询保险模块数据
            this.aa.BaoXian= data.data.data
          }).catch((data)=>{

          })
        },
        getZhaiQuan (){ // 查询债权模块数据
          returnQuestionnaireJson({'qpid': 655}).then((data)=>{  // 查询债权模块数据
            this.aa.ZhaiQuan= data.data.data
          }).catch((data)=>{
          })
        },
        getZhaiWu (){ // 查询债务模块数据
          returnQuestionnaireJson({'qpid': 656}).then((data)=>{  // 查询债务模块数据
            this.aa.ZhaiWu= data.data.data
          }).catch((data)=>{
          })
        },
        // getQiTaCaiChan(){
        //   returnQuestionnaireJson({'qpid': 332}).then((data)=>{  // 查询债务模块数据
        //     this.aa.QiTaCaiChan= data.data.data
        //   }).catch((data)=>{
        //   })
        // },
        compare(property){
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2
          }
        },
        userAddAnswerAction (e){
          if( e.isRequired == true){ 
            if(e.answer == '' || e.answer == null){
              this.$message.error('必填项内容不能为空');
            }else{
              if(e.fornum !== undefined){
                if(Array.isArray(e.answer)){
                  if(e.type == "select_city"){
                      userAddAnswer({
                      value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                      qpid: e.id, // 关联id
                      fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      console.log("保存成功")
                    }).catch((data)=>{
                       console.log("保存失败")
                    }) 
                  }else{
                    userAddAnswer({
                      value: JSON.stringify(e.answer),  // 值
                      qpid: e.id, // 关联id
                      fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      console.log("保存成功")
                    }).catch((data)=>{
                       console.log("保存失败")
                    })  
                  }
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    console.log("保存成功")
                  }).catch((data)=>{
                     console.log("保存失败")
                  })
                }
              }else{
                  console.log(e.answer)
                 if(Array.isArray(e.answer)){
                  if(e.type == "select_city"){
                    userAddAnswer({
                      value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                      qpid: e.id, // 关联id
                      // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      // console.log("保存成功")
                    }).catch((data)=>{
                       // console.log("保存失败")
                    })
                  }else if(e.type == "checkbox"){
                    console.log(e.answer)
                    userAddAnswer({
                      value: JSON.stringify(e.answer),  // 值
                      qpid: e.id, // 关联id
                      // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      // console.log("保存成功")
                    }).catch((data)=>{
                       // console.log("保存失败")
                    })
                  }else{
                    userAddAnswer({
                      value: JSON.stringify(e.answer),  // 值
                      qpid: e.id, // 关联id
                      // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      // console.log("保存成功")
                    }).catch((data)=>{
                       // console.log("保存失败")
                    })
                  }
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    // console.log("保存成功")
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }
              }
            }
          }else{
            if(e.fornum !== undefined){
              if(Array.isArray(e.answer)){
                if(e.type == "select_city"){
                    userAddAnswer({
                    value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    console.log("保存成功")
                  }).catch((data)=>{
                     console.log("保存失败")
                  }) 
                }else{
                  userAddAnswer({
                    value: JSON.stringify(e.answer),  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    console.log("保存成功")
                  }).catch((data)=>{
                     console.log("保存失败")
                  })  
                }
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                  console.log("保存成功")
                }).catch((data)=>{
                   console.log("保存失败")
                })
              }
            }else{
               if(Array.isArray(e.answer)){
                if(e.type == "select_city"){
                  userAddAnswer({
                    value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    // console.log("保存成功")
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }else{
                  userAddAnswer({
                    value: JSON.stringify(e.answer),  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    // console.log("保存成功")
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                  // console.log("保存成功")
                }).catch((data)=>{
                   // console.log("保存失败")
                })
              }
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
              quid: localStorage.getItem('quid')
            }).then((data)=>{
              if(data.data.status_code == 200 ){
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
                  this.getJiaDian()  // 查询家具家电模块数据
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
              }
            }).catch((data)=>{
               this.$message.error('添加失败，请联系管理员');
            })
        },
        addCaiChan(){ // 添加财产
          this.getQiTaCaiChanMsg()
        },
        userDeleteSelectAnswerAction (e,index) { // 删除子女或者房产等信息
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              userDeleteSelectAnswer({
                qpid: e,
                quid: localStorage.getItem('quid'),
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
                  this.getJiaDian()  // 查询家具家电模块数据
                }else if(e==524){
                  this.getBaoXian() // 查询保险模块数据
                }else if(e==655){
                  this.getZhaiQuan()  // 查询债权模块数据
                }else if(e==656){
                  this.getZhaiWu()  // 查询债务模块数据
                }
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1000
                });
              }).catch((data)=>{
                this.$message.error('删除失败，请联系管理员');
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },

        GoComplatePage () {
          this.IsShow = true;
        },
        quxiao (){
          this.IsShow = false;
        },
        complate () {
          this.GetOutPutWord();  // 请求是否能获取到
          
          
        },
        stepClick (val) {
          var _that = this;
          _that.active = val;
          localStorage.setItem('active',val)
        },
        prev () {
          --this.active;
          if(this.active < 0 ) this.active = 0;
        },
        next () {
          localStorage.setItem('active',this.active)
          if(this.mokuai[this.active].title == '基本信息'){
            // localStorage.setItem('wid',16) 
            // verificationWord ({
            //   quid: 6
            // }).then((data)=>{
            //   if(data.data.status_code == 330){
            //     this.missMsgBox = true
            //     this.missMsg = data.data.data
            //   }else{
            //     if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            //   }
            // }).catch((data)=>{
            // })
            localStorage.setItem('qpid', 595)
            demoYanZheng({
              qpid: 595
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '基本信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '婚姻状况'){
            localStorage.setItem('qpid', 596)
            demoYanZheng({
              qpid: 596
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '婚姻状况信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '子女状况'){
            localStorage.setItem('qpid', 518)
            if(this.aa.ZiNv !== undefined){
              demoYanZheng({
                qpid: 518
              }).then((data)=>{
                console.log(data.data)
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '子女状况模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
            
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 521)
            if(this.aa.FangChan !== undefined){
              demoYanZheng({
                qpid: 521
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '房产信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 637)
            if(this.aa.CunKuan !== undefined){
              demoYanZheng({
                qpid: 637
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '存款信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '车子'){
            localStorage.setItem('qpid', 522)
            if(this.aa.Car !== undefined){
              demoYanZheng({
                qpid: 522
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '车辆信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '理财'){
            localStorage.setItem('qpid', 523)
            if(this.aa.LiCai !== undefined){
              demoYanZheng({
                qpid: 523
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '理财信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '家具家电'){
            localStorage.setItem('qpid', 636)
            if(this.aa.JiaDian !== undefined){
              demoYanZheng({
                qpid: 636
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '家具家电模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '保险'){
            localStorage.setItem('qpid', 524)
            if(this.aa.BaoXian !== undefined){
              demoYanZheng({
                qpid: 524
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '保险信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '其他财产'){
            localStorage.setItem('qpid', 332)
            if(this.aa.ZhaiQuan !== undefined){
              demoYanZheng({
                qpid: 332
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '其他财产已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }else if(this.mokuai[this.active].title == '债权'){
            localStorage.setItem('qpid', 655)
            if(this.aa.ZhaiQuan !== undefined){
              demoYanZheng({
                qpid: 655
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '债权信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
            
          }else if(this.mokuai[this.active].title == '债务'){
            localStorage.setItem('qpid', 656)
            if(this.aa.ZhaiQuan !== undefined){
              demoYanZheng({
                qpid: 656
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '债务信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) this.$router.replace("/ShengChengXieYi");
            }
          }
        },
        closeMissMsgBox () {   // 关闭未填写项弹窗
          this.missMsgBox = false
        },
        GetOutPutWord () {   // 获取离婚协议书未填写项
          // localStorage.setItem('qid',5)
          outPutWord().then((data)=>{
            this.status_code = data.data.status_code
            // console.log(this.status_code)
            if(this.status_code == 330 ){
                this.missField = data.data.data
                this.IsShow = false;
            }else if(this.status_code == 200){
                
                this.$router.replace("/ShengChengXieYi");
                this.missAlert = false
            }
          }).catch((data)=>{
          })
        },
        returnUserList(){
           this.$router.replace("/UserSystem");
        }
      }
    }
</script>
<style>
.min{width:600px;margin:0 auto;}
.ban{width:100% !important;}
.returnUserList{top:110px;right: 20px;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-cascader{width:100% !important;}
.el-select{width:100% !important;}
#alert_xieyi{width:400px;height:300px;border:1px solid #343434;position:fixed;top:50%;margin-top:-150px;left:50%;margin-left:-200px;z-index: 1;background: #fff}
#alert_xieyi h2{margin-top:100px;}
#alert_xieyi .queren{width:80%;text-align: center;justify-content: space-around;margin-top:80px;margin-left: 20%}
#missMsgBox{width:400px;height:400px;position:fixed;top:50%;margin-top:-200px;left:50%;margin-left:-200px;z-index: 1;background: #e2e5d9}
#missMsgBox h2{margin:20px 0;font-weight: bold;font-size: 20px;}
#missMsgBox .queren{width:80%;justify-content: space-around;position: absolute;bottom:10px;left:10%;}
#missAlert{width:250px;height:450px;position:fixed;top:24%;right:2%;z-index: 1;background: #e2e5d9}
#missAlert h2{margin:10px 0;font-weight: bold;font-size: 20px;}
.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;}
</style>
