<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto flex">
            <div class="w-1/2 mr-2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2">离婚协议书组合规则</h2>
                    <div>
                        这个区域是组合列表区
                    </div>
                    <div class="w-2/3 text-left flex justify-around">
                        <el-button type="primary" plain class="" @click="addNewWord">新增组合</el-button> 
                        <!-- <el-button type="primary" plain class="" @click="updateWord">修改组合</el-button>
                        <el-button type="primary" plain class="" @click="editDisplayContent">编辑显示内容</el-button> -->
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2">离婚协议书</h2>
                    <div class="h-40 overflow-scroll">
                        <el-tree
                          :data="treeList"
                          default-expand-all
                          node-key="id"
                          ref="tree"
                          empty-text="加载中，请稍后！"
                          highlight-current
                          @node-click="handleTreeJieDian()"
                          :props="defaultProps">
                        </el-tree>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增组合弹出框 -->
        <el-dialog title="新增组合" :visible.sync="dialogNewWord">
          <el-form :model="wordAdd">
             <el-form-item label="组合名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div><span class="h-1"></span></div>
            <el-form-item label="问题" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.qpid" @change="selectOnlyQuestion" filterable :filter-method="dataFilter" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条件" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.type" placeholder="请选择">
                    <el-option
                      v-for="item in TiaoJianList"
                      :key="item.value"
                      :label="item.title"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="绑定的值" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.value" placeholder="选择绑定的值">
                  <el-option v-for="(item, index) in selectOnlyLisg" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="替换" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAddWhere.replate" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            
            <div class="my-2">
                <el-button @click="addWhere">确定</el-button>
                <!-- <el-button @click="deleteWhere(whereIndex)">删除关系</el-button> -->
            </div>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogNewWord = false">取 消</el-button>
            <el-button type="primary" @click="addWordOk">确 定</el-button>
          </div>
        </el-dialog>
    </div>   
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addWord} from '@/api/api/requestLogin.js'   // 新增组合规则
    import {selectTree} from '@/api/api/requestLogin.js'    // 查询关系
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {selectOnlyQuestion} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
               treeList: [],    // 节点树数据 
               defaultProps: {  // 树相关
                  children: 'child',
                  label: 'title'
                },
                treeMsg: {  // 选中的树节点相关内容
                    fqaspId: null,   // 点击获取当前选中的树节点id
                    nodeType: null,  // 点击获取当前选中的树节点type类型
                    nodeChild: [],   // 点击获取当前选中的树节点child
                    title: ''        // 点击获取当前选中的树节点title名称
                },
                dialogNewWord: false, // 新增组合弹出框
                wordAdd:{       // 新增组合绑定数据
                    title: '',  // 组合名称
                    fWordId: null, // 组合的父id
                    where: []     // 条件
                },
                wordAddWhere:{  // 单独绑定的组合规则
                    qpid: null,
                    type: null,
                    value: null,
                    replate: ''
                },
                formLabelWidth: '80px',   // 表单标签宽度
                dataFilterValueArr: [], // 搜索查找的结果数据
                TiaoJianList:[   // 条件列表
                    {
                       title: '大于',
                       value: '3'             
                    },
                    {
                       title: '等于',
                       value: '1'             
                    },
                    {
                       title: '小于',
                       value: '2'             
                    },
                    {
                       title: '小于等于',
                       value: '4'             
                    },
                    {
                       title: '大于等于',
                       value: '5'             
                    },
                    {
                       title: '不等于',
                       value: '6'             
                    }
                ],
                selectOnlyLisg: []    // 查询单独问题
            }
        },
        mounted () {
          this.selectTree() // 获取关系列表
          // this.selectOnlyQuestion() // 查询单独问题
        },
        methods:{
            // 右侧模块开始
            selectTree () {   // 查询树结构
                selectTree().then((data)=>{
                    this.treeList = data.data.data
                }).catch((data)=>{
                    console.log("请求失败")
                })
            },
            // 操作树结构
            handleTreeJieDian () {
                this.treeMsg.fqaspId = this.$refs.tree.currentNode.node.data.id
                this.treeMsg.nodeType = this.$refs.tree.currentNode.node.data.type
                this.treeMsg.nodeChild = this.$refs.tree.currentNode.node.data.child
                this.treeMsg.title = this.$refs.tree.currentNode.node.data.title
                // console.log(this.treeMsg)
            },
            // 右侧模块结束

            // 左侧模块开始
            addNewWord () { // 点击新增组合弹出新增组合对话框
                this.dialogNewWord = true;
            },
            addWhere(){  // 点击确定将当填写的条件添加到当前组合规则where中并且清空绑定框
                this.wordAdd.where.push(this.wordAddWhere)
                this.wordAddWhere = {}
                console.log(this.wordAddWhere)

            },
            addWordOk () {   // 点击新增组合确定按钮提交表单
                // this.wordAdd.where = JSON.parse(this.wordAdd.where)
                addWord({
                    title:this.wordAdd.title,
                    fWordId :0,
                    where: this.wordAdd.where
                }).then((data)=>{
                    this.dialogNewWord = false;
                    console.log("成功")
                })
                
            },
            dataFilter (val) { // 筛选问题
                selectQuestionList("title="+val).then((data)=>{
                    this.dataFilterValueArr = data.data.data.data
                }).catch((data)=>{

                })
            },
            selectOnlyQuestion () {  // 查询问题新绑定的值
                localStorage.setItem('pid',this.wordAddWhere.qpid)
                selectOnlyQuestion().then((data)=>{
                    this.selectOnlyLisg = data.data.child
                    // this.problemqAdd.type = data.data[0].type
                    // this.problemqAdd.title = data.data[0].title
                    // console.log(this.problemqAdd.type)
                }).catch((data)=>{

                })

            },
            // 左侧模块结束
        }
    }
</script>

<style scoped>
.h-40{height: 1000px;}
.h-1{height: 1px;width: 100%;background: #343434;display: inline-block;}
.el-form-item{margin-bottom:0.25rem;}
.wenti{height: 40px;}
</style>
