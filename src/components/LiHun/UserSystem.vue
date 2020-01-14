<template>
  <div>
    <head-menu></head-menu>
    <div class="container mx-auto relative">
      <div class="head_left">
        <div class="shai">筛选</div>
        <el-select v-model="questionnaireTypeSelect" @change="questionnaireTypeChange" placeholder="请选择">
          <el-option
            v-for="(item, index) in questionnaireType"
            :key="index"
            :label="item.index"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="questionnaireSelect" @change="questionnaireChange" placeholder="请选择">
          <el-option
            v-for="(item, index) in questionnaireAll"
            :key="index"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="absolute right-0 top-0">
        <el-button type="primary" plain @click="addNewWenJuan">新增问卷</el-button>
      </div>
      <div class="absolute right-0 delete">
        <i class="el-icon-delete"  @click="deleteWenJuan"></i>
      </div>
      <!-- 问卷列表 -->
      <div v-show='ListShow'>
        <el-table
          :data="QuestionnaireSelectArr"
          height="500"
          style="width: 100%">
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建人: {{ scope.row.userId }}</p>
                <p>创建时间: {{ scope.row.createdTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="历史版本"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;">{{scope.row.createdTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button 
                size="mini"
                @click="ViewWenJuan(scope.$index, scope.row)">查看</el-button>
              <el-button 
                size="mini"
                @click="EditWenJuan(scope.$index, scope.row)">编辑</el-button>
              <el-button 
                size="mini"
                @click="EditWenJuan(scope.$index, scope.row)">下载</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="DeleteWenJuan(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 回收站列表 -->
      <div v-show='DeleteShow'>
        <div class="cursor-pointer text-blue-500 text-left" @click='returnListShow'>返回文书列表</div>
        <el-table
          :data="QuestionnaireSelectArr"
          height="500"
          style="width: 100%">
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建人: {{ scope.row.userId }}</p>
                <p>创建时间: {{ scope.row.createdTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="历史版本"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;">{{scope.row.createdTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button 
                size="mini"
                @click="EditWenJuan(scope.$index, scope.row)">恢复</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="DeleteWenJuan(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 查看问卷 -->
    <el-dialog title="查看问卷" :visible.sync="dialogViewWenJuan">
      <div>
        <h2>{{chooseList.title}}</h2>
        <div>{{chooseList.content}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelViewWenJuan">取 消</el-button>
        <el-button type="primary" @click="ViewWenJuanOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增问卷弹出框 -->
    <el-dialog title="新增问卷" :visible.sync="dialogNewWenJuan">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="mb-1">
          <el-select v-model="addMsg.type" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionnaireType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能用途" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.purpose" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="addMsg.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddQuestionnaire">取 消</el-button>
        <el-button type="primary" @click="addQuestionnaireOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改问卷弹出框 -->
    <el-dialog title="修改问卷" :visible.sync="dialogEditWenJuan">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="mb-1">
          <el-select v-model="addMsg.type" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionnaireType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能用途" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.purpose" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="addMsg.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditQuestionnaire">取 消</el-button>
        <el-button type="primary" @click="EditQuestionnaireOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
import {questionnaire} from '@/api/api/requestLogin.js' // 获取问卷类型
import {selectUserQuestionnaire} from '@/api/api/requestLogin.js' // 查找用户问卷
import {selectUserDeleteQuestionnaire} from '@/api/api/requestLogin.js' // 查找用户回收站
import {outPutWord} from '@/api/api/requestLogin.js' // 生成数据

import {questionnaireSelect} from '@/api/api/requestLogin.js' // 查询问卷
// import {returnQuestionnaireJson} from '@/api/api/requestLogin.js' // 查询问卷json

import {addQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {updateQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {deleteQuestionnaire} from '@/api/api/requestLogin.js' // 删除问卷

// import {answer} from '@/api/api/requestLogin.js'
export default {
  data () {
    return{
      questionnaireType: {},   // 问卷数组类型
      questionnaireTypeSelect: '', // 选择问卷数组类型
      questionnaireTypeSelectNum: null, // 选择问卷数组类型数字
      questionnaireSelect: null, // 选择问卷
      statusType: 1,  // 状态 1正常 2回收站
      questionnaireAll: [],    // 问卷类型
      QuestionnaireSelectArr: [  // 获取问卷
        {
          // "id": 3,
          // "title": "离婚协议书",
          // "type": 1,
          // "createdTime": "2019-11-22 07:17:43",
          // "updateTime": "2019-11-22 07:17:43",
          // "description": "离婚协议书自动生成",
          // "purpose": "离婚协议书自动生成",
          // "status": 1,
          // "createdUid": "郝海林",
          // "updateUid": "郝海林",
          // "wid": null
        }
      ],
      ListShow: true, // 用户列表
      DeleteShow: false, // 回收站用户列表
      chooseList: {
        title: '这是标题',
        exemption: '这是免责条款',  // 免责条款 0未填写 1填写
        qid: null,  // 问卷id
        status: null,  // 状态 1正常 2回收站 3彻底删除
        content: '这是内容', // 内容
        complete: null,    // 是否完成 0未完成 1完成
      },
      dialogViewWenJuan: false, // 查看问卷
      formLabelWidth: '80px',   // 表单标签宽度
      dialogNewWenJuan: false,  // 新增问卷弹框
      dialogEditWenJuan: false,  // 编辑问卷弹框
      addMsg: {  // 新增问卷字段
        title: '',  // 标题
        type: null,  // 问卷类型
        description: '', // 备注
        purpose: '', // 用途
        status: null  // 是否禁止访问
      }
    }
  },
  name: 'WenJuan',
  components: {
    HeadMenu,
  },
  mounted () {
    this.getQuestionnaire() // 获取问卷类型
    this.getSelectUserQuestionnaire()   // 查找用户问卷
  },
  methods: {
    getSelectUserQuestionnaire(){  // 查找用户问卷
      
    },
    getQuestionnaire(){   // 获取问卷类型
      questionnaire().then((data)=>{
        if(data.data.status_code == 200 ){
          this.questionnaireType = data.data.data.questionnaireType
          // console.log(this.questionnaireType)
        }else{
          this.$message({
            message: '问卷类型获取失败',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    questionnaireTypeChange(){
      if(this.questionnaireTypeSelect =='离婚协议书'){
        this.questionnaireTypeSelectNum = 1
      }else if(this.questionnaireTypeSelect =='起诉状'){
        this.questionnaireTypeSelectNum = 2
      }else if(this.questionnaireTypeSelect =='申请书'){
        this.questionnaireTypeSelectNum = 3
      }
      questionnaireSelect({
        type: this.questionnaireTypeSelectNum
      }).then((data)=>{
        this.questionnaireAll = data.data.data

      }).catch((data)=>{

      })
      // console.log(this.questionnaireTypeSelect)
    },
    questionnaireChange(){
      selectUserQuestionnaire({
        qid: this.questionnaireSelect,
        status: 1
      }).then((data)=>{
        if(data.data.status_code == 200 ){
          this.QuestionnaireSelectArr = data.data.data
          this.statusType = 1
          console.log(this.QuestionnaireSelectArr)
        }else{
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    ViewWenJuan(index, row){ // 点击查看问卷
      this.dialogViewWenJuan = true;
      localStorage.setItem('qid',row.id) 
      this.chooseList.title = row.title
      outPutWord().then((data)=>{
        if(data.data.status_code == 200 ){
          localStorage.removeItem('qid');
          this.chooseList.content = data.data.data
        }else{
          this.$message({
            message: '查看失败，请联系管理员',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    deleteWenJuan(){
      this.ListShow = false
      this.DeleteShow = true
      this.questionnaireTypeSelect = ''
      this.questionnaireSelect = null
      selectUserDeleteQuestionnaire({
        // qid: this.questionnaireSelect,
        status: 2
      }).then((data)=>{
        if(data.data.status_code == 200 ){
          this.QuestionnaireSelectArr = data.data.data
          this.statusType = 2
          // console.log(this.QuestionnaireSelectArr)
        }else{
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    returnListShow(){
      this.ListShow = true
      this.DeleteShow = false
    },
    cancelViewWenJuan(){  // 点击预览弹窗中的取消按钮
      this.dialogViewWenJuan = false;
    },
    ViewWenJuanOk(){  // 点击预览弹窗中的确定按钮
      this.dialogViewWenJuan = false;
    },
    addNewWenJuan(){   // 新增问卷
      this.dialogNewWenJuan = true;
      this.addMsg.title = '';
      this.addMsg.type = null;
      this.addMsg.description = '';
      this.addMsg.purpose = '';
      this.addMsg.status = null;
    },
    addQuestionnaireOk(){  // 点击新增确定按钮
      addQuestionnaire({
        title: this.addMsg.title,
        type: this.addMsg.type,
        description: this.addMsg.description,
        purpose: this.addMsg.purpose,
        status: this.addMsg.status
      }).then((data)=>{
          if(data.data.status_code == 200 ){
            this.dialogNewWenJuan = false;
            this.getQuestionnaireSelect()
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '新增失败，请联系管理员',
              type: 'error'
            });
          }
      }).catch((data)=>{

      })
    },
    cancelAddQuestionnaire(){  // 点击新增取消按钮
      this.dialogNewWenJuan = false;
    },
    EditWenJuan(index, row) {   // 点击修改问卷
      this.dialogEditWenJuan = true
      this.addMsg.title = row.title;
      this.addMsg.type = row.type;
      this.addMsg.description = row.description;
      this.addMsg.purpose = row.purpose;
      this.addMsg.status = row.status;
      localStorage.setItem('qid',row.id) 
      // this.addMsg.type = this.questionnaireType[this.addMsg.type]
      console.log(index, row);
    },
    EditQuestionnaireOk(){  // 点击修改问卷确定按钮
      updateQuestionnaire({
        title: this.addMsg.title,
        type: this.addMsg.type,
        description: this.addMsg.description,
        purpose: this.addMsg.purpose,
        status: this.addMsg.status
      }).then((data)=>{
        if(data.data.status_code == 200 ){
          localStorage.removeItem('qid');
          this.dialogNewWenJuan = false;
          this.getQuestionnaireSelect()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogEditWenJuan = false
        }else{
          this.$message({
            message: '修改失败，请联系管理员',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    cancelEditQuestionnaire(){  // 点击修改问卷取消按钮
      this.dialogEditWenJuan = false
    },
    DeleteWenJuan(index, row) {  // 删除问卷
      localStorage.setItem('qid',row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          deleteQuestionnaire().then((data)=>{
            if(data.data.status_code == 200 ){
              localStorage.removeItem('qid');
              this.getQuestionnaireSelect()
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }else{
              this.$message.error('删除失败，请联系管理员');
            }
            
          }).catch((data)=>{
            this.$message.error('删除失败，请联系管理员');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
}
</script>
<style scoped>
.head_left{width:500px;display: flex;justify-content: space-between;align-items: center;margin: 1rem 0;}
.head_left .shai{width:100px;}
.el-select {margin-right: 10px !important;}
.ban{width:220px !important;}
.delete{top:70px;z-index: 1;right: 30px;cursor: pointer;}
.el-form-item{margin-bottom:10px !important;}
</style>
