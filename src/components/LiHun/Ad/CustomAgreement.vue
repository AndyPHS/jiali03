<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="c_m_h flex justify-between items-center px-12">
        <h2>
          定制我的协议书
        </h2>
        <div class="c_m_h_r">
          <span><router-link to="AgreementHelp">协议书定制帮助</router-link></span>
        </div>
      </div>
      <div class="pb-5">
        <chu-shi></chu-shi>
      </div>
    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import ChuShi from '../ChuShi.vue'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'CustomAgreement',
  components: {
    'lihun-head': lihun_head,
    'chu-shi': ChuShi
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
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:243px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;text-align: right;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}

</style>
