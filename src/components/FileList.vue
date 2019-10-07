<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <dl class="text-left flex items-center border-b pb-2">
                <dt>
                    <img src="@/assets/images/logo.png" alt="">
                </dt>
                <dd class="ml-5">
                    <h2 class="text-xl text-orange-500">北京家理律师事务所</h2>
                    <h2>你好！{{msg}}</h2>
                </dd>
            </dl>
            <div class="pb-10">
                <table class="w-full mt-10">
                    <thead>
                    <tr>
                        <td class="headstyle w-1/6 text-center border text-black font-bold py-5" v-for="item of list" :key="item.index">{{item}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of minlist" :key="item.id" >
                        <td class="border text-black py-2">{{item.id}}</td>
                        <td class="border text-black">{{item.title}}</td>
                        <td class="border text-black">{{item.create_time}}</td>
                        <td class="border text-black">{{item.name}}</td>
                        <td class="border text-black">{{item.case_number}}</td>
                        <td class="border text-black flex justify-around">
                            <div class="flex justify-around py-2 w-2/3 mx-auto">
                                <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(item.id)"></el-button>
                                <el-button icon="el-icon-search" circle @click="checkMsg(item.id)"></el-button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--<el-pagination-->
                    <!--background-->
                    <!--layout="prev, pager, next"-->
                    <!--page-size="20"-->
                    <!--current-change="1"-->
                    <!--:total="1000">-->
            <!--</el-pagination>-->
            <el-table
                    v-show="isShow"
                    v-loading="true"
                    :data="tableData"
                    style="width:100%;display: flex;justify-content: center">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import HeadMenu from '@/components/HeadMenu'
  import {fileList} from '@/api/api/requestLogin.js'         // 获取案件列表
  import {selectCaseData} from '@/api/api/requestLogin.js'   // 查询案件
  export default {
    components:{
        HeadMenu,
    },
    data(){
      return {
        isShow: true,
        msg: localStorage.getItem('name'),
        list: {
            id: '案件序号',
            filename: '文件名称',
            uploadtime: '上传时间',
            uploadpeople: '上传人',
            filestatus: '案号',
            control: '操作'

        },
        minlist:[
          {
            title: '',
            create_time: '',
            id: 1,
            case_number_time: 1,
            name: '',
            case_number: ''
          }
        ],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading: true
      }
    },
    mounted () {
      this.getlist();
    },
    methods:{
      getlist () {
        fileList().then((data)=>{
          this.minlist = data.data.data
         this.isShow = false
        })
      },
      handleClick (e) {
        localStorage.setItem('id', e);
        this.$router.replace("/UpdateCase");
      },
      checkMsg (e) {
        localStorage.setItem('id', e);
        selectCaseData().then((data) =>{
            console.log(data.data)
          if(data.data.view != null || data.data.master_number != null){
            this.$router.replace("/CaseCompleted");
          }else{
            alert('尚未录入，请先录入')
          }
        })
        //
      }
    }
  }
</script>

<style scoped lang="less">
    .headstyle{
        color:#909399;
    }
    tbody tr td{
        color:#606266;
    }
    .el-loading-mask{
        .el-loading-spinner{
            display: flex !important;
            justify-content: center !important;
        }
    }

</style>
