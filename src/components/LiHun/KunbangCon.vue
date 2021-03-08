<template>
  <div>
    <head-menu></head-menu>
    <div class="flex justify-end">
      <el-button class="mx-5 my-5">
        <router-link to="KunbangList">返回</router-link>
      </el-button>
    </div>
    <div class="w-5/6 mx-auto mb-5 flex con ">
      <div class="w-1/2 common">
        <div class="w-full text-right">
          <el-button  @click="addAc" class="">新建</el-button>
        </div>
        <div class="flex items-center my-3">
          <div class="w-1/2">名称</div>
          <div class="w-1/2">绑定内容</div>
        </div>
        <div class="body">
          <div v-for="(item, index) in leftFenzuGroup" :key="index" class="body_list my-2">
            <h2 :class="fenzuId==item.id?'activetitle':'default'" class="flex items-center py-2 border-b  pl-2">
              <span @click="choosefenzu(item)" :class="fenzuId==item.id?'activeselect':'default_select'" class="select_icon"></span>
              <div @click="choosefenzu(item)" class="w-3/4 text-left">{{item.title}}</div>
              <div class="w-1/4 flex items-center justify-around">
                <!-- 编辑 -->
                <i class="el-icon-edit" @click="editAc(item)"></i>
                <!-- 删除分组 -->
                <i class="el-icon-delete" @click="deleteAc(item)"></i>
              </div>
            </h2>
            <div v-if="item.child" class="ml-12 my-2" >
              <div v-for="($item,$index) in item.child" :key="$index" class="body_con_list flex items-center mt-2">
                <div class="w-3/4 text-left text-sm">{{$item.groupTitle}}/{{$item.taskTitle}}</div>
                <div class=" w-1/4 text-right mr-4">
                  <!-- 删除问题 -->
                  <i @click="deleteGuanlianAc($item)" class="el-icon-delete" size="small"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 common">
        <div class="flex">
          <el-select
            class="w-1/2 mr-2"
            v-model="rightFenzuGroupId"
            filterable
            @change="getrightFenzuGroupId"
            placeholder="请选择分组">
            <el-option
              v-for="item in rightFenzuGroup"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select
            class="w-1/2"
            v-model="rightTaskId"
            filterable
            @change="getrightTaskId"
            placeholder="请选择任务">
            <el-option
              v-for="item in rightTaskAll"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="tree my-2 px-2">
          <el-tree
            :data="rightQuestionAll"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            @check-change="handleCheckChange">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => kunbangAc(node, data)">
                  捆绑
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
        <div v-if="morebang" class="w-full mx-auto my-3">
          <el-button type="primary" @click="piliangAc" plain>批量绑定</el-button>
        </div>
      </div>
    </div>
    <!-- 新建弹窗 -->
    <el-dialog :title="newAddflag?'新增问卷类型分组':'修改问卷类型分组'" :visible.sync="dialogNewWenJuan" width="640px">
      <el-form :model="addMsg">
         <el-form-item label="问卷类型分组名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-4/5" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型分组描述" :label-width="formLabelWidth" class="mb-1">
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
  import {addQTypeGroup, selectQTypeGroup, updateQTypeGroup, deleteQTypeGroup} from '@/api/api/requestLogin.js'
  import {getQtypeQuestionaire} from '@/api/api/requestLogin.js' // 查询分类下关联
  import {addQTypeGroupQp} from '@/api/api/requestLogin.js' // 新增问卷类型分组关联
  import {deleteQTypeGroupQp} from '@/api/api/requestLogin.js' // 删除问卷类型分组关联
  export default {
    name: 'kunbangCon',
    components: {
      HeadMenu
    },
    data () {
      return {
        fenzuId: null,
        dialogNewWenJuan: false,
        newAddflag: true,  // true新建 false 修改
        addMsg:{
          title: '',
          description: '',
          q_type: localStorage.getItem('qType')
        },
        formLabelWidth: '150px', // 表单标签宽度
        leftFenzuGroup: [],  // 左侧分组列表

        rightFenzuGroup: [], // 右侧分组列表
        rightFenzuGroupId: null, // 选中的右侧分组列表中的分组ID
        rightFenzuGroupTitle: '', // 选中的右侧分组列表中的分组title
        rightTaskAll: [], // 右侧任务列表
        rightTaskId: null,
        rightTaskTitle: '',
        rightQuestionAll: [], // 右侧问题汇总
        defaultProps: {
          children: 'child',
          label: 'title',
          id: 'id'
        },
        morebang: false
      }
    },
    mounted () {
      this.getselectQTypeGroup(); // 获取左侧分组列表
      this.getQtypeQuestionaireAc() // 获取右侧分类下关联
    },
    methods: {
      getQtypeQuestionaireAc () {// 获取右侧分类下关联
        var that = this;
        getQtypeQuestionaire().then((data) => {
          if (data.data.status_code === 200 ) {
            that.rightFenzuGroup = data.data.data
          } else {
            this.$message({
              showClose: true,
              message: '查询分类下关联失败，请联系后台人员',
              type: 'error'
            });
          }
        })
      },
      getrightFenzuGroupId () { // 通过选择分组获取分组里边的任务复制给第二个选择框
        var that = this;
        var GroupId = that.rightFenzuGroupId
        var rightFenzuGroup = that.rightFenzuGroup
        for (var i=0; i<rightFenzuGroup.length; i++) {
          if (rightFenzuGroup[i].id === GroupId) {
            that.rightTaskAll = rightFenzuGroup[i].child.data;
            that.rightFenzuGroupTitle = rightFenzuGroup[i].title;
          }
        }
      },
      getrightTaskId () { // 通过选择的任务id获取到下边任务的所有问题
        var that = this;
        var GroupId = that.rightFenzuGroupId
        var rightTaskId = that.rightTaskId;
        var rightFenzuGroup = that.rightFenzuGroup
        for (var i=0; i<rightFenzuGroup.length; i++) {
          if(rightFenzuGroup[i].id === GroupId){
            that.rightTaskAll = rightFenzuGroup[i].child.data
            for(var j=0; j<that.rightTaskAll.length; j++) {
              if(that.rightTaskAll[j].id === rightTaskId) {
                that.rightQuestionAll = that.rightTaskAll[j].child;
                that.rightTaskTitle = that.rightTaskAll[j].title
              }
            }
          }
        }
      },
      choosefenzu (item) { // 选择当前的分组
        this.fenzuId = null
        this.fenzuId = item.id;
        localStorage.setItem('qTGroup', item.id)
      },
      getselectQTypeGroup () { // 查询分组
        var that = this;
        selectQTypeGroup().then((data) =>{
          if(data.data.status_code === 200 ){
            that.leftFenzuGroup =  data.data.data
          } else {
            this.$message({
              showClose: true,
              message: '问卷分组获取失败，请联系后台人员',
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
      },
      addQuestionnaireOk () {  // 确认新建
        var title = this.addMsg.title
        var form = {}
        form.title = title;
        form.q_type = this.addMsg.q_type;
        if(this.addMsg.description != ''){
          form.description = this.addMsg.description
        }
        if(title!=''){
          addQTypeGroup(form).then((data)=>{
            if(data.data.status_code === 200 ){
              this.$message({
                showClose: true,
                message: '新增成功',
                type: 'success'
              });
              this.getselectQTypeGroup()
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
      editAc (item) { // 修改
        localStorage.setItem('qTGroup', item.id)
        this.newAddflag = false;
        this.addMsg.title = item.title;
        this.addMsg.description = item.description;
        this.dialogNewWenJuan = true;
      },
      upDateQuestionnaireOk () { // 确定修改
        var title = this.addMsg.title
        var form = {}
        form.title = title;
        form.q_type = this.addMsg.q_type;
        if(this.addMsg.description != ''){
          form.description = this.addMsg.description
        }
        updateQTypeGroup(form).then((data) =>{
          if(data.data.status_code === 200 ){
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.getselectQTypeGroup()
            this.cancelAddQuestionnaire()
          }
        }).catch((data) => {

        })
      },
      deleteAc (item) { // 删除
        localStorage.setItem('qTGroup', item.id)
        this.$confirm('删除问卷类型分组?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then( ()=> {
          deleteQTypeGroup().then((data) => {
            if(data.data.status_code === 200 ){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.getselectQTypeGroup()
            }
          })
        }).catch( () => {

        })
      },
      deleteGuanlianAc (rows) { // 删除
        this.$confirm('删除问卷类型分组关联?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then( ()=> {
          var form = {}
          form.q_type = rows.q_type;
          form.q_type_group = rows.q_type_group;
          form.qpid = rows.qpid;
          deleteQTypeGroupQp(form).then((data) => {
            if(data.data.status_code === 200 ){
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.getselectQTypeGroup()
            }
          })
        }).catch( () => {

        })
      },
      kunbangAc (node, data) { // 捆绑
        var that = this;
        var form = {};
        form.q_type = localStorage.getItem('qType');
        form.q_type_group = that.fenzuId;
        form.qpid = data.id;
        form.groupTitle = that.rightFenzuGroupTitle;
        form.taskTitle = that.rightTaskTitle;
        if(that.fenzuId !=null){
          addQTypeGroupQp(form).then((data) => {
            if(data.data.status_code ==200){
              this.getselectQTypeGroup()
            }
          }).catch((data) => {
            this.$message({
              showClose: true,
              message: '绑定失败，请联系后台人员',
              type: 'error'
            });
          })
        } else {
          this.$message({
            showClose: true,
            message: '请先选择左侧要绑定的分组',
            type: 'error'
          });
        }

      },
      handleCheckChange(data, checked, indeterminate) {
        var that = this
        // console.log(data, checked, indeterminate);
        // console.log(this.$refs.tree.getCheckedKeys());
        // console.log(checked)
        that.morebang = false
        var moreselect = this.$refs.tree.getCheckedKeys()
        if(moreselect.length>1){
          that.morebang = true
        }
      },
      handleNodeClick(data) {
        // console.log(data);
      },
      piliangAc () { // 批量绑定按钮
        var that = this;
        var selectall = this.$refs.tree.getCheckedKeys()
        for(var i=0;i<selectall.length;i++){
          if(that.fenzuId !=null){
            addQTypeGroupQp({
              q_type: localStorage.getItem('qType'),
              q_type_group: that.fenzuId,
              qpid: selectall[i],
              groupTitle: that.rightFenzuGroupTitle,
              taskTitle: that.rightTaskTitle
            }).then((data) => {
              if(data.data.status_code ==200){
                this.getselectQTypeGroup()
              }
            }).catch((data) => {
              this.$message({
                showClose: true,
                message: '绑定失败，请联系后台人员',
                type: 'error'
              });
            })
          } else {
            this.$message({
              showClose: true,
              message: '请先选择绑定分组',
              type: 'error'
            });
          }
        }
      }
    }
  }
</script>

<style scoped>
  .activetitle{
    background-color: #abd7ee;
  }
  .default{
    background-color: #fff;
  }
  .activeselect{
    background-color: #0055AA;
    border: 1px solid #0055AA;
  }
  .default_select{
    background-color: #fff;
    border: 1px solid #343434;
  }
  .con .common{
    border:1px solid #343434;
    height: 500px;
    border-radius: 5px;
    padding: 15px;
    overflow: scroll;
  }
  .con .common:first-of-type{
    margin-right: 10px;
  }
  .select_icon{
    width: 16px;
    height: 16px;
    border: 1px solid #343434;
    border-radius: 8px;
    margin-right: 15px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
