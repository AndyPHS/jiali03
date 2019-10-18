<template>
    <div>
       <head-menu></head-menu>
       <div class="container mx-auto">
            <div class="title">
                <ul class="flex  w-4/5 mx-auto my-3 text-lg">
                    <li class="px-10 mx-2 py-1 border border-red-600 rounded-sm hover:bg-red-600 hover:text-white cursor-pointer">离婚</li>
                    <li class="px-10 mx-2 py-1 border border-red-600 rounded-sm hover:bg-red-600 hover:text-white cursor-pointer">继承</li>
                    <li class="px-10 mx-2 py-1 border border-red-600 rounded-sm hover:bg-red-600 hover:text-white cursor-pointer">其他</li>
                </ul>
            </div>
            <div class="flex w-4/5 mx-auto">
                <div class="w-10/12 border-2 rounded border-red-600 flex">
                    <div>
                        <img class="rounded cursor-pointer" src="@/assets/images/maxsearch.png">
                    </div>
                    <div class="w-full h-full mx-2 searchBox">
                        <input class='h-full w-full' v-model="headSearch" placeholder="输入案由、关键词、法院、当事人、律师">
                    </div>
                </div>
                <div class="w-2/12 pt-2 bg-red-600 text-white -ml-1  border-2 border-red-600 cursor-pointer text-lg searchBtn">搜索</div>
           </div>
           <div class="w-4/5 mx-auto border-2 rounded border-red-600 betterBox hidden">
               <div class="">
                    <el-form :model="selectCaseList"  label-width="120px">
                        <div class="flex mt-5 pr-10">
                            <div class="w-1/2">
                               <el-form-item label="案由" :class="text-sm">
                                    <el-input v-model="selectCaseList.case_acction" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="标题" class="text-base">
                                    <el-input v-model="selectCaseList.title" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="案号" class="text-base">
                                    <el-input v-model="selectCaseList.case_number" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="律所案号" class="text-base">
                                    <el-input v-model="selectCaseList.master_number" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="法院" class="text-base">
                                    <el-input v-model="selectCaseList.court" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="法院人员" class="text-base">
                                    <el-input v-model="selectCaseList.courtPersonnel" size="small"></el-input>
                                </el-form-item>
                           </div>
                           <div class="w-1/2">
                                <el-form-item label="律师" class="text-base">
                                    <el-input v-model="selectCaseList.lawyer" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="律所" class="text-base">
                                    <el-input v-model="selectCaseList.lawyerOffice" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="审理程序" class="text-base">
                                    <el-input v-model="selectCaseList.subject" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="案件类型" class="text-base">
                                    <el-input v-model="selectCaseList.case_type" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="审理时间" class="text-base">
                                    <el-input v-model="selectCaseList.time" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="标签" class="text-base">
                                    <el-input v-model="selectCaseList.label" size="small"></el-input>
                                </el-form-item>
                           </div>
                        </div>
                        <el-form-item label="法律依据" class="text-base pr-10">
                            <el-input v-model="selectCaseList.law" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="w-1/3 mx-auto flex justify-around py-5 text-sm">
                        <span class="px-3 py-1 rounded bg-red-600 text-white">检索</span>
                        <span class="px-3 py-1 rounded bg-red-600 text-white">重置</span>
                    </div>
               </div>
           </div>
       </div>
       <div class="w-full px-10 my-5 flex">
           <div class="w-1/4 border">
               <div class="text-left border-bottom my-2 mx-2">
                   <h3 class="text-lg font-bold">标签池</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
               <div>
                   <h3>案由</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
               <div>
                   <h3>地域及法院</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
               <div>
                   <h3>法院层级</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
               <div>
                   <h3>审理程序</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
               <div>
                   <h3>文书类型</h3>
                   <ul>
                       <li>财产关系</li>
                       <li>子女关系</li>
                       <li>婚姻关系</li>
                   </ul>
               </div>
           </div>
           <div class="w-3/4">
               结果栏
           </div>
       </div>
    </div>
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部

    export default {
        data() {
            return {
               headSearch: '',
               selectCaseList:{

               },
            }
        },
        components: {
            HeadMenu,
        }
    }
</script>
<style scoped>
.title{
    margin-left:110px;
}
.searchBox input{
    outline: none;
}
.betterBox{
    margin-top:-2px;
    background: #f8f6f7;
}
.el-form-item{
    margin-bottom:5px;
}
.el-form-item__label{
    font-size: 16px;
}
</style>
