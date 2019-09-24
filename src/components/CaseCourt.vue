<template>
 <div>
  <head-menu></head-menu>
  <div class="container mx-auto panel panel-primary">
   <div class="panel-heading text-2xl text-black py-4 font-bold">法院信息管理</div>
   <table class="table table-bordered table-striped text-center w-2/3 mx-auto">
    <thead>
    <tr class="py-1">
     <th>法院名称</th>
     <th>法院等级</th>
     <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="(row,index) in rows ">
     <tr><td class="border">{{row.name}}</td>
      <td class="border">{{row.status}}</td>
      <td class="border"><a href="#" @click="Edit(row)">编辑</a>&nbsp;&nbsp;<a href="#" @click="Delete(row,index)">删除</a></td>
     </tr>
    </template>
    <tr>
     <td ><input type="text" class="form-control border text-center mt-4" v-model="rowtemplate.name" /></td>
     <td ><input type="text" class="form-control border text-center mt-4" v-model="rowtemplate.status" /></td>
     <td ><button type="button" class="btn btn-primary mt-4 px-2 text-white bg-blue-500" @click="Save">保存</button></td>
    </tr>
    </tbody>
   </table>
  </div>
 </div>
</template>

<script>
 import HeadMenu from '@/components/HeadMenu'
 import {creatCaseCourtMsg,updateCaseCourtMsg,deleteCaseCourtMsg} from '@/api/api/requestLogin.js'
  export default {
  components:{
   HeadMenu,
  },
   data(){
    return {
     rows: [
      { cpid: 1, name: '初级人民法院', status: 1 },
      { cpid: 2, name: '中级人民法院', status: 2 },
      { cpid: 3, name: '高级人民法院', status: 3 },
      { cpid: 4, name: '超级人民法院', status: 4 },
     ],
     rowtemplate: { name: '', status: '' }
    }
   },
   mounted () {
   },
   methods:{
    Save: function (event) {
     if (!this.rowtemplate.cpid) {
      creatCaseCourtMsg(this.rowtemplate).then((data)=>{
        this.rows = data.data.result;
       //还原模板
       this.rowtemplate = { name: '', status: '' }
      })
     }else{
      updateCaseCourtMsg(this.rowtemplate).then((data)=>{
       this.rows = data.data.result;
       //还原模板
       this.rowtemplate = { name: '', status: '' }
      })
     }


    },
    Delete: function (row,index) {
     //实际项目中参数操作肯定会涉及到id去后台删除，这里只是展示，先这么处理。
     deleteCaseCourtMsg({cpid:row.cpid}).then((data)=>{
      this.rows = data.data.result;
      //还原模板
      this.rowtemplate = { name: '', status: '' }
     })
     this.rows.splice(index, 1);
    },
    Edit: function (row) {
     this.rowtemplate = row;
    }
   }
  }
</script>

<style scoped>

</style>
