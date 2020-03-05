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
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个子女情况</h2>
                        </div>
                        <!-- <div v-if="mo.title=='起诉原因' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">起诉原因{{index+1}}</h2>
                        </div>
                        <div v-if="mo.title=='起诉经历' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔起诉经历</h2>
                        </div>
                        <div v-if="mo.title=='诉讼请求' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}辆诉讼请求</h2>
                        </div>
                        <div v-if="mo.title=='诉讼法院' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔诉讼法院</h2>
                        </div>
                        <div v-if="mo.title=='保险' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}份保险</h2>
                        </div>
                        <div v-if="mo.title=='债权' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔债权</h2>
                        </div>
                        <div v-if="mo.title=='债务' ">
                           <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}笔债务</h2>
                        </div> -->
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                  <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                  <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                            <!--银行卡-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='BankCard'" >
                              <el-form-item label="" class="text-base" >
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                  placeholder="请输入18位证件号"
                                  @blur="numAddAnswer($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--手机号-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='PhoneNum'" >
                              <el-form-item label="" class="text-base" >
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                  placeholder="请输入手机号"
                                  @blur="numAddAnswer($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--单选框-->
                            <div v-if="$$item.type == 'radio'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                  <el-radio :label="$$$item.value" v-for="($$$item, $$$index) in $$item.listData" :key="$$$index" >{{$$$item.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                              <div v-if="$$item.childQuestion  && $$item.childQuestion[$$item.answer]">
                                <div v-for="($$$item,$$$index) in $$item.childQuestion[$$item.answer]" :key="$$$index">
                                  <!-- 数字 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                  <!-- 银行卡 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='BankCard'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                        @blur="numAddAnswer($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!-- 手机号 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='PhoneNum'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                        @blur="numAddAnswer($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!--输入框-文字类型-->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                  <!-- 省市三级联动 -->
                                  <div v-if="$$$item.type == 'select_city'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                  <!-- 多选框 -->
                                  <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="($$$$item, $$$$index) in $$$item.imgDate" :key="$$$$index" popper-class="overflow-y:scroll">
                                             <img :src="$$$$item">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-checkbox-group v-model="$$$item.answer" >
                                        <el-checkbox :label="$$$$item.value" v-for="($$$$item, $$$$index) in $$$item.listData" :key="$$$$index"  @change='userAddAnswerAction($$$item)'>{{$$$$item.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]" :key="$$$$$index">
                                          <!-- 数字类型输入框 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!--输入框-文字类型-->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!-- 银行卡 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 手机号 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 省市三级联动 -->
                                          <div v-if="$$$$$item.type == 'select_city'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                        </div>
                                      </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                              <div v-if="$$item.childQuestion">
                                <div v-for="($$$item, $$$$index) in $$item.answer" :key="$$$$index">
                                  <div v-for="($$$$item,$$$$$index) in $$item.childQuestion[$$$item]" :key="$$$$$index">
                                    <!-- 数字类型输入框 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                    <!--输入框-文字类型-->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                    <!-- 银行卡 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 手机号 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                 <!-- 银行卡 -->
                                 <div v-if="$$$item.type == 'input' && $$$item.input_type=='BankCard'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                       @blur="numAddAnswer($$$item)"
                                     ></el-input>
                                   </el-form-item>
                                 </div>
                                 <!-- 手机号 -->
                                 <div v-if="$$$item.type == 'input' && $$$item.input_type=='PhoneNum'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                       @blur="numAddAnswer($$$item)"
                                     ></el-input>
                                   </el-form-item>
                                 </div>
                                 <!--单选框-->
                                 <div v-if="$$$item.type == 'radio'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!-- 数字类型 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!-- 银行卡 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 手机号 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 文本类型 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!-- 数字类型 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                          <!-- 银行卡 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 手机号 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
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
                                                @blur="numAddAnswer($$$$$item)"
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
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                        <!-- 银行卡 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 手机号 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                        <!-- 下拉框时间 -->
                                        <div v-if="$$$$item.type == 'select_day'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
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
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                <!-- 银行卡 -->
                                <div v-if="$$$item.type == 'input' && $$$item.input_type=='BankCard'">
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                      @blur="numAddAnswer($$$item)"
                                    ></el-input>
                                  </el-form-item>
                                </div>
                                <!-- 手机号 -->
                                <div v-if="$$$item.type == 'input' && $$$item.input_type=='PhoneNum'">
                                  <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                      @blur="numAddAnswer($$$item)"
                                    ></el-input>
                                  </el-form-item>
                                </div>
                                <!--单选框-->
                                <div v-if="$$$item.type == 'radio'">
                                 <el-form-item label="" class="text-base">
                                    <div>
                                       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                      <!-- 银行卡 -->
                                      <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
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
                                            @blur="numAddAnswer($$$$item)"
                                          ></el-input>
                                        </el-form-item>
                                      </div>
                                      <!-- 手机号 -->
                                      <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
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
                                            @blur="numAddAnswer($$$$item)"
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
                                      <!-- 下拉框 -->
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
                                            <!-- 银行卡 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
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
                                                  @blur="numAddAnswer($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 手机号 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
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
                                                  @blur="numAddAnswer($$$$$item)"
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
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
                                              v-for="(ss,ii) in $$$$item.listData"
                                              :key="ii"
                                              :label="ss.label"
                                              :value="ss.value">
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
                                            <!-- 银行卡 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
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
                                                  @blur="numAddAnswer($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 手机号 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
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
                                                  @blur="numAddAnswer($$$$$item)"
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                      <!-- 银行卡 -->
                                      <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                            @blur="numAddAnswer($$$$item)"
                                          ></el-input>
                                        </el-form-item>
                                      </div>
                                      <!-- 电话卡 -->
                                      <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                            @blur="numAddAnswer($$$$item)"
                                          ></el-input>
                                        </el-form-item>
                                      </div>
                                      <!--单选框-->
                                      <div v-if="$$$$item.type == 'radio'">
                                       <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                      <!-- 下拉框 -->
                                      <div v-if="$$$$item.type == 'select'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                             <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                              </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                            <!-- 银行卡 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                  @blur="numAddAnswer($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 手机号 -->
                                            <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                                  @blur="numAddAnswer($$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!--单选框-->
                                            <div v-if="$$$$$item.type == 'radio'">
                                             <el-form-item label="" class="text-base">
                                                <div>
                                                   <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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
                                        <div slot="content">
                                          <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                          <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                        </div>
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

                                <!-- 三级问题 -->

                                <div v-if="$$$item.questions ">
                                  <h2 class="text-left text-blue-500">{{$$$item.title}}</h2>
                                  <div v-for="($$$$item, $$$$index) in $$$item.questions" :key="$$$$index">
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                    <!-- 银行卡 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 手机号 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!--单选框-->
                                    <div v-if="$$$$item.type == 'radio'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
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
                                      <div v-if="$$$$item.grandson">
                                        <div v-for="($$$$$item, $$$$$index) in $$$$item.answer" :key="$$$$$index">
                                          <div v-for="($$$$$$item,$$$$$$index) in $$$$item.grandson[$$$$$item]">
                                            <!-- 数字类型 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='number'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$$item.placeholder"
                                                  @blur="userAddAnswerAction($$$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 银行卡 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='BankCard'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$$item.placeholder"
                                                  @blur="numAddAnswer($$$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 手机号 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='PhoneNum'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$$item.placeholder"
                                                  @blur="numAddAnswer($$$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 文本类型 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='text'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
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
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div v-if="mo.title==='子女状况' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(990,index)">删除孩子情况</div>
                        </div>
                        <!-- <div v-if="mo.title==='起诉经历' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(950,index)">删除起诉经历</div>
                        </div> -->
                        <!-- <div v-if="mo.title==='诉讼请求' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(968,index)">删除诉讼请求</div>
                        </div>
                        <div v-if="mo.title==='诉讼法院' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(1000,index)">删除诉讼法院</div>
                        </div> -->
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '子女状况' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(990)">添加孩子情况</div>
                      </div>
                      <!-- <div v-if="mo.title== '起诉经历' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(950)">添加起诉经历</div>
                      </div>
                      <div v-if="mo.title== '诉讼请求' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(968)">添加诉讼请求</div>
                      </div>
                      <div v-if="mo.title== '诉讼法院' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1000)">添加诉讼法院</div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成起诉状吗？</h2>
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
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">个性化修改</el-button>
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
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者起诉原因等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者起诉原因等
  import {verificationWord} from '@/api/api/requestLogin.js'    // 验证单独word
  import {getOnlyValue} from '@/api/api/requestLogin.js'    // 获取单独问题的值
  import {demoYanZheng} from '@/api/api/requestLogin.js'    // 验证单独word demo
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  import { regionData, CodeToText,TextToCode  } from 'element-china-area-data'    // 省市联动信息
  export default {
    components: {
      // label_case,
    },
      data () {
          return {
            hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            a: {},
            aa: {
              BasicInformation: [],    //基本信息
              shishi: [],  //事实理由
              baojingjilu: [],   // 报警记录
              kaifang: [],   //开房记录
              bingli: [],   //病例资料
              hunyin: [],   //婚姻登记信息
              jiankong: [],   //监控
              fangchan: [],// 房产
              car: [],//车辆
              cunkuan: [],//存款
              gongjijin: [],//公积金
              gupiao: [], // 股票
              guquan: [], // 股权
              weixin: [], // 微信
              zhifubao: [], // 支付宝
              licai: [], // 理财
              chaiqian: [], // 拆迁
              shouru: [], // 收入
              baoxian: [], // 保险
              fuxujin: [], // 抚恤金
              sangzang: [], // 丧葬
              biji: [], // 笔迹
              qita: [], // 其他
              shenqingfayuan: [],  // 申请法院
            },
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1},
              {title: '事实与理由', part: 'shishi',id:2},
              // {title: '申请法院', part: 'shenqingfayuan',id:23},
            ],
            active: 0,
            options: regionData,  // 省市联动
            missMsgBox: false,      // 错误信息默认不显示
            missMsg: [],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [] // 未填写项目
          }
      },
      name: 'RequestBasic',

      beforeMount () {
        this.getBasicInformation() // 查询双方基本信息模块数据
        this.getshishi()   // 获取事实与理由
        this.getChuShi()
        
      },
      mounted () {

       },
      methods: {
        getChuShi () {
          getOnlyValue({
            qpid: 1098, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            let getmodel = JSON.parse(data.data.data)
            if(getmodel.indexOf("1") > -1){
              this.getbaojing()
            }
            if(getmodel.indexOf("2") > -1){
              this.getkaifang()
            }
            if(getmodel.indexOf("3") > -1){
              this.getbingli()
            }
            if(getmodel.indexOf("4") > -1){
              this.gethunyin()
            }
            if(getmodel.indexOf("5") > -1){
              this.getjiankong()
            }
            if(getmodel.indexOf("6") > -1){
              this.getfangchan()
            }
            if(getmodel.indexOf("7") > -1){
              this.getcar()
            }
            if(getmodel.indexOf("8") > -1){
              this.getcunkuan()
            }
            if(getmodel.indexOf("9") > -1){
              this.getgongjijin()
            }
            if(getmodel.indexOf("10") > -1){
              this.getgupiao()
            }
            if(getmodel.indexOf("11") > -1){
              this.getguquan()
            }
            if(getmodel.indexOf("12") > -1){
              this.getweixin()
            }
            if(getmodel.indexOf("13") > -1){
              this.getzhifubao()
            }
            if(getmodel.indexOf("14") > -1){
              this.getlicai()
            }
            if(getmodel.indexOf("15") > -1){
              this.getchaiqian()
            }
            if(getmodel.indexOf("16") > -1){
              this.getshouru()
            }
            if(getmodel.indexOf("17") > -1){
              this.getbaoxian()
            }
            if(getmodel.indexOf("18") > -1){
              this.getfuxujin()
            }
            if(getmodel.indexOf("19") > -1){
              this.getsangzang()
            }
            if(getmodel.indexOf("20") > -1){
              this.getbiji()
            }
            if(getmodel.indexOf("21") > -1){
              this.getqita()
            }
            this.getshenqingfayuan()  // 申请法院
          }).catch((data)=>{
            console.log("保存失败")
          })
        },
        getBasicInformation () { // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 1079}).then((data)=>{  // 查询双方基本信息模块数据
            this.aa.BasicInformation = data.data.data
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getshishi () {
          returnQuestionnaireJson({'qpid': 1100}).then((data)=>{  // 查询事实与理由模块数据
            this.aa.shishi = data.data.data
            if(this.aa.shishi[0][0].questions[1].answer == 1 || this.aa.shishi[0][0].questions[1].answer == ""){
                this.aa.shishi[0][0].questions[1].answer = []
              }else{
                this.aa.shishi[0][0].questions[1].answer = JSON.parse(this.aa.shishi[0][0].questions[1].answer)
              }
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getbaojing () {
          returnQuestionnaireJson({'qpid': 1116}).then((data)=>{  // 查询报警记录模块数据
            this.aa.baojing = data.data.data
            this.mokuai.push({
              title: '报警出警记录',
              part: 'baojing',
              id: 3
            })
            let cityAnswer = JSON.parse(this.aa.baojing[0][0].questions[1].answer)
            this.aa.baojing[0][0].questions[1].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getkaifang () {
          returnQuestionnaireJson({'qpid': 1125}).then((data)=>{  // 查询开房记录模块数据
            this.aa.kaifang = data.data.data
            this.mokuai.push({
              title: '开房记录',
              part: 'kaifang',
              id: 4
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getbingli () {
          returnQuestionnaireJson({'qpid': 1131}).then((data)=>{  // 查询病例资料模块数据
            this.aa.bingli = data.data.data
            this.mokuai.push({
              title: '病例资料',
              part: 'bingli',
              id: 5
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        gethunyin () {
          returnQuestionnaireJson({'qpid': 1141}).then((data)=>{  // 查询婚姻登记记录模块数据
            this.aa.hunyin = data.data.data
            this.mokuai.push({
              title: '婚姻登记信息',
              part: 'hunyin',
              id: 6
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getjiankong () {
          returnQuestionnaireJson({'qpid': 1147}).then((data)=>{  // 查询监控录像资料模块数据
            this.aa.jiankong = data.data.data
            this.mokuai.push({
              title: '监控录像资料',
              part: 'jiankong',
              id: 7
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getfangchan () {
          returnQuestionnaireJson({'qpid': 1148}).then((data)=>{  // 查询房产模块数据
            this.aa.fangchan = data.data.data
            this.mokuai.push({
              title: '房产',
              part: 'fangchan',
              id: 8
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getcar () {
          returnQuestionnaireJson({'qpid': 1149}).then((data)=>{  // 查询车辆模块数据
            this.aa.car = data.data.data
            this.mokuai.push({
              title: '车辆',
              part: 'car',
              id: 9
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getcunkuan () {
          returnQuestionnaireJson({'qpid': 1150}).then((data)=>{  // 查询存款模块数据
            this.aa.cunkuan = data.data.data
            this.mokuai.push({
              title: '存款',
              part: 'cunkuan',
              id: 10
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getgongjijin () {
          returnQuestionnaireJson({'qpid': 1151}).then((data)=>{  // 查询公积金模块数据
            this.aa.gongjijin = data.data.data
            this.mokuai.push({
              title: '公积金',
              part: 'gongjijin',
              id: 11
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getgupiao () {
          returnQuestionnaireJson({'qpid': 1152}).then((data)=>{  // 查询股票模块数据
            this.aa.gupiao = data.data.data
            this.mokuai.push({
              title: '股票',
              part: 'gupiao',
              id: 12
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getguquan () {
          returnQuestionnaireJson({'qpid': 1153}).then((data)=>{  // 查询股权模块数据
            this.aa.guquan = data.data.data
            this.mokuai.push({
              title: '股权',
              part: 'guquan',
              id: 13
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getweixin () {
          returnQuestionnaireJson({'qpid': 1154}).then((data)=>{  // 查询微信钱包模块数据
            this.aa.weixin = data.data.data
            this.mokuai.push({
              title: '微信钱包',
              part: 'weixin',
              id: 14
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getzhifubao () {
          returnQuestionnaireJson({'qpid': 1155}).then((data)=>{  // 查询支付宝模块数据
            this.aa.zhifubao = data.data.data
            this.mokuai.push({
              title: '支付宝',
              part: 'zhifubao',
              id: 15
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getlicai () {
          returnQuestionnaireJson({'qpid': 1156}).then((data)=>{  // 查询理财模块数据
            this.aa.licai = data.data.data
            this.mokuai.push({
              title: '理财',
              part: 'licai',
              id: 16
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getchaiqian () {
          returnQuestionnaireJson({'qpid': 1157}).then((data)=>{  // 查询拆迁档案（分家析产）模块数据
            this.aa.chaiqian = data.data.data
            this.mokuai.push({
              title: '拆迁档案（分家析产）',
              part: 'chaiqian',
              id: 17
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getshouru () {
          returnQuestionnaireJson({'qpid': 1158}).then((data)=>{  // 查询收入明细模块数据
            this.aa.shouru = data.data.data
            this.mokuai.push({
              title: '收支明细',
              part: 'shouru',
              id: 18
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getbaoxian () {
          returnQuestionnaireJson({'qpid': 1159}).then((data)=>{  // 查询保险模块数据
            this.aa.baoxian = data.data.data
            this.mokuai.push({
              title: '保险',
              part: 'baoxian',
              id: 19
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getfuxujin () {
          returnQuestionnaireJson({'qpid': 1160}).then((data)=>{  // 查询抚恤金模块数据
            this.aa.fuxujin = data.data.data
            this.mokuai.push({
              title: '抚恤金',
              part: 'fuxujin',
              id: 20
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getsangzang () {
          returnQuestionnaireJson({'qpid': 1161}).then((data)=>{  // 查询丧葬费模块数据
            this.aa.sangzang = data.data.data
            this.mokuai.push({
              title: '丧葬费',
              part: 'sangzang',
              id: 21
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getbiji () {
          returnQuestionnaireJson({'qpid': 1162}).then((data)=>{  // 查询笔迹模块数据
            this.aa.biji = data.data.data
            this.mokuai.push({
              title: '笔迹',
              part: 'biji',
              id: 22
            })
            if(this.aa.biji[0][0].questions[1].answer == 1 || this.aa.biji[0][0].questions[1].answer == ""){
                this.aa.biji[0][0].questions[1].answer = []
              }else{
                this.aa.biji[0][0].questions[1].answer = JSON.parse(this.aa.biji[0][0].questions[1].answer)
              }
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getqita () {
          returnQuestionnaireJson({'qpid': 1163}).then((data)=>{  // 查询其他模块数据
            this.aa.qita = data.data.data
            this.mokuai.push({
              title: '其他',
              part: 'qita',
              id: 23
            })
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        getshenqingfayuan(){
          returnQuestionnaireJson({'qpid': 1236}).then((data)=>{  // 查询申请法院模块数据
            this.aa.shenqingfayuan = data.data.data
            this.mokuai.push({
              title: '申请法院',
              part: 'shenqingfayuan',
              id: 23
            })
            let cityAnswer = JSON.parse(this.aa.shenqingfayuan[0][0].questions[0].answer)
            this.aa.shenqingfayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
          this.mokuai.sort(this.compare('id'));
        },
        compare (property) {
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2
          }
        },
        userAddAnswerAction (e){ // 提交答案
          if( e.isRequired == true){ // 必填字段
            if( e.answer == '' || e.answer == null){  // 必填项验证
              this.$message.error('必填项内容不能为空');
            }else{
              if(e.fornum !== undefined){  // 必填多子女
                if(Array.isArray(e.answer)){ // 必填多子女数组类型
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
                      console.log(data.data)
                    }).catch((data)=>{
                       console.log("保存失败")
                    })
                  }
                }else{
                  userAddAnswer({  // 必填多子女普通类型
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    console.log(data)
                  }).catch((data)=>{
                     console.log("保存失败")
                  })
                }
              }else{   // 必填非多子女类型
                if(Array.isArray(e.answer)){  // 必填非多子女类型数组类型
                  if(e.type == "select_city"){
                    userAddAnswer({
                      value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                      qpid: e.id, // 关联id
                      // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      if(data.data.status_code==202){
                        if(this.active==0){// 第一个模块刷新基本信息
                          this.getBasicInformation()
                        }else if(this.active==1){// 第二个模块刷新婚姻状况
                          this.getHunYinStatus()
                        }else if(this.active==2){// 第三个模块刷新子女状况
                          this.returnZiNv()
                        }else if(this.active==3){// 第四个模块刷新起诉原因
                          this.returnQiSuYuanYin()
                        }else if(this.active==4){// 第五个模块刷新起诉经历
                          this.returnQiSuJingLi()
                        }else if(this.active==5){// 第六个模块刷新诉讼请求
                          this.returnSuSongQingQiu()
                        }else if(this.active==6){// 第七个模块刷新诉讼法院
                          this.returnQiSuFaYuan()
                        }
                      }
                    }).catch((data)=>{
                       // console.log("保存失败")
                    })
                  }else if(e.type == "checkbox"){
                    // console.log(e.answer)
                    userAddAnswer({
                      value: JSON.stringify(e.answer),  // 值
                      qpid: e.id, // 关联id
                      // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      if(e.id == 973){
                        console.log(typeof(e.answer))
                        let a = e.answer
                        let e =[]
                        for(var i=0;i<a.length;i++){
                          // a[i] += a[i]+''
                         console.log(a[i])
                        }
                        console.log(e)
                        this.getSuSongQingQiuMsg()
                        console.log(this.aa.SuSongQingQiu[0][2].questions[0].answer)
                      }
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
                    if(data.data.status_code==202){
                      if(this.active==0){// 第一个模块刷新基本信息
                        this.getBasicInformation()
                      }else if(this.active==1){// 第二个模块刷新婚姻状况
                        this.getHunYinStatus()
                      }else if(this.active==2){// 第三个模块刷新子女状况
                        this.returnZiNv()
                      }else if(this.active==3){// 第四个模块刷新起诉原因
                        this.returnQiSuYuanYin()
                      }else if(this.active==4){// 第五个模块刷新起诉经历
                        this.returnQiSuJingLi()
                      }else if(this.active==5){// 第六个模块刷新诉讼请求
                        this.returnSuSongQingQiu()
                      }else if(this.active==6){// 第七个模块刷新诉讼法院
                        this.returnQiSuFaYuan()
                      }
                    }
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }
              }
            }
          }else{  // 选填字段
            if(e.fornum !== undefined){  // 选填多子女
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
            }else{  // 选填非多子女
              if(Array.isArray(e.answer)){  // 选填非多子女数组类型
                if(e.type == "select_city"){
                  userAddAnswer({
                    value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    if(data.data.status_code==202){
                      if(this.active==0){// 第一个模块刷新基本信息
                        this.getBasicInformation()
                      }else if(this.active==1){// 第二个模块刷新婚姻状况
                        this.getHunYinStatus()
                      }else if(this.active==2){// 第三个模块刷新子女状况
                        this.returnZiNv()
                      }else if(this.active==3){// 第四个模块刷新起诉原因
                        this.returnQiSuYuanYin()
                      }else if(this.active==4){// 第五个模块刷新起诉经历
                        this.returnQiSuJingLi()
                      }else if(this.active==5){// 第六个模块刷新诉讼请求
                        this.returnSuSongQingQiu()
                      }else if(this.active==6){// 第七个模块刷新诉讼法院
                        this.returnQiSuFaYuan()
                      }
                    }
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }else if(e.type== "checkbox"){
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    // this.getSuSongQingQiuMsg()
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
              }else{  // 选填非多子女普通类型
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
        // 提交身份证，银行卡，手机号等验证字段
        numAddAnswer(e){
          if(e.isRequired == true){ //必填
            if(e.answer == '' || e.answer == null){
               this.$message.error('必填项内容不能为空');
            }else{
              if(e.fornum !== undefined){
                if(e.input_type =='BankCard'){
                  if(e.answer.length >= 20 || e.answer.length <= 15 ){
                    this.errorAlert('银行卡位数不正确,请重新输入')
                    e.answer =''
                  }else{
                    userAddAnswer({
                      value: e.answer,  // 值
                      qpid: e.id, // 关联id
                      fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                    }).catch((data)=>{
                    })
                  }
                }else if(e.input_type =='PhoneNum'){
                  if(e.answer.length >= 16 || e.answer.length <= 6 ){
                    this.errorAlert('电话号位数不正确,请重新输入')
                    e.answer =''
                  }else{
                    userAddAnswer({
                      value: e.answer,  // 值
                      qpid: e.id, // 关联id
                      fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                    }).catch((data)=>{
                    })
                  }
                }
              }else{
                if(e.input_type =='BankCard'){
                  if(e.answer.length >= 20 || e.answer.length <= 15 ){
                    this.errorAlert('银行卡位数不正确,请重新输入')
                    e.answer =''
                  }else{
                    userAddAnswer({
                      value: e.answer,  // 值
                      qpid: e.id, // 关联id
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                    }).catch((data)=>{
                    })
                  }
                }else if(e.input_type =='PhoneNum'){
                  if(e.answer.length >= 16 || e.answer.length <= 6 ){
                    this.errorAlert('电话号位数不正确,请重新输入')
                    e.answer =''
                  }else{
                    userAddAnswer({
                      value: e.answer,  // 值
                      qpid: e.id, // 关联id
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                    }).catch((data)=>{
                    })
                  }
                }
              }
            }
          }else{
            if(e.fornum !== undefined){
              if(e.input_type =='BankCard'){
                if(e.answer.length >= 20 || e.answer.length <= 15 ){
                  this.errorAlert('银行卡位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }else if(e.input_type =='PhoneNum'){
                if(e.answer.length >= 16 || e.answer.length <= 6 ){
                  this.errorAlert('电话号位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }
            }else{
              if(e.input_type =='BankCard'){
                if(e.answer.length >= 20 || e.answer.length <= 15 ){
                  this.errorAlert('银行卡位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }else if(e.input_type =='PhoneNum'){
                if(e.answer.length >= 16 || e.answer.length <= 6 ){
                  this.errorAlert('电话号位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }
            }
          }
        },
        userAddSelectAnswerAction (e){   // 添加子女或者起诉原因等
            this.$message({
              message:'添加中请稍后……',
              duration: 1000
            });
            userAddSelectAnswer({
              qpid: e,
              quid: localStorage.getItem('quid')
            }).then((data)=>{
              if(data.data.status_code == 200 ){
                if(e==990){
                  this.getZiNv()  // 查询子女模块数据
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
        userDeleteSelectAnswerAction (e,index) { // 删除子女或者起诉原因等信息
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
                if(e==990){
                  this.getZiNv()  // 查询子女模块数据
                }else if(e==948){
                  this.getQiSuYuanYin() // 查询起诉原因模块数据
                }else if(e==950){
                  this.getQiSuJingLi()  // 查询起诉经历模块数据
                }else if(e==968){
                  this.getSuSongQingQiu()   // 查询诉讼请求模块数据
                }else if(e==1000){
                  this.getQiSuFaYuan()  // 查询诉讼法院模块数据
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
          this.GetOutPutWord();
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
            localStorage.setItem('qpid', 1079)
            demoYanZheng({
              qpid: 1079
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
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '事实与理由'){
            localStorage.setItem('qpid', 1100)
            demoYanZheng({
              qpid: 1100
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '事实与理由信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '申请法院'){
            localStorage.setItem('qpid', 1236)
            if(this.aa.ZiNv !== undefined){
              demoYanZheng({
                qpid: 1236
              }).then((data)=>{
                // console.log(data.data)
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '申请法院模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) ;
            }

          }else if(this.mokuai[this.active].title == '报警出警记录'){
            localStorage.setItem('qpid', 1116)
            if(this.aa.QiSuYuanYin !== undefined){
              demoYanZheng({
                qpid: 1116
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '报警出警记录信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) ;
            }
          }else if(this.mokuai[this.active].title == '开房记录'){
            localStorage.setItem('qpid', 1125)
            if(this.aa.QiSuJingLi !== undefined){
              demoYanZheng({
                qpid: 1125
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '开房记录信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1);
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) ;
            }
          }else if(this.mokuai[this.active].title == '病例资料'){
            localStorage.setItem('qpid', 1131)
            if(this.aa.SuSongQingQiu !== undefined){
              demoYanZheng({
                qpid: 1131
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '病例资料模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1) ;
            }
          }else if(this.mokuai[this.active].title == '婚姻登记信息'){
            localStorage.setItem('qpid', 1141)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1141
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '婚姻登记信息信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '监控录像资料'){
            localStorage.setItem('qpid', 1147)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1147
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '监控录像资料信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 1148)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1148
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
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '车辆'){
            localStorage.setItem('qpid', 1149)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1149
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
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 1150)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1150
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
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '公积金'){
            localStorage.setItem('qpid', 1151)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1151
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '公积金信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '股票'){
            localStorage.setItem('qpid', 1152)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1152
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '股票信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '股权'){
            localStorage.setItem('qpid', 1153)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1153
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '股权信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '微信钱包'){
            localStorage.setItem('qpid', 1154)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1154
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '微信钱包信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '支付宝'){
            localStorage.setItem('qpid', 1155)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1155
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '支付宝信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '理财'){
            localStorage.setItem('qpid', 1156)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1156
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
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '拆迁档案'){
            localStorage.setItem('qpid', 1157)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1157
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '拆迁档案信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '收入明细'){
            localStorage.setItem('qpid', 1158)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1158
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '收入明细信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '保险'){
            localStorage.setItem('qpid', 1159)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1159
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
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '抚恤金'){
            localStorage.setItem('qpid', 1160)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1160
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '抚恤金信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '丧葬金'){
            localStorage.setItem('qpid', 1161)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1161
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '丧葬金信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '笔迹'){
            localStorage.setItem('qpid', 1162)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1162
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '笔迹信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
            }
          }else if(this.mokuai[this.active].title == '其他'){
            localStorage.setItem('qpid', 1163)
            if(this.aa.QiSuFaYuan !== undefined){
              demoYanZheng({
                qpid: 1163
              }).then((data)=>{
                if(data.data.status_code == 330){
                  this.missMsgBox = true
                  this.missMsg = data.data.data
                }else{
                  this.$notify({
                    title: '保存成功',
                    message: '其他信息模块已成功保存',
                    type: 'success'
                  });
                  if (this.active++ >this.mokuai.length-1) ;
                }
              }).catch((data)=>{
              })
            }else{
              if (this.active++ >this.mokuai.length-1);
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

                this.$router.replace("/RequestPersonalize");
                this.missAlert = false
            }
          }).catch((data)=>{
          })
        },
        returnUserList(){
           this.$router.replace("/UserSystem");
        },
        errorAlert(e) {
          this.$message.error(e);
        },
      }
    }
</script>
<style>
html{height: 100%;background-color: #f7fafc;}
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
#missAlert h2{margin:20px 0;font-weight: bold;font-size: 20px;}
#caseMsg{line-height:30px !important;text-indent:2em;}
.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;}
</style>
