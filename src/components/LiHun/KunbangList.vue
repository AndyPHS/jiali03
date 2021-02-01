<template>
  <div>
    <head-menu></head-menu>
    <div class="w-5/6 mx-auto my-5 flex justify-end">
      <el-button class="" @click="addAc">新建</el-button>
    </div>
    <div class="mx-auto" style="width: 1000px;">
      <el-table
        :data="tableData"
        style="width: 1000px">
        <el-table-column
          label="名称"
          width="400px">
          <template slot-scope="scope">
            <div @click="gokunbangcon(scope.row)" class="cursor-pointer">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="newtype"
          label="类型"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="200px">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button  @click="editAc(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteAc(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建弹窗 -->
    <el-dialog :title="newAddflag?'新增问卷类型':'修改问卷类型'" :visible.sync="dialogNewWenJuan" width="640px">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-4/5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="my-3">
          <el-select v-model="addMsg.type" placeholder="请选择" class="w-4/5">
              <el-option
                v-for="item in typeAll"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="问卷描述" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-4/5" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddQuestionnaire">取 消</el-button>
        <el-button v-if="newAddflag" type="primary" @click="addQuestionnaireOk">确 定</el-button>
        <el-button v-if="!newAddflag" type="primary" @click="upDateQuestionnaireOk">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu' // 添加公共头部
  import {addQType, selectQType, updateQType, deleteQType} from '@/api/api/requestLogin.js' // 问卷类型
  export default {
    name: 'kunbanglist',
    data () {
      return {
        dialogNewWenJuan: false,
        newAddflag: true,  // true新建 false 修改
        addMsg:{
          title: '',
          description: '',
          type: 2
        },
        typeAll: [
          {label: '蜗牛家事', value: 1},
          {label: 'sop', value: 2}
        ],
        formLabelWidth: '150px', // 表单标签宽度
        tableData: []
      }
    },
    components: {
      HeadMenu
    },
    mounted () {
      this.selectQTypeall()
    },
    methods: {
      selectQTypeall () { // 查询问卷类型
        var that = this;
        selectQType().then((data) => {
          if (data.data.status_code === 200 ) {
            var tableData = data.data.data
            for(var i=0; i<tableData.length; i++) {
              if(tableData[i].type == 1) {
                tableData[i].newtype = '蜗牛家事';
              } else if(tableData[i].type === 2) {
                tableData[i].newtype = 'sop';
              }
            }
            that.tableData = tableData;
          } else {
            this.$message({
              showClose: true,
              message: '问卷获取失败，请联系后台人员',
              type: 'error'
            });
          }
        })
      },
      addAc () { // 点击新建
        this.newAddflag = true;
        this.dialogNewWenJuan = true;
      },
      cancelAddQuestionnaire () { // 取消新建
        this.dialogNewWenJuan = false;
        this.addMsg.title = "";
        this.addMsg.description = "";
        this.addMsg.type = 2;
      },
      addQuestionnaireOk () {  // 确认新建
        var title = this.addMsg.title
        var form = {}
        form.title = title;
        form.type = this.addMsg.type;
        if(this.addMsg.description != ''){
          form.description = this.addMsg.description
        }
        if(title!=''){
          addQType(form).then((data)=>{
            if(data.data.status_code === 200 ){
              this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
              });
              this.selectQTypeall()
              this.cancelAddQuestionnaire()
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '名称必填',
            type: 'error'
          });
        }
      },
      editAc (rows) { // 修改
        this.newAddflag = false;
        localStorage.setItem('qType',rows.id)
        this.addMsg.title = rows.title;
        this.addMsg.description = rows.description;
        this.addMsg.type = rows.type;
        this.dialogNewWenJuan = true;
        console.log(rows)
      },
      upDateQuestionnaireOk () { // 确定修改
        var title = this.addMsg.title
        var form = {}
        form.title = title;
        form.type = this.addMsg.type;
        if(this.addMsg.description != ''){
          form.description = this.addMsg.description
        }
        updateQType(form).then((data) =>{
          if(data.data.status_code === 200 ){
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.selectQTypeall()
            this.cancelAddQuestionnaire()
          }
        })
      },
      deleteAc (rows) { // 删除
        localStorage.setItem('qType',rows.id)
        this.$confirm('删除该问卷?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then( ()=> {
          deleteQType().then((data) => {
            if(data.data.status_code === 200 ){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.selectQTypeall()
            }
          })
        }).catch( () => {

        })
      },
      gokunbangcon (rows) {
        localStorage.setItem('qType',rows.id);
        this.$router.push('/KunbangCon');
      }
    }
  }
</script>

<style scoped>
</style>
