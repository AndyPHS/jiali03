<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="pb-10">
                <table class="w-full mt-2">
                    <thead>
                    <tr>
                        <td class="headstyle w-1/7 text-center border text-black font-bold py-3" v-for="item of list" :key="item.index">{{item}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of minlist" :key="item.id">
                        <td class="border text-black py-2">{{item.id}}</td>
                        <td class="border text-black">{{item.title}}</td>
                        <td class="border text-black">{{item.create_time}}</td>
                        <td class="border text-black">{{item.name}}</td>
                        <td class="border text-black">{{item.master_number}}</td>
                        <td class="border text-black" v-if="item.bool == '1'">已完成</td>
                        <td class="border text-black" v-else>未完成</td>
                        <td class="border text-black flex justify-around">
                            <div class="flex justify-around py-2 w-2/3 mx-auto">
                                <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(item.id)"></el-button>
                                <el-button icon="el-icon-search" circle @click="checkMsg(item.id)"></el-button>
                                <el-button @click="deleteOne(item.id)" v-if="rolesSelect == 'AdminOne'" type="danger" icon="el-icon-delete" circle></el-button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <el-pagination
                    background
                    class="mb-10"
                    layout="prev, pager, next"
                    @current-change="handleUserList"
                    :page-size="pagesize"
                    :current-page.sync="currentPage"
                    :total="this.min.total">
            </el-pagination>
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
// import Cookies from 'js-cookie'
import HeadMenu from '@/components/HeadMenu'
import {fileList, deleteCase} from '@/api/api/requestLogin.js' // 获取案件列表
import {selectCaseData} from '@/api/api/requestLogin.js' // 查询案件
import {usersSelect} from '@/api/api/requestLogin.js' // 查询角色

export default {
  components: {
    HeadMenu
  },
  data () {
    return {
      isShow: true,
      msg: localStorage.getItem('name'),
      min: {},
      list: {
        id: '案件序号',
        filename: '文件名称',
        uploadtime: '上传时间',
        uploadpeople: '上传人',
        filestatus: '律所案号',
        bool: '完成状态',
        control: '操作'

      },
      minlist: [
        {
          title: '',
          create_time: '',
          id: 1,
          case_number_time: 1,
          name: '',
          bool: '',
          master_number: ''
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
      loading: true,
      bool: '',
      // 分页
      first_page_url: '',
      last_page_url: '',
      next_page_url: '',
      path: '',
      from: 1,
      per_page: null,
      last_page: null,
      userList: [],
      currentPage: 1, // 初始页
      pagesize: 20, //    每页的数据
      total: 0, // 总页数
      isloading: false,

      // 权限
      roles: [],
      permissions: [],
      rolesSelect: null
    }
  },
  mounted () {
    this.handleUserList();
    this.getUserSelect() // 查找用户基本信息
  },
  methods: {
    getUserSelect () { // 获取前用户拥有的权限
      var that = this;
      usersSelect().then((data) => {
        this.permissions = data.data.permissions
        this.roles = data.data.roles
        var ro = data.data.roles;
        for(var i=0; i<ro.length; i++){
          if(ro[i].name == 'AdminOne'){
            that.rolesSelect = 'AdminOne';
          }
        }
      }).catch((data) => {

      })
    },
    handleUserList () {
      fileList({page: this.currentPage}).then((data) => {
        this.minlist = data.data.data
        this.min = data.data
        this.userList = data.data
        this.isShow = false
        let bool1 = this.minlist
        for (var i = 0; i < bool1.length; i++) {
          if (bool1[i].bool == '1') {
            this.bool = '已完成'
          } else if (bool1[i].bool == null) {
            this.bool = '未完成'
          } else {
            this.bool = '未完成'
          }
        }
      }).catch((data) => {
        if (data.data.status_code == 401) {
          this.$router.replace('/')
        }
      })
    },
    handleClick (e) {
      localStorage.setItem('id', e)
      this.$router.replace('/ArrangementCase')
    },
    checkMsg (e) {
      localStorage.setItem('id', e)
      selectCaseData().then((data) => {
        console.log(data.data)
        if (data.data.view != null || data.data.master_number != null) {
          this.$router.replace('/CaseCompleted')
        } else {
          alert('尚未录入，请先录入')
        }
      })
      //
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    // 上一页
    nextClick () {
      console.log('下一页')
    },
    prevClick () {
      console.log('上一页')
    },
    // pagesize (size) {
    //   this.pagesize = size
    // },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage// 点击第几页
    },
    deleteOne (e) { // 删除
      this.$confirm('是否删除该案件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        deleteCase(e).then((data) =>{
          if(data.data.status_code == 200){
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
            this.handleUserList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
