<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="c_m_h flex justify-between items-center px-12">
        <h2>
          我的协议书
        </h2>
        <div class="c_m_h_r flex justify-between items-center">
          <span @click="dingzhiBtn"><router-link to="CustomAgreement">定制我的协议书</router-link></span>
          <a class="hover:text-blue-400" href="/UserAgreement">协议书定制说明</a>
          <a class="hover:text-blue-400" href="">协议书如何谈判</a>
          <!-- <span><router-link to="UserAgreement">协议书定制说明</router-link></span>
          <span>协议书如何谈判</span> -->
        </div>
      </div>
      <div class="c_m_m px-12">
        <div class="c_m_m_m hidden">
          <div class="c_m_m_h flex justify-between items-center">
            <h2 class="w-1/2 text-center font-bold">协议书详情</h2>
            <div class="c_m_m_h_r w-1/2 flex justify-around items-center">
              <span class="w-1/3 inline-block text-center font-bold">版本</span>
              <span class="w-1/3 inline-block text-center font-bold">状态</span>
              <span class="w-1/3 inline-block text-center font-bold">操作</span>
            </div>
          </div>
          <ul>
            <li>
              <h4 class="flex justify-between items-center px-6">
                <div class="flex w-1/4">
                  <span class="inline-block">2020-05-04 12:40</span>
                  <span class="inline-block ml-10">文书编号:123156154</span>
                </div>
                <div class="w-1/6 flex justify-around items-center pl-5">
                  <span class="inline-block cursor-pointer underline text-blue-500 text-sm">创建副本</span>
                  <span class="inline-block cursor-pointer underline text-blue-500 text-sm">删除</span>
                </div>
              </h4>
              <div class="c_m_m_m_m flex justify-between items-center">
                <h2 class="w-1/2 overflow-hidden pl-6 text-left">
                  张三诉讼李四协议书
                </h2>
                <div class="w-1/2 flex justify-around items-center">
                  <dl class="w-1/3">
                    <dt>第10版本</dt>
                    <dd>
                      查看历史版本
                    </dd>
                  </dl>
                  <dl class="w-1/3">
                    <dt>起草中</dt>
                    <dd class="re">
                      继续起草
                    </dd>
                  </dl>
                  <dl class="w-1/3 hidden">
                    <dt>起草完</dt>
                    <dd>
                      查看协议书
                    </dd>
                  </dl>
                  <div class="w-1/3 c_m_m_m_m_r flex justify-around hidden">
                    <span class="inline-block">下 载</span>
                    <span class="inline-block">已签订</span>
                  </div>
                  <div class="w-1/3 c_m_m_m_m_r_n flex justify-around">
                    <span class="inline-block">下 载</span>
                    <span class="inline-block">已签订</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="no_consult ">
          <div class="w py-20">
            <img class="inline-block mb-6" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
            <h3 class="text-base text-center">暂无协议书，可以点击<span class="inline-block text-red-500 underline cursor-pointer" @click="dingzhiBtn">定制我的协议书</span></h3>
          </div>
        </div>
      </div>

    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {userAddQuestionnaire} from '@/api/api/requestLogin.js'
export default {
  name: 'MyConsult',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    dingzhiBtn () {
      localStorage.setItem('qid', 3)
      userAddQuestionnaire({
          qid: 3
        }).then((data) => {
          localStorage.setItem('quid', data.data.data)
          localStorage.setItem('questionnaireType', 1)
          this.$router.replace('/CustomAgreement')
        })
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: 100vh;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:143px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}
.c_m_m_h{font-size: 18px;color:#535353;height: 78px;}
.c_m_m_m ul li h4{height: 33px;font-size: 12px;background-color: #f2f4f7;}
.c_m_m_m_m{height: 98px;}
.c_m_m_m_m h2{font-size: 22px;font-weight: bold;}
.c_m_m_m_m dl dt{font-size: 18px;}
.c_m_m_m_m dl dd{font-size: 14px;color:#979797;text-decoration: underline;cursor: pointer;}
.c_m_m_m_m dl dd.re{color:#ff7290;}
.c_m_m_m_m_r span{width: 58px;height: 24px;text-align: center;line-height: 24px;border-radius: 12px;border:1px solid #547ce0;color:#547ce0;font-size: 14px;}
.c_m_m_m_m_r span:hover{background-color: #547ce0;color:#fff;}
.c_m_m_m_m_r_n span{width: 58px;height: 24px;text-align: center;line-height: 24px;border-radius: 12px;border:1px solid #cfcfcf;color:#cfcfcf;font-size: 14px;}
</style>
