<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="text-lg relative my-2">
                <el-form>
                    <el-form-item label="">
                      <el-input v-model="titleSearchMsg" class="w-1/2" autocomplete="off" placeholder='请输入问题名称'></el-input>
                    </el-form-item>
                    <el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="titleSearch">搜索问题</el-button>
                </el-form>
            </div>
            <div class="py-1 text-lg relative my-2">问题列表<el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="handleQuestionAdd">新增问题</el-button></div>
                <div class="text-center h-500">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of list" :key="item.index">{{item}}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(item, index) in pageInfo"
                                :key="index"
                            >
                                <td class="border text-black">{{ item.id }}</td>
                                <td class="border text-black">{{ item.title }}</td>
                                <td class="border text-black">{{ problemType[item.type] }}</td>
                                <td class="border text-black">无备注</td>
                                <td class="border text-black" v-for="($item, $index) in JSON.parse(item.imgs)" :key="$index"><img :src="$item"></td>
                                <td class="border text-black" v-if="item.imgs == null ">
                                    无实例
                                </td>
                                <td class="border text-black justify-around">
                                    <div class="flex justify-around py-1 mx-auto">
                                        <el-button type="primary" icon="el-icon-edit" circle @click="updateQuestion(item)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click="deleteQuestion(item.id)"></el-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <el-pagination
                    background
                    class="my-10"
                    layout="prev, pager, next"
                    @current-change="handleQuestionList"
                    :page-size="pagesize" 
                    :current-page.sync="currentPage"
                    :total="this.min.total">
                </el-pagination>
            </div>
            <!-- 新增问题弹窗 -->
            <el-dialog title="新增问题" :visible.sync="dialogQuestionAdd">
              <el-form :model="user">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="user.type" placeholder="选择问题类型">
                      <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                  </el-form-item>
                <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                    <el-select v-model="user.re" placeholder="选择输入类型">
                      <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <div  v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 " >
                    <div  v-for="(item, index) in addQuestion_answer" :key="index" class="flex justify-between " >
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="item.label" class="w-1/2" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="deleteQuestion_answer_btn(index)">删除</el-button>
                        </div>
                    </div>
                    <div   class="flex justify-between"> 
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="addQuestion_answerName" class="w-1/2" autocomplete="off"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="addQuestion_answer_btn">添加</el-button>
                        </div>
                    </div>
                </div>
                <el-form-item label="是否禁用" :label-width="formLabelWidth">
                    <el-radio-group v-model="user.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogQuestionAdd = false">取 消</el-button>
                <el-button type="primary" @click="addNewQuestion">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 修改问题弹窗 -->
            <el-dialog title="修改问题" :visible.sync="dialogFormVisible">
              <el-form :model="user">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="user.type" placeholder="选择问题类型">
                      <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index">{{item}}</el-option>
                    </el-select>
                  </el-form-item>
                <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                    <el-select v-model="user.re" placeholder="选择输入类型">
                      <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index">{{item}}</el-option>
                    </el-select>
                </el-form-item>
                <div v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 ">
                    <div  v-for="(item, index) in add_answer" :key="index"  class="flex justify-between" >
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="item.label" class="w-1/2" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <div>
                            <!-- <el-button @click="add_answer_btn">添加</el-button> -->
                            <el-button @click="delete_answer_btn(item,index)">删除</el-button>
                        </div>
                    </div>
                    <div   class="flex justify-between"> 
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="answerName" class="w-1/2" autocomplete="off"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="add_answer_btn">添加</el-button>
                        </div>
                    </div>
                </div>
                
                <el-form-item label="是否禁用" :label-width="formLabelWidth">
                    <el-radio-group v-model="user.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updataQuestionMsg">确 定</el-button>
              </div>
            </el-dialog>

        </div>
        
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addQuestion} from '@/api/api/requestLogin.js'   // 新增问题
    import {addAnswer} from '@/api/api/requestLogin.js'    // 添加选项
    import {deleteAnswer} from '@/api/api/requestLogin.js'    // 删除选项
    import {selectQuestion} from '@/api/api/requestLogin.js'  // 获取用户列表
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {updateQuestion} from '@/api/api/requestLogin.js'   // 修改问题
    import {deleteQuestion} from '@/api/api/requestLogin.js'   // 删除问题
    import {selectOnlyQuestion} from '@/api/api/requestLogin.js'   // 查询单独问题
    import {QuestionArr} from '@/api/api/requestLogin.js'    // 问题数组

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                pageInfo:[
                 {
                    id: '',
                    title: '',
                    type: '',
                    other: '',
                    imgs: []   
                 }
                ],
                titleSearchMsg: '',
                list: {
                    id: '问题ID',
                    title: '问题名称',
                    type: '问题类型',
                    other: '问题备注',
                    imgs: '问题实例',
                    control: '操作'
                },
                user:{
                    title: '',
                    type: '',
                    re: '',
                    status: '',    // 是否禁用
                    imgs: []       // 添加实例
                },
                add_answer: [],   // 修改页面添加选项
                answerName: '',   // 修改页面点击添加选项绑定的值
                addQuestion_answer: [], // 新增页面选项列表
                addQuestion_answerName: '',   // 新增页面点击添加选项绑定的值
                // fileList: [],   // 实例图片
                problemType: {},
                problemRe: {},
                UserRole: [],
                chooseUserRole: [],
                min: '',
                dialogFormVisible: false,
                dialogQuestionAdd: false,
                formLabelWidth: '80px',
                 // 分页
                first_page_url: '',
                last_page_url: '',
                next_page_url: '',
                path: '',
                from: 1,
                per_page: null,
                last_page: null,
                userList: [],
                currentPage:1, //初始页
                pagesize:20,    //    每页的数据
                area: '', // 擅长领域
                pageNum: 1, // 第几页
            }
        },
        mounted () {
          this.handleQuestionList()   //获取问题列表
          this.QuestionArrOk() // 获取问题数组
        },
        methods:{
            handleQuestionList () { // 获取问题
                selectQuestion({page:this.currentPage}).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                    // this.fileList = this.pageInfo.imgs
                }).catch((data)=>{
                    this.$router.replace("/");
                })
            },
            encodeSearchParams(obj) {   // 通过条件查找问题
                const params = [];
                Object.keys(obj).forEach((key) => {
                  let value = obj[key];
                  // 如果值为undefined置空
                  if (typeof value === 'undefined') {
                    value = '';
                  }else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {//类型为对象的时候
                    Object.keys(obj[key]).forEach(item => {
                      params.push([item, encodeURIComponent(obj[key][item])].join('='));
                    })
                  }else if(Array.isArray(obj[key])){
                    params.push(key+'='+ '['+obj[key]+']');
                  }else {
                    params.push([key, encodeURIComponent(value)].join('='));
                  }
                });
                return params.join('&');
              },
              titleSearch () {  // 点击查找开始查找问题
                selectQuestionList("title="+this.titleSearchMsg).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                    this.total = data.data.total
                }).catch((data)=>{
                    console.log(data)
                })
              },
            QuestionArrOk () {  
                QuestionArr().then((data)=>{
                    this.problemType = data.data.data.problemType
                    this.problemRe = data.data.data.problemRe
                })
            },
            add_answer_btn () {  // 修改页面点击添加选项
                addAnswer({
                    status: 1,
                    label: this.answerName
                }).then((data)=>{
                    this.selectOnlyQuestionList()
                    this.$message({
                        type: 'success',
                        message: '成功添加选项!'
                      });
                    this.answerName = ''
                })
            },
            delete_answer_btn (item,index) { // 修改页面点击删除选项
                localStorage.setItem('paid',item.id)
                deleteAnswer().then((data)=>{
                    this.$message({
                        type: 'success',
                        message: '删除选项成功!'
                      });
                    this.selectOnlyQuestionList()
                }).catch((data)=>{

                })
            },
            addQuestion_answer_btn () {  // 新增问题页面点击添加选项
                this.addQuestion_answer.push({
                    status: 1,
                    label:this.addQuestion_answerName
                })
                this.addQuestion_answerName = ''
            },
            deleteQuestion_answer_btn (index) { // 新增问题页面点击删除选项
                this.addQuestion_answer.splice(index,1)
            },
            handleSizeChange (size) {   // 点击分页
                this.pagesize = size;
            },
            handleCurrentChange (currentPage) {    //点击哪一页
                this.currentPage = currentPage;
            },
            
            handleQuestionAdd () {    // 点击新增问题
                localStorage.removeItem('pid');
                this.user.title = '';
                this.user.type = '';
                this.user.status = '';
                this.dialogQuestionAdd = true
            },
            addNewQuestion () {   // 新增问题
                addQuestion({
                    title: this.user.title,
                    type: this.user.type,
                    re: this.user.re,
                    status: this.user.status
                }).then((data)=>{
                    this.user.title = '';
                    this.user.type = '';
                    this.user.re = '';
                    this.user.status = '';
                    this.handleQuestionList()
                    localStorage.setItem('pid',data.data.data)
                    this.addQuestion_answer.forEach((item)=>{
                        addAnswer({
                            status: 1,
                            label: item.label
                        }).then((data)=>{
                            
                        })
                    })
                    this.$message({
                        type: 'success',
                        message: '成功添加问题!'
                    });
                    localStorage.removeItem('pid');
                    this.dialogQuestionAdd = false
                }).catch((data)=>{

                })
            },

            updateQuestion (item) {    // 点击修改问题
                localStorage.setItem('pid',item.id)
                this.user.title = item.title;
                this.user.type = item.type;
                this.user.re = item.re;
                this.user.status = item.status;
                this.dialogFormVisible = true
                if(this.user.type==6 || this.user.type==7 || this.user.type==8 || this.user.type==9 ){
                    this.selectOnlyQuestionList()
                }
            },
            selectOnlyQuestionList () {  // 修改页面查询当前问题下的选项列表
                selectOnlyQuestion().then((data)=>{
                     this.add_answer = data.data.child       
                }).catch((data)=>{
                })
            },
            handleCheckedCitiesChange (value) {
                this.chooseUserRole = value
            },
            updataQuestionMsg () {   // 确定修改用户信息
                if(this.user.type==1){
                    updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        re: this.user.re,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.re = '';
                        this.user.status = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })
                } if(this.user.type==6 || this.user.type==7 || this.user.type==8 || this.user.type==9 ){
                    updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.status = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })  
                }else{
                   updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.status = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    }) 
                }
                
            },
            deleteQuestion (e) {   // 删除用户
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deleteQuestion(e).then((data)=>{
                        this.handleQuestionList()
                    })
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
                
            },
            handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            handlePreview(file) {
               console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style scoped>
/*.searchBox{ margin-right: 150px;}*/
.h-500{height: 500px;overflow: scroll;}
.el-form-item{margin-bottom:0.25rem;}
</style>
