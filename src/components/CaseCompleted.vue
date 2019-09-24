<template>
    <div>
        <dl class="container mx-auto text-left flex items-center border-b pb-2">
            <dt>
                <img src="@/assets/images/logo.png" alt="">
            </dt>
            <dd class="ml-5">
                <h2 class="text-xl text-orange-500">北京家理律师事务所</h2>
                <h2>你好！{{user}}</h2>
            </dd>
        </dl>
        <div class="container mx-auto flex pb-10">
            <div class="w-2/3">
               <div class="text-left mt-5">
                   <h2 class="text-lg">{{pageInfo.title}}</h2>
                   <h2 id="xinxi" class="py-2 text-orange-500">一、基本信息</h2>
                   <p class="my-1">律所案号：<span>{{ pageInfo.master_number }}</span></p>
                   <p class="my-1">裁判文书：<span>{{  pageInfo.title }}</span></p>
                   <p class="my-1">案由：<span>{{ pageInfo.case_action }}</span></p>
                   <p class="my-1">案号：<span>20190919</span></p>
                   <p class="my-1">法院：<span>北京市人们法院</span></p>
                   <p class="my-1">审理程序：<span>一审</span></p>
                   <p class="my-1">审判人员：审判员：<span>王五</span>；书记员：<span>赵柳</span></p>
                   <p class="my-1">原告代理律师：<span>易轶</span></p>
                   <p class="my-1">被告代理律师：<span>张三</span></p>
                   <h2 id="anqing" class="py-2 text-orange-500">二、基本案情</h2>
                   <p class="pr-10 my-1"><span class="text-orange-500">案情概述：</span><span>{{pageInfo.description}}</span></p>
                   <p class="pr-10 my-1"><span class="text-orange-500">案情看点：</span><span>{{pageInfo.description_spot}}</span></p>
                   <div class="pr-10">
                       <h2 id="suoying" class="py-2 text-orange-500">三、案件缩影</h2>
                       <table class="suoying_table">
                           <thead>
                               <tr>
                                   <td class="w-1/4">争议焦点</td>
                                   <td class="w-1/4">原告观点</td>
                                   <td class="w-1/4">被告观点</td>
                                   <td class="w-1/4">法院观点</td>
                               </tr>
                           </thead>
                           <tbody v-for="(item,index) in pageInfo.case_epitome" :key="item.index">
                                <tr>
                                    <td rowspan="2">{{item.title}}</td>
                                    <td>{{item.data.y.viewpoint}}</td>
                                    <td>{{item.data.b.viewpoint}}</td>
                                    <td>{{item.data.f.viewpoint}}</td>
                                </tr>
                                <tr>
                                    <td>依据：{{item.data.y.basis}}</td>
                                    <td>依据：{{item.data.b.basis}}</td>
                                    <td>依据：{{item.data.f.basis}}</td>
                                </tr>
                           </tbody>
                       </table>
                   </div>
                   <div class="pr-10">
                       <h2 id="biaoqian" class="py-2 text-orange-500">四、标签池</h2>
                       <div><span>离婚</span>、<span>抚养</span>、<span>离婚</span></div>
                   </div>
                   <div class="pr-10">
                       <h2 id="zhaiyao" class="py-2 text-orange-500">五、证据适用摘要</h2>
                       <table class="evidence_table w-full">
                           <thead>
                               <tr>
                                   <td class="w-1/3">身份</td>
                                   <td class="w-1/3">证据名称</td>
                                   <td class="w-1/3">法院认定</td>
                               </tr>
                           </thead>
                           <tbody>
                                <tr v-for="(item,index) in pageInfo.case_evidence.y">
                                    <td class="w-1/3">原告</td>
                                    <td class="w-1/3">{{ item.evidence }}</td>
                                    <td class="w-1/3">{{item.f}}</td>
                                </tr>
                               <tr v-for="(item,index) in pageInfo.case_evidence.b">
                                   <td>被告</td>
                                   <td>{{ item.evidence }}</td>
                                    <td>{{item.f}}</td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
                   <div>
                       <h2 id="falv" class="py-2 text-orange-500">六、法律依据</h2>
                       <div>
                           <p v-for="(item,index) in pageInfo.legal_basis" :key="index" >
                               {{index+1}}、{{item.view}}
                           </p>
                       </div>
                   </div>
               </div>
            </div>
            <div class="w-1/3 pl-10 fixed top-10 right-0">
               <h2 class="text-left text-lg text-black mt-10">快速目录</h2>
                <ul class="text-left">
                    <li class="text-base py-2"><a href="#xinxi">一、基本信息</a></li>
                    <li class="text-base py-2"><a href="#anqing">二、基本案情</a></li>
                    <li class="text-base py-2"><a href="#suoying">三、案件缩影</a></li>
                    <li class="text-base py-2"><a href="#biaoqian">四、标签池</a></li>
                    <li class="text-base py-2"><a href="#zhaiyao">五、适用证据摘要</a></li>
                    <li class="text-base py-2"><a href="#falv">六、法律依据</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import {selectCaseData} from '@/api/api/requestLogin.js'
  export default {
    name: 'CaseCompleted',
    data() {
      return {
        user: localStorage.getItem('name'),
        pageInfo: {
          bad: null,
          case_action: null,
          case_costs: null,
          case_epitome: null,
          case_evidence: null,
          case_number: '',
          case_number_time: 2017,
          case_time: null,
          case_title: null,
          cid: 8,
          city: null,
          content: '',
          court: null,
          create_time: '',
          description: '',
          description_spot: null,
          good: null,
          id:  localStorage.getItem('id'),
          imgs: '',
          json_content: '',
          lawyer_type: null,
          legal_basis: null,
          master: null,
          master_number: null,
          order: null,
          scourt: null,
          status: null,
          subject: null,
          tid: null,
          time: null,
          title: '',
          uid: 1,
          view: null
        }
      }
    },
    mounted(){
      this.getInfo()
    },
    methods: {
      getInfo () {
        selectCaseData().then((data) =>{
          this.pageInfo = data.data;
          this.pageInfo.case_epitome = JSON.parse(data.data.case_epitome);
          this.pageInfo.case_evidence = JSON.parse(data.data.case_evidence);
          this.pageInfo.legal_basis = JSON.parse(data.data.legal_basis);
        }).catch((data)=>{
          // this.$message.error(err);
          alert(data)
        });
      }
    }
  }
</script>

<style scoped>
.suoying_table tr td, .evidence_table tr td{
    border:1px solid orange;
    overflow: auto;
    text-align:center;
    padding:5px;
}

</style>
