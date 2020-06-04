<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="py-12">
        <div class="c_m_t">协议书定制帮助</div>
        <div class="flex justify-between items-center mt-12">
          <div class="c_m_l">
            <div class="c_m_l_t">
              <span class="ding_btn"><router-link to="CustomAgreement">定制我的协议书</router-link></span>
            </div>
            <div class="mt-10">
              <h3 class="text-center text-lg font-bold">帮助分类</h3>
              <ul class="mt-5">
                <li class="text-base leading-loose">注册分类</li>
                <li class="text-base leading-loose">注册分类</li>
                <li class="text-base leading-loose">注册分类</li>
              </ul>
            </div>
          </div>
          <div class="c_m_r text-left">
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
            <h2>协议书定制帮助</h2>
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
  name: 'AgreementHelp',
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

  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_t{margin-left: 239px;text-align: center;font-size: 25px;font-weight: bold;}
.c_m_l{width: 239px;border-right: 1px solid #eceff4;}
.ding_btn{width: 153px;height: 37px;margin:0 auto;text-align: center;line-height: 37px;border-radius: 18px;font-size: 16px;color: #fff;font-weight: bold;display: inline-block;background-color: #ff3f68;border: 1px solid #ff3f68;}
.c_m_l_t{}
.c_m_r{width: 950px;padding-left: 65px;padding-right: 65px;}
</style>
