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
            <div>
                <table class="w-full mt-10">
                    <thead>
                    <tr>
                        <td class="w-1/5 text-center border text-black font-bold " v-for="item of list">{{item}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of minlist">
                        <td class="border text-black" @click="handleClick(item.id)">{{item.title}}</td>
                        <td class="border text-black">{{item.create_time}}</td>
                        <td class="border text-black">{{item.name}}</td>
                        <td class="border text-black">{{item.case_number}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import HeadMenu from '@/components/HeadMenu'
  import {fileList} from '@/api/api/requestLogin.js'
  import {selectCaseData} from '@/api/api/requestLogin.js'
  export default {
    components:{
        HeadMenu,
    },
    data(){
      return {
        msg: localStorage.getItem('name'),
        list: {
            filename: "文件名称",
            uploadtime: "上传时间",
            uploadpeople: '上传人',
            filestatus: '文件状态'

        },
        minlist:[
          {
            title: "xx与xx离婚案件",
            create_time: "20190907",
            id: 1,
            case_number_time: 1,
            name: '张三',
            case_number: '1'
          }
        ]
      }
    },
    mounted () {
      this.getlist();
    },
    methods:{
      getlist () {
        fileList().then((data)=>{
          this.minlist = data.data;
        })
      },
      handleClick (e) {
        localStorage.setItem('id', e);
        this.$router.replace("/UpdateCase");
      }

    }
  }
</script>

<style scoped>

</style>
