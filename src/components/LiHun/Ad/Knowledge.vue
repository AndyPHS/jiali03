<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w flex justify-between">
      <div class="c_m_l">
        <div class="pt-10">
          <h3 class="text-center text-lg font-bold">离婚知识分类</h3>
          <ul class="mt-5">
            <li class="text-base leading-loose">注册分类</li>
            <li class="text-base leading-loose">注册分类</li>
            <li class="text-base leading-loose">注册分类</li>
          </ul>
        </div>
      </div>
      <div class="c_m_r text-left">
        <div class="border-b pb-10 pt-16">
          <div action="" class="keyinput flex justify-between items-center">
            <input class="ml-3" v-model="keyMsg" type="text" placeholder="请输入要搜索的内容关键词" autocomplete="off" >
            <img @click="searchAction" class="cursor-pointer" src="../../../assets/images/lihun/searchM_icon.png" alt="">
          </div>
          <ul class="c_m_r_t flex justify-around pt-3">
            <li class="w-1/3 text-center cursor-pointer">2020年婚姻法最新规定</li>
            <li class="w-1/3 text-center cursor-pointer">女方争取抚养权的技巧</li>
            <li class="w-1/3 text-center cursor-pointer">男方争取抚养权的技巧</li>
          </ul>
        </div>
        <div class="m_r_m">
          <ul class="hidden">
            <li class="pb-8 border-b cursor-pointer" @click="goKnowledgeMin(1)">
              <div class="py-8 flex justify-between items-center">
                <h2 class="w-4/5 overflow-hidden">女方怎样才能争取孩子的抚养权？</h2>
                <span class="w-1/5 text-right">2020-04-03</span>
              </div>
              <p>北京家理律师事务所是全国规模最大的婚姻家事法律服务专业化律所，地处北京市的中心商务区，建国门赛特大厦，拥有整层近2000平方米北京家理律师事务所是全国规模最大的婚姻家事法律服务专业化律所，地处北京市的中心商务区，建国门赛特大厦，拥有整层近2000平方米北京家理律师事务所是全国规模最大的婚姻家事法律服务专业化律所，地处北京市的中心商务区，建国门赛特大厦，拥有整层近2000平方米</p>
            </li>
          </ul>
          <div>
            <div class="pt-12 text-center mx-auto">
              <img class="inline-block" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
              <p class="text-center text-sm pt-5">
                共找到<span class="text-red-400 font-bold">0条</span> 与 <span class="text-red-400 font-bold">"抚养权”</span> 相关的内容</br>
                可尝试更换不同的关键词重新进行搜索
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Knowledge',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      keyMsg: ''  // 关键词搜索
    }
  },
  mounted () {

  },
  methods: {
    goKnowledgeMin (id) {
      this.$router.push({
        name: 'KnowledgeCon',
        params: {
          id: id
        }
      })
    },
    searchAction () {
      alert('没有搜索结果')
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: 100vh;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_l{width: 239px;padding:150px 0;}
.c_m_r{width: 960px;padding-left: 65px;padding-right: 65px;border-left: 2px solid #eceff4;}
.keyinput{width: 680px;height: 34px;border:1px solid #c9c9c9;line-height: 34px;font-size: 16px;color:#535353;margin: 0 auto;border-radius: 17px;}
.keyinput input{height: 32px;line-height: 34px;width: 626px;border:none;}
.keyinput input:focus{border:none;outline: none;}
.keyinput img{display: inline-block;margin-right: 15px;}
.c_m_r_t{width: 530px;margin:0 auto;}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
</style>
