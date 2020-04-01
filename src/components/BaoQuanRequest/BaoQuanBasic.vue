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
                        <div v-if="mo.title== '申请人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个申请人信息</h2>
                        </div>
                        <div v-if="mo.title== '被申请人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个被申请人信息</h2>
                        </div>
                        <div v-if="mo.title== '存款' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个存款</h2>
                        </div>
                        <div v-if="mo.title== '理财' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个理财</h2>
                        </div>
                        <div v-if="mo.title== '车辆' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个车辆</h2>
                        </div>
                        <div v-if="mo.title== '房产' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个房产</h2>
                        </div>
                        <div v-if="mo.title== '股票' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股票</h2>
                        </div>
                        <div v-if="mo.title== '股权' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股权</h2>
                        </div>
                        <div v-if="mo.title== '股份' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股份</h2>
                        </div>
                        <div v-if="mo.title== '保险金' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个保险金</h2>
                        </div>
                        <div v-if="mo.title== '其他' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他</h2>
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
                                  :placeholder="$$item.placeholder"
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
                                  <!--日期-精确到日-->
                                  <div v-if="$$$item.type == 'dateTime_day'">
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
                                      <el-date-picker
                                        v-model="$$$item.answer"
                                        type="date"
                                        size="small"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        @change="userAddAnswerAction($$$item)"
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
                                  <!--单选框-->
                                  <div v-if="$$$item.type == 'radio'">
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
                                      <el-radio-group v-model="$$$item.answer" @change='userAddAnswerAction($$$item)'>
                                        <el-radio :label="$$$$item.value" v-for="($$$$item, $$$$index) in $$$item.listData" :key="$$$$index" >{{$$$$item.label}}</el-radio>
                                      </el-radio-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                        <!-- 数字 -->
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
                                        <!-- 多选框 -->
                                        <div v-if="$$$$item.type == 'checkbox'">
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
                                                <div  v-for="($$$item, $$$index) in $$$$item.imgDate" :key="$$$index" popper-class="overflow-y:scroll">
                                                   <img :src="$$$item">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-checkbox-group v-model="$$$$item.answer" >
                                              <el-checkbox :label="$$$item.value" v-for="($$$item, $$$index) in $$$$item.listData" :key="$$$index"  @change='userAddAnswerAction($$$$item)'>{{$$$item.label}}</el-checkbox>
                                            </el-checkbox-group>
                                          </el-form-item>
                                        </div>
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
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
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              type="date"
                                              size="small"
                                              placeholder="选择日期"
                                              format="yyyy 年 MM 月 dd 日"
                                              @change="userAddAnswerAction($$$$item)"
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
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
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
                                            <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                              <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(单选)-->
                                        <div v-if="$$$$item.type == 'select'">
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
                                            <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                              <el-option
                                                v-for="(s,i) in $$$$item.listData"
                                                :key="s.value"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(多选)-->
                                        <div v-if="$$$$item.type == 'select_multiple'">
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
                                            <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
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
                                  <!--下拉框(单选)-->
                                  <div v-if="$$$item.type == 'select'">
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
                                      <el-select v-model="$$$item.answer"  @change='userAddAnswerAction($$$item)' size="small">
                                        <el-option
                                          v-for="(s,i) in $$$item.listData"
                                          :key="s.value"
                                          :label="s.label"
                                          :value="s.value">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                        <!-- 数字 -->
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
                                        <!-- 多选框 -->
                                        <div v-if="$$$$item.type == 'checkbox'">
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
                                                <div  v-for="($$$item, $$$index) in $$$$item.imgDate" :key="$$$index" popper-class="overflow-y:scroll">
                                                   <img :src="$$$item">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-checkbox-group v-model="$$$$item.answer" >
                                              <el-checkbox :label="$$$item.value" v-for="($$$item, $$$index) in $$$$item.listData" :key="$$$index"  @change='userAddAnswerAction($$$$item)'>{{$$$item.label}}</el-checkbox>
                                            </el-checkbox-group>
                                          </el-form-item>
                                        </div>
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
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
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              type="date"
                                              size="small"
                                              placeholder="选择日期"
                                              format="yyyy 年 MM 月 dd 日"
                                              @change="userAddAnswerAction($$$$item)"
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
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
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
                                            <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                              <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(单选)-->
                                        <div v-if="$$$$item.type == 'select'">
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
                                            <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                              <el-option
                                                v-for="(s,i) in $$$$item.listData"
                                                :key="s.value"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(多选)-->
                                        <div v-if="$$$$item.type == 'select_multiple'">
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
                                            <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
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
                                  <!--下拉框(多选)-->
                                  <div v-if="$$$item.type == 'select_multiple'">
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
                                      <el-select v-model="$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$item)'>
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
                                <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                                  <div v-for="($$$$item,$$$$index) in $$item.childQuestion[$$$item]" :key="$$$$index+$$$item">
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
                                    <!-- 单选 -->
                                    <div v-if="$$$$item.type == 'radio'">
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
                                        <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                          <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                        </el-radio-group>
                                      </el-form-item>
                                      <div v-if="$$$$item.grandson">
                                        <div v-for="($$$$$item, $$$$$index) in $$$$item.grandson[$$$$item.answer]" :key="$$$$$index">
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
                                          <!-- 输入框文字类型 -->
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
                                          <!-- 银行卡类型 -->
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
                                          <!-- 单选 -->
                                          <div v-if="$$$$$item.type == 'radio'">
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
                                              <el-radio-group v-model="$$$$$item.answer" @change='userAddAnswerAction($$$$$item)'>
                                                <el-radio :label="$$$$$$item.value" v-for="($$$$$$item, $$$$$$index) in $$$$$item.listData" :key="$$$$$$index" >{{$$$$$$item.label}}</el-radio>
                                              </el-radio-group>
                                            </el-form-item>
                                          </div>
                                          <!-- 多选 -->
                                          <div v-if="$$$$$item.type == 'checkbox'">
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
                                              <el-checkbox-group v-model="$$$$$item.answer" >
                                                <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$$$$item)'>{{list.label}}</el-checkbox>
                                              </el-checkbox-group>
                                            </el-form-item>
                                          </div>
                                          <!-- 下拉单选 -->
                                          <div v-if="$$$$$item.type == 'select'">
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
                                              <el-select v-model="$$$$$item.answer"  @change='userAddAnswerAction($$$$$item)' size="small">
                                                <el-option
                                                  v-for="(s,i) in $$$$$item.listData"
                                                  :key="s.value"
                                                  :label="s.label"
                                                  :value="s.value">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </div>
                                          <!-- 日期  精确到日 -->
                                          <div v-if="$$$$$item.type == 'dateTime_day'">
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
                                              <el-date-picker
                                                v-model="$$$$$item.answer"
                                                type="date"
                                                size="small"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                @change="userAddAnswerAction($$$$$item)"
                                                value-format="yyyy-MM-dd">
                                              </el-date-picker>
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
                                          <!--下拉框(多选)-->
                                          <div v-if="$$$$$item.type == 'select_multiple'">
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
                                              <el-select v-model="$$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$$item)'>
                                                <el-option
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
                                    <!-- 多选 -->
                                    <div v-if="$$$$item.type == 'checkbox'">
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
                                        <el-checkbox-group v-model="$$$$item.answer" >
                                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$$$item)'>{{list.label}}</el-checkbox>
                                        </el-checkbox-group>
                                      </el-form-item>
                                      <div v-if="$$$$item.grandson">
                                        <div v-for="($$$$$item, $$$$$index) in $$$$item.answer" :key="$$$$$index">
                                          <div v-for="($$$$$$item, $$$$$$index) in $$$$item.grandson[$$$$$item]" :key="$$$$$$index">
                                            <!-- 输入框文字类型 -->
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
                                            <!-- 银行卡类型 -->
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
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- 下拉单选 -->
                                    <div v-if="$$$$item.type == 'select'">
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
                                        <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                          <el-option
                                            v-for="(s,i) in $$$$item.listData"
                                            :key="s.value"
                                            :label="s.label"
                                            :value="s.value">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                    </div>
                                    <!-- 日期  精确到日 -->
                                    <div v-if="$$$$item.type == 'dateTime_day'">
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
                                        <el-date-picker
                                          v-model="$$$$item.answer"
                                          type="date"
                                          size="small"
                                          placeholder="选择日期"
                                          format="yyyy 年 MM 月 dd 日"
                                          @change="userAddAnswerAction($$$$item)"
                                          value-format="yyyy-MM-dd">
                                        </el-date-picker>
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
                                    <!--下拉框(多选)-->
                                    <div v-if="$$$$item.type == 'select_multiple'">
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
                                        <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
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
                                <div v-show="!$$$item.requireQidAndAnswer || ($$$item.requireQidAndAnswer && $$item.childQuestion.filter(filterItme=>{return filterItme.id == $$$item.requireQidAndAnswer.id})[0] && $$item.childQuestion.filter(filterItme=>{return filterItme.id == $$$item.requireQidAndAnswer.id})[0].answer == $$$item.requireQidAndAnswer.answer)">
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
                            </div>
                        
                            <!-- 二级问题块 -->
                          </div>
                        </div>
                      </div>
                      <div>
                        <div v-if="mo.title== '申请人信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2542,index)">删除申请人信息</div>
                        </div>
                        <div v-if="mo.title== '被申请人信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2543,index)">删除被申请人信息</div>
                        </div>
                        <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2564,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2566,index)">删除理财</div>
                        </div>
                        <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2567,index)">删除车辆</div>
                        </div>
                        <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2568,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title== '股票' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2569,index)">删除股票</div>
                        </div>
                        <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2570,index)">删除股权</div>
                        </div>
                        <div v-if="mo.title== '股份' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2571,index)">删除股份</div>
                        </div>
                        <div v-if="mo.title== '保险金' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2572,index)">删除保险金</div>
                        </div>
                        <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2573,index)">删除其他</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '申请人信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(2542)">添加申请人信息</div>
                      </div>
                      <div v-if="mo.title== '被申请人信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2543)">添加被申请人信息</div>
                      </div>
                      <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2564)">添加存款</div>
                      </div>
                      <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2566)">添加理财</div>
                      </div>
                      <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2567)">添加车辆</div>
                      </div>
                      <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2568)">添加房产</div>
                      </div>
                      <div v-if="mo.title== '股票' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2569)">添加股票</div>
                      </div>
                      <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2570)">添加股权</div>
                      </div>
                      <div v-if="mo.title== '股份' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2571)">添加股份</div>
                      </div>
                      <div v-if="mo.title== '保险金' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2572)">添加保险金</div>
                      </div>
                      <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2573)">添加其他</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成申请书吗？</h2>
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
          <h2>以下内容未填写无法跳转到下一步</h2>
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
        <el-dialog title="保存问卷" :visible.sync="dialogSavedWenJuan">
          <el-form :model="userWenJuan">
             <el-form-item label="名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="userWenJuan.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="canceldialogSaveWenJuan">取 消</el-button>
            <el-button type="primary" @click="dialogSaveWenJuanOk">保 存</el-button>
          </div>
        </el-dialog>
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

