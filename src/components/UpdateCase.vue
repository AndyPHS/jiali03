<template>
    <div>
        <!--<head-menu></head-menu>-->
        <dl class="mx-10 text-left flex items-center border-b pb-2">
            <dt>
                <img src="@/assets/images/logo.png" alt="">
            </dt>
            <dd class="ml-5">
                <h2 class="text-xl text-orange-500">北京家理律师事务所</h2>
                <h2>你好！{{user}}</h2>
            </dd>
        </dl>
        <div class="mx-10 px-2">
            <div class="w-1/2 panjue float-left">
                <div class="py-6">
                    <h2 class="text-xl mb-2">{{pageInfo.title}}判决书</h2>
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="查看world版本" name="first">
                            <div>
                                <h2 class="text-xl py-2">{{pageInfo.title}}</h2>
                                <p class="text-right py-2 mr-5">{{pageInfo.case_number}}</p>
                                <div class="info_content mr-2">{{pageInfo.content}}</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="查看图片版本" name="second">
                            <ul>
                                <li v-for="item in pageInfo.imgs" :key="item.id"><img :src="item" alt=""></li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="w-1/2 write float-right">
                <div class="w-4/5 mx-auto">
                    <h2 class="my-4 py-2 text-xl text-left border-b border-1">
                        <span class="">案件信息填写</span>
                    </h2>
                    <div class="pl-5">
                        <el-form ref="pageInfo" :model="pageInfo" label-width="120px" >
                            <h2 class="text-left text-base pb-2 text-orange-500">一、案件基本信息</h2>
                            <el-form-item label="律所案号：" class="text-base">
                                <el-input v-model="pageInfo.master_number"  @blur="updateInfo({master_number: pageInfo.master_number})"></el-input>
                            </el-form-item>
                            <el-form-item label="文书类型：">
                                <el-select v-model="pageInfo.status" placeholder="文书类型" @change="updateInfo({status:pageInfo.status})" >
                                    <el-option label="判决书" value="1"></el-option>
                                    <el-option label="裁定书" value="2"></el-option>
                                    <el-option label="调解书" value="3"></el-option>
                                    <el-option label="其他" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="法院层级">
                                <el-select v-model="pageInfo.court" placeholder="法院层级" @change="updateInfo({court:pageInfo.court})">
                                    <el-option label="基层人民法院" value="1"></el-option>
                                    <el-option label="中级人民法院" value="2"></el-option>
                                    <el-option label="高级人民法院" value="3"></el-option>
                                    <el-option label="最高人民法院" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="案由：(待和后台商议)" class="text-base">
                                <el-input v-model="pageInfo.case_action"></el-input>
                            </el-form-item>
                            <el-form-item label="法庭：" class="text-base">
                                <el-select v-model="pageInfo.scourt" placeholder="法院层级" @change="updateInfo({scourt:pageInfo.scourt})">
                                    <el-option v-for="item of scourt" :label="item.name" :value="item.id" :key="item.id">{{item.name}}</el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审判程序：" class="text-base">
                                <el-select v-model="pageInfo.subject" placeholder="法院层级" @change="updateInfo({subject:pageInfo.subject})">
                                    <el-option label="一审" value="1"></el-option>
                                    <el-option label="二审" value="2"></el-option>
                                    <el-option label="再审" value="3"></el-option>
                                    <el-option label="其他" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <div :inline="true"  class="demo-form-inline">
                                <el-form-item label="审判员：">
                                    <el-input v-model="pageInfo.court" placeholder="审判员"></el-input>
                                </el-form-item>
                                <el-form-item label="法官助理：">
                                    <el-input v-model="pageInfo.court" placeholder="法官助理"></el-input>
                                </el-form-item>
                                <el-form-item label="书记员：">
                                    <el-input v-model="pageInfo.court" placeholder="书记员"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="原告代理律师：" class="text-base">
                                <el-input v-model="pageInfo.json_y"></el-input>
                            </el-form-item>
                            <el-form-item label="被告代理律师：" class="text-base">
                                <el-input v-model="pageInfo.court"></el-input>
                            </el-form-item>
                            <h2 class="text-left text-base pb-2 text-orange-500">二、基本案情</h2>
                            <el-form-item label="案情概述" class="text-orange-500" >
                                <el-input type="textarea" :rows="4" class="textarea" v-model="pageInfo.description" @blur="updateInfo({description:pageInfo.description})"></el-input>
                            </el-form-item>
                            <el-form-item label="案情看点" class="text-orange-500">
                                <el-input type="textarea" :rows="4" class="textarea" v-model="pageInfo.description_spot" @blur="updateInfo({description_spot:pageInfo.description_spot})"></el-input>
                            </el-form-item>
                            <h2 class="text-left text-base pb-2 text-orange-500">三、案件缩影</h2>
                            <ul>
                                <li v-for="(item, index) in pageInfo.case_epitome" :key="item.index" class="case_epitome">
                                    <el-form-item :label="'争议焦点'+ (index+1) + '：' " class="text-base">
                                        <el-input v-model="item.title" placeholder="争议焦点"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item label="原告观点：" class="text-base">
                                        <el-input v-model="item.data.y.viewpoint" placeholder="原告观点" @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <!--<el-form-item :label=" '依据' + (index+1) +':' " class="text-orange-500" v-for="(itemY, index) in item.data.y.basis" :key="itemY.index">-->
                                        <!--<el-input class="textarea" v-model="itemY.view"></el-input>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label=" 依据 ： " class="text-orange-500" >
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="原告依据" v-model="item.data.y.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item label="被告观点" class="text-orange-500">
                                        <el-input  v-model="item.data.b.viewpoint" placeholder="被告观点" @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="  依据 ： " class="text-orange-500" >
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="被告依据" v-model="item.data.b.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>

                                    </el-form-item>
                                    <el-form-item label="法院观点" class="text-orange-500">
                                        <el-input  v-model="item.data.f.viewpoint" placeholder="法院观点"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item  label=" 依据 ： " class="text-orange-500">
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="法院依据" v-model="item.data.f.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                            <el-row>
                                <el-button type="primary" @click="add_case_epitome">新增焦点</el-button>
                            </el-row>
                            <h2 class="text-left text-base pb-2 text-orange-500">四、标签池</h2>
                            <legal_basis></legal_basis>
                            <h2 class="text-left text-base pb-2 text-orange-500 mt-4">五、证据适用摘要</h2>
                            <el-button type="primary" v-if="pageInfo.case_evidence.y.length == 0" @click="addEvidence('y')">添加原告证据</el-button>
                            <div v-for="(item, index) in pageInfo.case_evidence.y" :key="'y'+index" class="my-4">
                                <el-form-item label="原告">
                                    <div class="flex">
                                        <el-input class="mr-2" v-model="item.evidence" @blur="updateInfo({case_evidence:pageInfo.case_evidence})" ></el-input>
                                        <el-button type="primary" v-if="index === pageInfo.case_evidence.y.length-1" @click="addEvidence('y')">添加</el-button>
                                        <el-button type="danger" v-else @click="delEvidence(index,'y')">删除</el-button>
                                    </div>
                                </el-form-item>
                                <el-radio-group v-model="item.f" class="ml-20" @change="updateInfo({case_evidence:pageInfo.case_evidence})">
                                    <el-radio label="法院认同" value="1"></el-radio>
                                    <el-radio label="法院不认同"  value="0"></el-radio>
                                    <el-radio label="法院未表态" value="2"></el-radio>
                                </el-radio-group>
                            </div>
                            <el-button v-if="pageInfo.case_evidence.b.length == 0" @click="addEvidence('b')">添加被告证据</el-button>
                            <div class="py-4" v-for="(item, index) in pageInfo.case_evidence.b" :key="'b'+index">
                                <el-form-item label="被告">
                                    <div class="flex">
                                        <el-input class="mr-2" v-model="item.evidence"  @blur="updateInfo({case_evidence:pageInfo.case_evidence})"></el-input>
                                        <el-button type="primary" v-if="index === pageInfo.case_evidence.b.length-1" @click="addEvidence('b')">添加</el-button>
                                        <el-button type="danger" v-else @click="delEvidence(index,'b')">删除</el-button>
                                    </div>
                                </el-form-item>
                                <el-radio-group v-model="item.f" class="ml-20" @change="updateInfo({case_evidence:pageInfo.case_evidence})">
                                    <el-radio label="法院认同" value="1"></el-radio>
                                    <el-radio label="法院不认同"  value="0"></el-radio>
                                    <el-radio label="法院未表态" value="2"></el-radio>
                                </el-radio-group>
                            </div>
                            <h2 class="text-left text-base pb-2 text-orange-500">六、法律依据</h2>
                            <div v-for="(item,index) in pageInfo.legal_basis" :key="index"  class="flex my-2">
                                <el-input type="textarea" v-model="item.view" class="mr-4" @blur="updateInfo({legal_basis:pageInfo.legal_basis})"></el-input>
                                <el-button type="primary" v-if="index === pageInfo.legal_basis.length-1" @click="addLegalBasis()">添加依据</el-button>
                                <el-button type="danger" v-else @click="delLegalBasis(index)">删除依据</el-button>
                            </div>
                            <h2 class="text-left text-base py-2 text-orange-500">七、文书正文</h2>
                            <div class="">
                                <div>
                                    <h2 class="text-xl py-2">{{pageInfo.title}}</h2>
                                    <p class="text-right py-2 mr-5">{{pageInfo.case_number}}</p>
                                    <div class="info_content mr-2">{{pageInfo.content}}</div>
                                </div>
                            </div>
                        </el-form>
                        <el-row class="my-5">
                            <el-button type="primary" round @click="goNewPage()">生成页面</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {selectCaseData} from '@/api/api/requestLogin.js'
  import {updateCaseData} from '@/api/api/requestLogin.js'   // 修改页面信息
  import {addCaseAction} from '@/api/api/requestLogin.js'
  import {getCaseCourtMsg} from '@/api/api/requestLogin.js'  // 查询法庭信息
  import legal_basis from '@/components/partials/legal_basis'  // 标签组件
  export default {
    components: {
      // HeadMenu
      legal_basis
    },
    name: 'UpdateCase',
    data() {
      return {
        imgs: [],
        user: localStorage.getItem('name'),
        pageInfo:{
          id: '',
          tid: null,
          court: null,      // 法院
          scourt: null,
          title: "王宝强于马蓉婚姻纠纷",   // 标题
          master_number: '',        // 律所案号
          time: null,
          status: null,           // 判决书类型
          case_action: null,      // 案由
          case_number: "(2017)京0106民初17500号",
          subject: null,
          lawyer_type: null,
          case_costs: null,
          case_time: null,
          order: null,
          master: null,
          case_number_time: 2017,
          view: null,
          good: null,
          bad: null,
          description: '',         // 案情概述
          description_spot: null,  // 案情看点
          case_epitome: null,    // 案件缩影
          case_evidence: null,  // 证据摘要
          legal_basis: null,   //法律依据
          cid: 2,
          content: '',       // 判决书内容
          imgs: '',          // 判决书图片
          json_content: ''
        },
        case_action: {
          name:''
        },
        scourt: null,
        activeName: 'first'
      }
    },
    mounted(){
      this.getInfo(); // 获取页面信息
      this.getCaseCourtMsg ();  // 获取法庭信息
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      getInfo () {
        selectCaseData().then((data) => {
          this.pageInfo = data.data;
          this.pageInfo.imgs = JSON.parse(data.data.imgs)
          this.pageInfo.case_epitome = JSON.parse(data.data.case_epitome)
          if(data.data.case_epitome == null) {
            this.pageInfo.case_epitome = [{  // 案件缩影格式定义
              title: '',
              data: {
                y: {
                  viewpoint: '',
                  basis: ''
                },
                b: {
                  viewpoint: '',
                  basis: ''
                },
                f: {
                  viewpoint: '',
                  basis: ''
                }

              }
            }]
          };
          this.pageInfo.case_evidence = JSON.parse(data.data.case_evidence); //证据摘要格式定义
          if(data.data.case_evidence == null) {
            this.pageInfo.case_evidence = {
              y: [
                {
                  evidence: '孩子是我的',
                  f: 0
                },
                {
                  evidence: '孩子bu是我的',
                  f: 1
                }
              ],
              b: []
            }
          };
          this.pageInfo.legal_basis = JSON.parse(data.data.legal_basis); // 法律依据格式摘要
          if(data.data.legal_basis == null) {
            this.pageInfo.legal_basis = [{
              view: ''
            }]
          };
        }).catch((data)=>{
          // this.$message.error(err);
          alert(data)
        });
      },
      //添加证据摘要
      addEvidence(type){
        console.log(type)
        this.pageInfo.case_evidence[type].push({
          evidence: '',
          [type]: ''
        })
      },
      //删除证据摘要
      delEvidence(index,type){
        this.pageInfo.case_evidence[type].splice(index,1);
      },
      // 添加法律依据
      addLegalBasis () {
        this.pageInfo.legal_basis.push({
          view:''
        })
      },
      // 删除法律依据
      delLegalBasis (index) {
        this.pageInfo.legal_basis.splice(index,1);
      },
      updateInfo (e) {
        updateCaseData(e).then((data) =>{
          console.log(JSON.parse(data.config.data))
        })
      },
      // 增加案由
      // addCaseAction (e) {
      //   addCaseAction(e).then((data) =>{
      //     console.log(data)
      //   })
      // },
      // 新增焦点
      add_case_epitome () {
        this.pageInfo.case_epitome.push({
            title: '这是标题',
            data: {
              y: {
                  viewpoint: '原告主张',
                  basis: '原告依据'
              },
              b: {
                viewpoint: '被告主张',
                  basis: '被告依据'
              },
              f: {
                viewpoint: '法院主张',
                  basis: '法院依据'
              }

            }
        })
      },
      // 查询法庭信息
      getCaseCourtMsg () {
        getCaseCourtMsg().then((data) =>{
          this.scourt = data.data.data;
        })
      },
      // 生成页面
      goNewPage () {
        this.$router.replace("/CaseCompleted");
      }

    }
}
</script>

<style scoped lang="less">
    .el-form-item{
        margin-bottom:12px !important;
    }
    .el-textarea__inner{
        min-height: 120px !important;
    }
    .textarea textarea{
        min-height:120px !important;
    }
    .addContent{
        width: 50px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 25px;
        background: #18b2fb;
        color: white;
        margin: 10px 5px;
        cursor:pointer;
    }
    .info_content{
        white-space: pre-line;
        text-align:left;
    }
    .panjue ,.write{
        height:800px;
        overflow-y: scroll;
    }

</style>
