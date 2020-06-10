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
      <div class="c_m_r text-left pb-10">
        <div class="pt-10 text-center">
          <h2 class="text-center pb-4 text-bold text-xl">离婚争取孩子抚养权的5种方法和技巧</h2>
          <span class="inline-block pb-6 text-sm">2020-05-05</span>
        </div>
        <div class="m_r_m py-5">
          这是文章
        </div>
        <div class="m_r_b py-6 px-6">
          <div class="flex items-center m_r_b_t">
            <div></div>
            <span class="font-bold text-sm">相关知识</span>
          </div>
          <ul class="mt-6">
            <li class="mb-2 text-sm list-disc list-inside">小孩子抚养权判定标准</li>
            <li class="mb-2 text-sm list-disc list-inside">小孩子抚养权判定标准</li>
          </ul>
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
  name: 'KnowledgeCon',
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
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.m_r_b{background-color: #f2f4f7;}
.m_r_b_t>div{width: 2px;height: 15px;background-color: #343434;margin-right: 8px;}
.m_r_b_t span{font-size: 15px;}
</style>