import {returnQuestionnaireJson} from '@/api/api/requestLogin.js' // 查询问卷json
import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书
import {userAddAnswer} from '@/api/api/requestLogin.js' // 用户添加问卷的内容
import {userAddSelectAnswer} from '@/api/api/requestLogin.js' // 添加子女或者起诉原因等
import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js' // 删除子女或者起诉原因等
import {demoYanZheng} from '@/api/api/requestLogin.js' // 验证单独word demo
import {outPutWord} from '@/api/api/requestLogin.js' // 生成数据接口
import { regionData, CodeToText, TextToCode  } from 'element-china-area-data' // 省市联动信息
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
      formLabelWidth: '80px',   // 表单标签宽度
      dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
      userWenJuan:{ // 修改用户问卷
        title: '',     // 标题
      },
      aa: {
        shenqinginfo: [], // 申请人信息
        beishenqinginfo: [], // 被申请人信息
        cunkuan: [], // 存款
        licai: [], // 理财
        car: [], // 车辆
        fangchan: [], // 房产
        gupiao: [], // 股票
        guquan: [], // 股权
        gufen: [], // 股份
        baoxianjin: [],  // 保险金
        qita: [], // 其他
        shishiyuliyou: [], // 事实与理由
        shenqingfayuan: [] // 申请法院
      },
      IsShow: false,
      mokuai: [
        {title: '申请人信息', part: 'shenqinginfo', id: 1,num:2542},
        {title: '被申请人信息', part: 'beishenqinginfo', id: 2,num:2543},
        {title: '存款', part: 'cunkuan', id: 3,num:2564},
        {title: '理财', part: 'licai', id: 4,num:2566},
        {title: '车辆', part: 'car', id: 5,num:2567},
        {title: '房产', part: 'fangchan', id: 6,num:2568},
        {title: '股票', part: 'gupiao', id: 7,num:2569},
        {title: '股权', part: 'guquan', id: 8,num:2570},
        {title: '股份', part: 'gufen', id: 9,num:2571},
        {title: '保险金', part: 'baoxianjin', id: 10,num:2572},
        {title: '其他', part: 'qita', id: 11,num:2573},
        {title: '事实与理由', part: 'shishiyuliyou', id: 12,num:2617},
        {title: '申请法院', part: 'shenqingfayuan', id: 13,num:2627}
      ],
      active: 0,
      options: regionData, // 省市联动
      missMsgBox: false, // 错误信息默认不显示
      missMsg: [], // 验证的时候漏填项
      missAlert: true, // 尚未填写的信息弹框
      status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
      missField: [], // 未填写项目
      flag: false   // 生成协议弹窗是否出现开关

    }
  },
  name: 'BaoQuanBasic',

  beforeMount () {
    this.getshenqinginfo() // 查询申请人信息
    this.getbeishenqinginfo()
    this.getcunkuan()
    this.getlicai()
    this.getcar()
    this.getfangchan()
    this.getgupiao()
    this.getguquan()
    this.getgufen()
    this.getbaoxianjin()
    this.getqita()
    this.getshishiyuliyou()
    this.getshenqingfayuan()
  },
  mounted () {

  },
  methods: {
    getshenqinginfo () { // 获取申请人信息模块数据
      returnQuestionnaireJson({'qpid': 2542}).then((data) => {
        this.aa.shenqinginfo = data.data.data
      }).catch((data) => {
      })
    },
    getbeishenqinginfo(){ // 获取被申请人信息模块数据
      returnQuestionnaireJson({'qpid': 2543}).then((data) => {
        this.aa.beishenqinginfo = data.data.data
      }).catch((data) => {
      })
    },
    getcunkuan(){ // 获取存款模块数据
      returnQuestionnaireJson({'qpid': 2564}).then((data) => {
        this.aa.cunkuan = data.data.data
      }).catch((data) => {
      })
    },
    getlicai(){ // 获取理财模块数据
      returnQuestionnaireJson({'qpid': 2566}).then((data) => {
        this.aa.licai = data.data.data
      }).catch((data) => {
      })
    },
    getcar(){ // 获取车辆模块数据
      returnQuestionnaireJson({'qpid': 2567}).then((data) => {
        this.aa.car = data.data.data
      }).catch((data) => {
      })
    },
    getfangchan(){ // 获取房产模块数据
      returnQuestionnaireJson({'qpid': 2568}).then((data) => {
        this.aa.fangchan = data.data.data
      }).catch((data) => {
      })
    },
    getgupiao(){ // 获取股票模块数据
      returnQuestionnaireJson({'qpid': 2569}).then((data) => {
        this.aa.gupiao = data.data.data
      }).catch((data) => {
      })
    },
    getguquan(){ // 获取股权模块数据
      returnQuestionnaireJson({'qpid': 2570}).then((data) => {
        this.aa.guquan = data.data.data
      }).catch((data) => {
      })
    },
    getgufen(){ // 获取股份模块数据
      returnQuestionnaireJson({'qpid': 2571}).then((data) => {
        this.aa.gufen = data.data.data
      }).catch((data) => {
      })
    },
    getbaoxianjin(){ // 获取保险金模块数据
      returnQuestionnaireJson({'qpid': 2572}).then((data) => {
        this.aa.baoxianjin = data.data.data
      }).catch((data) => {
      })
    },
    getqita(){ // 获取其他模块数据
      returnQuestionnaireJson({'qpid': 2573}).then((data) => {
        this.aa.qita = data.data.data
      }).catch((data) => {
      })
    },
    getshishiyuliyou(){ // 获取事实与理由模块数据
      returnQuestionnaireJson({'qpid': 2617}).then((data) => {
        this.aa.shishiyuliyou = data.data.data
        let cityAnswer = JSON.parse(this.aa.shishiyuliyou[0][0].questions[5].answer)
        this.aa.shishiyuliyou[0][0].questions[5].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
      }).catch((data) => {
      })
    },
    getshenqingfayuan () {
      returnQuestionnaireJson({'qpid': 2627}).then((data) => { // 查询申请法院模块数据
        this.aa.shenqingfayuan = data.data.data
        let cityAnswer = JSON.parse(this.aa.shenqingfayuan[0][0].questions[0].answer)
        this.aa.shenqingfayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
      }).catch((data) => {
      })
    },
    userAddAnswerAction (e) { // 提交答案
      if (e.isRequired == true) { // 必填字段
        if (e.answer == '' || e.answer == null) { // 必填项验证
          this.$message.error('必填项内容不能为空')
        } else {
          if (e.fornum !== undefined) { // 必填多子女
            if (Array.isArray(e.answer)) { // 必填多子女数组类型
              if (e.type == 'select_city') {
                userAddAnswer({
                  value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]), // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                  console.log('保存成功')
                }).catch((data) => {
                  console.log('保存失败')
                })
              } else {
                userAddAnswer({
                  value: JSON.stringify(e.answer), // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                  console.log(data.data)
                }).catch((data) => {
                  console.log('保存失败')
                })
              }
            } else {
              userAddAnswer({ // 必填多子女普通类型
                value: e.answer, // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          } else { // 必填非多子女类型
            if (Array.isArray(e.answer)) { // 必填非多子女类型数组类型
              if (e.type == 'select_city') {
                userAddAnswer({
                  value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]), // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                  if (data.data.status_code == 202) {
                    if (this.active == 0) { // 第一个模块刷新申请人信息
                      this.getshenqinginfo()
                    } else if (this.active == 1) { // 第二个模块刷新被申请人
                      this.getbeishenqinginfo()
                    } else if (this.active == 2) { // 第三个模块刷新存款
                      this.getcunkuan()
                    } else if (this.active == 3) { // 第四个模块刷新理财
                      this.getlicai()
                    } else if (this.active == 4) { // 第五个模块刷新车辆
                      this.getcar()
                    } else if (this.active == 5) { // 第六个模块刷新房产
                      this.getfangchan()
                    } else if (this.active == 6) { // 第七个模块刷新股票
                      this.getgupiao()
                    } else if (this.active == 7) { // 第七个模块刷新股权
                      this.getguquan()
                    } else if (this.active == 8) { // 第七个模块刷新股份
                      this.getgufen()
                    } else if (this.active == 9) { // 第七个模块刷新保险金
                      this.getbaoxianjin()
                    } else if (this.active == 10) { // 第七个模块刷新其他
                      this.getqita()
                    } else if (this.active == 11) { // 第七个模块刷新事实与理由
                      this.getshishiyuliyou()
                    } else if (this.active == 12) { // 第七个模块刷新申请法院
                      this.getshenqingfayuan()
                    }
                  }
                }).catch((data) => {
                })
              } else if (e.type == 'checkbox') {
                userAddAnswer({
                  value: JSON.stringify(e.answer), // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                  if(e.id == 2573){
                    this.getqita()
                  }
                }).catch((data) => {
                  // console.log("保存失败")
                })
              } else {
                userAddAnswer({
                  value: JSON.stringify(e.answer), // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                  // console.log("保存成功")
                }).catch((data) => {
                  // console.log("保存失败")
                })
              }
            } else {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
                if (data.data.status_code == 202) {
                  if (this.active == 0) { // 第一个模块刷新申请人信息
                    this.getshenqinginfo()
                  } else if (this.active == 1) { // 第二个模块刷新被申请人
                    this.getbeishenqinginfo()
                  } else if (this.active == 2) { // 第三个模块刷新存款
                    this.getcunkuan()
                  } else if (this.active == 3) { // 第四个模块刷新理财
                    this.getlicai()
                  } else if (this.active == 4) { // 第五个模块刷新车辆
                    this.getcar()
                  } else if (this.active == 5) { // 第六个模块刷新房产
                    this.getfangchan()
                  } else if (this.active == 6) { // 第七个模块刷新股票
                    this.getgupiao()
                  } else if (this.active == 7) { // 第七个模块刷新股权
                    this.getguquan()
                  } else if (this.active == 8) { // 第七个模块刷新股份
                    this.getgufen()
                  } else if (this.active == 9) { // 第七个模块刷新保险金
                    this.getbaoxianjin()
                  } else if (this.active == 10) { // 第七个模块刷新其他
                    this.getqita()
                  } else if (this.active == 11) { // 第七个模块刷新事实与理由
                    this.getshishiyuliyou()
                  } else if (this.active == 12) { // 第七个模块刷新申请法院
                    this.getshenqingfayuan()
                  }
                }
              }).catch((data) => {
                // console.log("保存失败")
              })
            }
          }
        }
      } else { // 选填字段
        if (e.fornum !== undefined) { // 选填多子女
          if (Array.isArray(e.answer)) {
            if (e.type == 'select_city') {
              userAddAnswer({
                value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]), // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            } else {
              userAddAnswer({
                value: JSON.stringify(e.answer), // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          } else {
            userAddAnswer({
              value: e.answer, // 值
              qpid: e.id, // 关联id
              fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
              quid: localStorage.getItem('quid') // 用户的问卷id
            }).then((data) => {
            }).catch((data) => {
            })
          }
        } else { // 选填非多子女
          if (Array.isArray(e.answer)) { // 选填非多子女数组类型
            if (e.type == 'select_city') {
              userAddAnswer({
                value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]), // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
                if (data.data.status_code == 202) {
                  if (this.active == 0) { // 第一个模块刷新申请人信息
                    this.getshenqinginfo()
                  } else if (this.active == 1) { // 第二个模块刷新被申请人
                    this.getbeishenqinginfo()
                  } else if (this.active == 2) { // 第三个模块刷新存款
                    this.getcunkuan()
                  } else if (this.active == 3) { // 第四个模块刷新理财
                    this.getlicai()
                  } else if (this.active == 4) { // 第五个模块刷新车辆
                    this.getcar()
                  } else if (this.active == 5) { // 第六个模块刷新房产
                    this.getfangchan()
                  } else if (this.active == 6) { // 第七个模块刷新股票
                    this.getgupiao()
                  } else if (this.active == 7) { // 第七个模块刷新股权
                    this.getguquan()
                  } else if (this.active == 8) { // 第七个模块刷新股份
                    this.getgufen()
                  } else if (this.active == 9) { // 第七个模块刷新保险金
                    this.getbaoxianjin()
                  } else if (this.active == 10) { // 第七个模块刷新其他
                    this.getqita()
                  } else if (this.active == 11) { // 第七个模块刷新事实与理由
                    this.getshishiyuliyou()
                  } else if (this.active == 12) { // 第七个模块刷新申请法院
                    this.getshenqingfayuan()
                  }
                }
              }).catch((data) => {
                // console.log("保存失败")
              })
            } else if (e.type == 'checkbox') {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            } else {
              userAddAnswer({
                value: JSON.stringify(e.answer), // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          } else { // 选填非多子女普通类型
            userAddAnswer({
              value: e.answer, // 值
              qpid: e.id, // 关联id
              quid: localStorage.getItem('quid') // 用户的问卷id
            }).then((data) => {
            }).catch((data) => {
            })
          }
        }
      }
    },
    // 提交身份证，银行卡，手机号等验证字段
    numAddAnswer (e) {
      if (e.isRequired == true) { // 必填
        if (e.answer == '' || e.answer == null) {
          this.$message.error('必填项内容不能为空')
        } else {
          if (e.fornum !== undefined) {
            if (e.input_type == 'BankCard') {
              if (e.answer.length >= 20 || e.answer.length <= 15) {
                this.errorAlert('银行卡位数不正确,请重新输入')
                e.answer = ''
              } else {
                userAddAnswer({
                  value: e.answer, // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              }
            } else if (e.input_type == 'PhoneNum') {
              if (e.answer.length >= 16 || e.answer.length <= 6) {
                this.errorAlert('电话号位数不正确,请重新输入')
                e.answer = ''
              } else {
                userAddAnswer({
                  value: e.answer, // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              }
            }
          } else {
            if (e.input_type == 'BankCard') {
              if (e.answer.length >= 20 || e.answer.length <= 15) {
                this.errorAlert('银行卡位数不正确,请重新输入')
                e.answer = ''
              } else {
                userAddAnswer({
                  value: e.answer, // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              }
            } else if (e.input_type == 'PhoneNum') {
              if (e.answer.length >= 16 || e.answer.length <= 6) {
                this.errorAlert('电话号位数不正确,请重新输入')
                e.answer = ''
              } else {
                userAddAnswer({
                  value: e.answer, // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              }
            }
          }
        }
      } else {
        if (e.fornum !== undefined) {
          if (e.input_type == 'BankCard') {
            if (e.answer.length >= 20 || e.answer.length <= 15) {
              this.errorAlert('银行卡位数不正确,请重新输入')
              e.answer = ''
            } else {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          } else if (e.input_type == 'PhoneNum') {
            if (e.answer.length >= 16 || e.answer.length <= 6) {
              this.errorAlert('电话号位数不正确,请重新输入')
              e.answer = ''
            } else {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          }
        } else {
          if (e.input_type == 'BankCard') {
            if (e.answer.length >= 20 || e.answer.length <= 15) {
              this.errorAlert('银行卡位数不正确,请重新输入')
              e.answer = ''
            } else {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          } else if (e.input_type == 'PhoneNum') {
            if (e.answer.length >= 16 || e.answer.length <= 6) {
              this.errorAlert('电话号位数不正确,请重新输入')
              e.answer = ''
            } else {
              userAddAnswer({
                value: e.answer, // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            }
          }
        }
      }
    },
    userAddSelectAnswerAction (e) { // 添加多子女模块按钮
      this.$message({
        message: '添加中请稍后……',
        duration: 1000
      })
      userAddSelectAnswer({
        qpid: e,
        quid: localStorage.getItem('quid')
      }).then((data) => {
        if (data.data.status_code == 200) {
          if (e == 2542) {
            this.getshenqinginfo() // 刷新申请人信息
          } else if (e == 2543) {
            this.getbeishenqinginfo() // 刷新被申请人信息
          } else if (e == 2564) {
            this.getcunkuan() // 刷新存款
          } else if (e == 2566) {
            this.getlicai() // 刷新理财
          } else if (e == 2567) {
            this.getcar() // 刷新车辆
          } else if (e == 2568) {
            this.getfangchan() // 刷新房产
          } else if (e == 2569) {
            this.getgupiao() // 刷新股票
          } else if (e == 2570) {
            this.getguquan() // 刷新股权
          } else if (e == 2571) {
            this.getgufen() // 刷新股份
          } else if (e == 2572) {
            this.getbaoxianjin() // 刷新保险金
          } else if (e == 2573) {
            this.getqita() // 刷新其他
          }
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      }).catch((data) => {
        this.$message.error('添加失败，请联系管理员')
      })
    },
    userDeleteSelectAnswerAction (e, index) { // 删除多子女模块按钮
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDeleteSelectAnswer({
          qpid: e,
          quid: localStorage.getItem('quid'),
          fornum: index + 1
        }).then((data) => {
          if (e == 2542) {
            this.getshenqinginfo() // 刷新申请人信息
          } else if (e == 2543) {
            this.getbeishenqinginfo() // 刷新被申请人信息
          } else if (e == 2564) {
            this.getcunkuan() // 刷新存款
          } else if (e == 2566) {
            this.getlicai() // 刷新理财
          } else if (e == 2567) {
            this.getcar() // 刷新车辆
          } else if (e == 2568) {
            this.getfangchan() // 刷新房产
          } else if (e == 2569) {
            this.getgupiao() // 刷新股票
          } else if (e == 2570) {
            this.getguquan() // 刷新股权
          } else if (e == 2571) {
            this.getgufen() // 刷新股份
          } else if (e == 2572) {
            this.getbaoxianjin() // 刷新保险金
          } else if (e == 2573) {
            this.getqita() // 刷新其他
          }
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
        }).catch((data) => {
          this.$message.error('删除失败，请联系管理员')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    GoComplatePage () { // 点击个性化修改的时候先验证申请法院是否填写，如果填写则弹出框
      let mokuai =this.mokuai
      for(var i =0;i<mokuai.length;i++){
        localStorage.setItem('qpid', mokuai[i].num)
        demoYanZheng({
          qpid: mokuai[i].num
        }).then((data)=>{
          if(data.data.status_code == 330){
            this.missMsgBox = true
            this.missMsg = data.data.data;
            this.flag = false
          }else{
            this.flag = true;
            this.IsShow = true;
          }
        }).catch((data)=>{
        })
      }
      // if(this.flag==true){
      //   this.IsShow = true;
      // }
    },
    quxiao () {
      this.IsShow = false;
      this.flag = false
    },
    complate () {
      this.GetOutPutWord()
    },
    stepClick (val) {
      var _that = this
      _that.active = val
      localStorage.setItem('active', val)
    },
    prev () {
      --this.active
      if (this.active < 0) this.active = 0
    },
    next () {
      localStorage.setItem('active', this.active)
      if (this.mokuai[this.active].title == '申请人信息') {
        localStorage.setItem('qpid', 2542)
        demoYanZheng({
          qpid: 2542
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '申请人信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '被申请人信息') {
        localStorage.setItem('qpid', 2543)
        demoYanZheng({
          qpid: 2543
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '被申请人信息信息已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '存款') {
        localStorage.setItem('qpid', 2564)
        demoYanZheng({
          qpid: 2564
        }).then((data) => {
          // console.log(data.data)
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '存款模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '理财') {
        localStorage.setItem('qpid', 2566)
        demoYanZheng({
          qpid: 2566
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '理财信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '车辆') {
        localStorage.setItem('qpid', 2567)
        demoYanZheng({
          qpid: 2567
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '车辆信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1);
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '房产') {
        localStorage.setItem('qpid', 2568)
        demoYanZheng({
          qpid: 2568
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '房产模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '股票') {
        localStorage.setItem('qpid', 2569)
        demoYanZheng({
          qpid: 2569
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '股票信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '股权') {
        localStorage.setItem('qpid', 2570)
        demoYanZheng({
          qpid: 2570
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '股权信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '股份') {
        localStorage.setItem('qpid', 2571)
        demoYanZheng({
          qpid: 2571
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '股份信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '保险金') {
        localStorage.setItem('qpid', 2572)
        demoYanZheng({
          qpid: 2572
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '保险金信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '其他') {
        localStorage.setItem('qpid', 2573)
        demoYanZheng({
          qpid: 2573
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '其他信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '事实与理由') {
        localStorage.setItem('qpid', 2617)
        demoYanZheng({
          qpid: 2617
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '事实与理由信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '申请法院') {
        localStorage.setItem('qpid', 2627)
        demoYanZheng({
          qpid: 2627
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '申请法院信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      }
    },
    closeMissMsgBox () { // 关闭未填写项弹窗
      this.missMsgBox = false
      this.flag=false
    },
    GetOutPutWord () { // 获取离婚协议书未填写项
      // localStorage.setItem('qid',5)
      outPutWord().then((data) => {
        this.status_code = data.data.status_code
        if (this.status_code == 330) {
          this.missField = data.data.data
          this.IsShow = false
        } else if (this.status_code == 200) {
          this.$router.replace('/BaoQuanPersonalize')
          this.missAlert = false
        }
      }).catch((data) => {
      })
    },
    errorAlert(e) {
      this.$message.error(e);
    },
    canceldialogSaveWenJuan(){   // 取消保存按钮
      this.dialogSavedWenJuan = false;
      this.$router.replace("/UserSystem");
    },
    dialogSaveWenJuanOk(){  // 点击保存确定按钮保存
      userUpdateQuestionnaire({
        status: 1,
        title: this.userWenJuan.title,
        exemption: 1,
        complete: 1
      }).then((data)=>{
        this.userWenJuan.title = '';
        this.dialogSavedWenJuan = false;
        this.$router.replace("/UserSystem");
      }).catch((data)=>{
    
      })
    },
    returnUserList(){  // 返回协议列表
      this.dialogSavedWenJuan = true;
    }
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
.el-radio{line-height: 30px !important;}
</style>
