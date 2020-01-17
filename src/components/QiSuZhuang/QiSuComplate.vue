<template>
    <div>
        <head-menu></head-menu>
        <div class="w-full px-10 mx-auto">
            <h2 class="py-2 text-lg text-center w-2/5">
              {{this.Content.title}} 
            </h2>
            <p class="pb-1 text-base text-center w-2/5">民事起诉状</p>
            

            <div class="flex">
                <div class="w-2/5 mx-1">
                    <p class="text-left w-2/5 pb-1">事实与理由：</p>
                    <div class="my-2 h-40">
                        <ul>
                            <li class="pb-2 text-left" v-for="(item, index) in this.Content.UqContent" :key="index">
                                <div v-if="item.status == 1" class="px-2 py-1 border rounded">
                                    <p>{{ item.content }}</p>
                                </div>
                                <div class="mt-1">
                                    <span v-if="item.status == 1" class="addIcon" @click="addContentBox(item)">+</span>
                                </div>

                            </li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <el-button type="primary">生成起诉状</el-button>
                    </div>
                </div>
                <div class="w-1/5 mx-4">
                    <h2 class="py-2 text-lg text-center w-full">离婚原因标签</h2>
                    <div class="flex align-items-center justify-around">
                        <el-form ref="labelForm" :model="labelForm">
                            <el-form-item >
                                <el-input v-model="labelForm.title"></el-input>
                            </el-form-item>
                        </el-form>
                        <i class="el-icon-search mt-2 cursor-pointer" @click="searchLableAction"></i>
                    </div>
                    <div class="h-40">
                        <ul>
                            <li 
                            v-for="(item, index) in this.LabelArr" 
                            :key="index" 
                            @click="chooseLabelAction(item)"
                            class="w-3/4 mx-auto bg-blue-200 rounded py-1 my-2 hover:bg-blue-400" 
                            >
                                {{item.title}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-2/5">
                    <h2 class="py-2 text-lg text-center w-full">关键词搜索</h2>
                    <div class="h-40">
                        <ul>
                            <li 
                            v-for="(item, index) in this.LabelContent" 
                            :key="index"
                            class="w-11/12 mx-auto mb-1" 
                            >
                                <div class="text-left w-full">
                                   <span class="font-bold inline-block ml-1">【 {{item.qlTitle}} 】</span> 
                                </div>
                                <div class="text-left px-1 py-1 bg-blue-200 border rounded-sm">{{item.content}}</div>
                                <div class="text-right w-full">
                                    <span class="inline-block mt-2 px-2 text-white cursor-pointer rounded bg-blue-400" @click="chooseLabelContent(item)">适用</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {selectUqContent} from '@/api/api/requestLogin.js'  // 获取文本内容
    import {selectLabel} from '@/api/api/requestLogin.js'  // 获取标签
    import {selectLabelChoose} from '@/api/api/requestLogin.js'  // 通过关键词或搜索条件搜索标签
    import {selectLabelContent} from '@/api/api/requestLogin.js'  // 查询标签内容
    
    
    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                Content:{ 
                    UqContent: [], // 获取的文本内容
                    title: ''    // 获取标题
                },
                contentMsg:{  // 添加新文本
                    status: 1,
                    content: ''
                },
                contentDiv: false,  // 新增文本隐藏
                LabelArr: [], // 获取标签
                labelForm:{   // 标签表单
                    title: '',
                },
                LabelContent: [], // 获取标签内容
            }
        },
        mounted () {
            this.getSelectUqContent() // 获取离婚起诉状文本内容
            this.getSelectLabel() // 获取标签
        },
        methods:{
            getSelectUqContent(){  //获取文本内容
                selectUqContent().then((data)=>{
                    if(data.data.status_code == 200){
                       this.Content.UqContent = data.data.data.content
                       this.Content.title = data.data.data.title
                    }else{
                        this.$message({
                          message: '获取获取文本失败',
                          type: 'error'
                        });
                    }
                    // this.UqContent = JSON.parse(data.data.data)
                    // console.log(data.data.data)
                }).catch((data)=>{

                })
            },
            addContentBox(item){ // 点击新增内容
                item.content = item.content + '123'
                // console.log(item.content)
                // console.log(this.Content.UqContent)

            },
            getSelectLabel(){ // 获取标签
                selectLabel().then((data)=>{
                    if(data.data.status_code==200){
                        this.LabelArr = data.data.data
                    }else{
                        this.$message({
                          message: '获取标签失败',
                          type: 'error'
                        });
                    }
                }).catch((data)=>{

                })
            },
            chooseLabelAction(item){ // 点击标签获取标签内容
                selectLabelContent({
                    qlid: item.id
                }).then((data)=>{
                    if(data.data.status_code == 200){
                        this.LabelContent = data.data.data
                    }else{
                        this.$message({
                          message: '获取标签内容失败',
                          type: 'error'
                        });
                    }
                }).catch((data)=>{
                })
            },
            searchLableAction(){  // 点击搜索标签
                if(this.labelForm.title == ''){
                    this.getSelectLabel()
                }else{
                    selectLabelChoose({
                        title: this.labelForm.title,
                        status: 1
                    }).then((data)=>{
                        console.log(data.data)
                        if(data.data.status_code==200){
                            this.LabelArr = data.data.data
                        }
                    }).catch((data)=>{

                    })
                }
            },
            chooseLabelContent(item){  // 点击适用添加该文案到文本内容
                console.log(item)
            }
        }
    }
</script>

<style scoped>
.h-40{height: 480px;overflow: scroll;}
.el-form-item{margin-bottom: 0 !important}
.addIcon{height: 18px;width:20px;line-height: 19px;text-align: center;border: 1px solid #343434;border-radius: 10px;margin-left: 5px;display: inline-table;font-weight: bolder;color:#343434;cursor:pointer;}
.addIcon:hover{
    border-color:#dfc202;color:#dfc202;
}
.contentBox{width: 100%;height: 50px;}
</style>
