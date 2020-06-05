<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="py-12 px-12">
        <h2 class="text-left text-lg c_m_t">个人中心</h2>
        <div class="flex justify-around items-center">
          <div class="m_l">
            <div class="flex justify-between mt-12">
              <h3 class="m_l_t font-bold">基础资料</h3>
              <span class="inline-block text-base" @click="editBasic">编辑</span>
            </div>
            <div class="flex justify-between items-center">
              <ul class="xing mt-4">
                <li class="lis text-right">姓名:</li>
                <li class="lis text-right">性别:</li>
                <li class="lis text-right">电子邮件:</li>
              </ul>
              <ul class="zan mt-4">
                <li class="lis text-left">暂无</li>
                <li class="lis text-left">暂无</li>
                <li class="lis text-left">暂无</li>
              </ul>
            </div>
            <div class="mt-12">
              <h3 class="m_l_t font-bold">账号资料</h3>
            </div>
            <div class="flex justify-between items-center">
              <ul class="xing mt-4">
                <li class="lis text-right">手机号:</li>
                <li class="lis text-right">密码:</li>
              </ul>
              <ul class="shou mt-4">
                <li class="lis text-left">暂无</li>
                <li class="lis text-left">暂无</li>
              </ul>
              <ul class="xiu mt-4">
                <li class="lis text-left underline" @click="editPhone">修改</li>
                <li class="lis text-left underline" @click="editPassword">修改</li>
              </ul>
            </div>
          </div>
          <div class="m_r w-1/3">
            <dl>
              <dt>
                <img class="inline-block" src="../../../assets/images/lihun/user_img.png" alt="">
              </dt>
              <dd @click="setImg">
                设置头像
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="live"></div>
    <div class="text-left">
      <!-- 基础资料 -->
      <el-dialog title="编辑基础资料" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电子邮件" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer pb-4">
          <span class="anniu" @click="saveBtn">保存</span>
          <span class="anniu" @click="cancleBtn">取消</span>
        </div>
      </el-dialog>
      <!-- 修改手机号01 -->
      <el-dialog title="修改手机号" :visible.sync="dialogPhone01">
        <el-form class="mt-6" :model="form">
          <h2 class="text-red-500 mb-2 ml-32">请输入18577889998收到的验证码</h2>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PhoneCode01" type="text" autocomplete="off" class="el-input__inner">
              </div>
              <el-button v-if="this.IsGetCode01" class="ml-5" type="primary" :loading="IsGetCode01">已发送</el-button>
              <el-button v-if="this.IsGetCode01==false" class="ml-5" type="primary" @click="sendCode01">获取</el-button>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="nextBtn">下一步</span>
          <el-popover
            placement="right"
            width="400"
            trigger="hover">
            <div>
              <h5>手机接收不到验证码，可能有以下几种原因</h5>
              <ul>
                <li>1) 输入的手机号错误；</li>
                <li>2) 手机网络环境差；</li>
                <li>3）手机已欠费；</li>
                <li>4）将发送验证码的号码加入了黑名单或被手机中安装的安全软件拦截；</li>
                <li>5）您曾向运营商申请屏蔽通知类短信；</li>
                <li>6）系统出现了错误。</li>
              </ul>
              <p>若是您手机原因，您可以拨打手机网络运营商，转接到人工服务，说明情况以后由他们帮您处理。</p>
              <p>若是系统出现错误，您需要耐心等待，若还是接收不到，可联系客服。</p>
            </div>
            <span class="underline cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改手机号02 -->
      <el-dialog title="修改手机号" :visible.sync="dialogPhone02">
        <el-form class="mt-6" :model="form">
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">手机号</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.newPhone" type="text" autocomplete="off" class="el-input__inner">
              </div>
              <el-button v-if="this.IsGetCode02" class="ml-5" type="primary" :loading="IsGetCode02">已发送</el-button>
              <el-button v-if="this.IsGetCode02==false" class="ml-5" type="primary" @click="sendCode02">获取</el-button>
            </div>
          </div>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PhoneCode02" type="text" autocomplete="off" class="el-input__inner">
              </div>

            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="savePhoneBtn">保存</span>
          <el-popover
            placement="right"
            width="400"
            trigger="hover">
            <div>
              <h5>手机接收不到验证码，可能有以下几种原因</h5>
              <ul>
                <li>1) 输入的手机号错误；</li>
                <li>2) 手机网络环境差；</li>
                <li>3）手机已欠费；</li>
                <li>4）将发送验证码的号码加入了黑名单或被手机中安装的安全软件拦截；</li>
                <li>5）您曾向运营商申请屏蔽通知类短信；</li>
                <li>6）系统出现了错误。</li>
              </ul>
              <p>若是您手机原因，您可以拨打手机网络运营商，转接到人工服务，说明情况以后由他们帮您处理。</p>
              <p>若是系统出现错误，您需要耐心等待，若还是接收不到，可联系客服。</p>
            </div>
            <span class="underline cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改密码01 -->
      <el-dialog title="修改密码" :visible.sync="dialogPassword01">
        <el-form class="mt-6" :model="form">
          <h2 class="text-red-500 mb-2 ml-32">请输入18577889998收到的验证码</h2>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PasswordCode01" type="text" autocomplete="off" class="el-input__inner">
              </div>
              <el-button v-if="this.IsGetPsCode01" class="ml-5" type="primary" :loading="IsGetPsCode01">已发送</el-button>
              <el-button v-if="this.IsGetPsCode01==false" class="ml-5" type="primary" @click="sendPsCode">获取</el-button>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="PassWordnextBtn">下一步</span>
          <el-popover
            placement="right"
            width="400"
            trigger="hover">
            <div>
              <h5>手机接收不到验证码，可能有以下几种原因</h5>
              <ul>
                <li>1) 输入的手机号错误；</li>
                <li>2) 手机网络环境差；</li>
                <li>3）手机已欠费；</li>
                <li>4）将发送验证码的号码加入了黑名单或被手机中安装的安全软件拦截；</li>
                <li>5）您曾向运营商申请屏蔽通知类短信；</li>
                <li>6）系统出现了错误。</li>
              </ul>
              <p>若是您手机原因，您可以拨打手机网络运营商，转接到人工服务，说明情况以后由他们帮您处理。</p>
              <p>若是系统出现错误，您需要耐心等待，若还是接收不到，可联系客服。</p>
            </div>
            <span class="underline cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改密码02 -->
      <el-dialog title="修改密码" :visible.sync="dialogPassword02">
        <el-form class="mt-6" :model="form">
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">新密码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.passwordNew" type="text" autocomplete="off" class="el-input__inner">
              </div>

            </div>
          </div>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">确认新密码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.passwordAgain" type="text" autocomplete="off" class="el-input__inner">
              </div>

            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="PassWordsaveBtn">保存</span>
        </div>
      </el-dialog>
      <!-- 更新用户头像 -->
      <el-dialog title="设置头像" :visible.sync="dialogImg">
        <div class="touxiang">
            <form action="" class="text-center imbox">
              <img :src="form.userImg" alt="">
              <input name="imgs" class=" mx-auto" placeholder="上传头像" type="file" id='upfile' @change="selectFile">
            </form>
        </div>
        <h4 class="mt-3 text-center">图片格式JPG\JPEG\PNG\GIF格式，大小不超过10MB</h4>
        <div slot="footer" class="dialog-footer flex justify-around pb-4">
          <span class="anniu" @click="saveImg">保存</span>
          <span class="anniu" @click="cancleImg">取消</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementUser',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      dialogFormVisible: false, // 基本信息弹窗
      dialogPhone01: false, // 修改手机号第一个弹窗
      IsGetCode01: false, // 是否发送旧手机验证码
      dialogPhone02: false, // 修改手机号第二个弹窗
      IsGetCode02: false, // 是否发送新手机验证码
      dialogPassword01: false, // 修改密码第一个弹窗
      dialogPassword02: false, // 修改密码第二个弹窗
      IsGetPsCode01: false, // 是否发送密码验证码
      dialogImg: false, // 设置头像弹窗
      form: {
        name: '',
        sex: '',
        email: '',
        newPhone: '',
        PhoneCode01: '',
        PhoneCode02: '',
        IsGetPsCode01: '',
        passwordNew: '',
        passwordAgain: '',
        userImg: 'https://p1.ssl.qhimg.com/dr/220__/t0175c8a184eb7a7f87.jpg'
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {

  },
  methods: {
    editBasic () { // 点击编辑基础资料
      this.dialogFormVisible = true
    },
    saveBtn () { // 确认编辑基础资料
      this.dialogFormVisible = false
    },
    cancleBtn () { // 取消编辑基础资料
      this.dialogFormVisible = false
    },
    editPhone () { // 点击修改手机号
      this.dialogPhone01 = true
    },
    sendCode01 () { // 发送修改手机号验证码
      this.IsGetCode01 = true
    },
    nextBtn () { // 手机号弹窗下一步
      this.dialogPhone01 = false
      this.dialogPhone02 = true
      this.IsGetCode01 = false
    },
    sendCode02 () { // 发送新手机号验证码
      this.IsGetCode02 = true
    },
    savePhoneBtn () { // 保存新手机号
      this.IsGetCode02 = false
      this.IsGetCode02 = false
    },
    editPassword () { // 点击修改密码弹窗
      this.dialogPassword01 = true
    },
    sendPsCode () {
      this.IsGetPsCode01 = true
    },
    PassWordnextBtn () { // 修改密码弹窗下一步
      this.dialogPassword01 = false
      this.dialogPassword02 = true
      this.IsGetPsCode01 = false
    },
    PassWordsaveBtn () {
      this.dialogPassword02 = false
    },
    setImg () {
      this.dialogImg = true
    },
    saveImg () {
      this.dialogImg = false
    },
    cancleImg () {
      this.dialogImg = false
    },
    selectFile () {
      let imgFiles = $('#upfile')[0].files
      if (imgFiles && imgFiles.length) {
        for (let item of imgFiles) {
          let size = item.size / 1024 / 1024
          if (size > 5) {
            this.$message.error('单张图片大小不能超过5M')
            return false
          }
        }
      }
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_t{font-size: 20px;}
.m_l{width: 320px;}
.m_l span{font-size: 15px;color:#829fe8;text-decoration: underline;cursor: pointer;}
.m_r dl dd{width: 87px;height: 25px;text-align: center;line-height: 25px;font-size: 15px;color: #547ce0; border:1px solid #547ce0;border-radius: 12px;margin:18px auto;}
.m_l_t, .xing{width: 83px;}
.zan{width: 229px;}
.lis{font-size: 15px;color:#818181;margin:5px 0;}
.shou{width: 198px;}
.xiu{width: 33px;}
.xiu li{color:#7696e6;cursor: pointer;}
.anniu{width: 220px;height: 40px;text-align: center;line-height: 40px;font-size: 18px;border:1px solid #878787;border-radius:20px;margin:0 20px;display: inline-block;cursor: pointer;}
.anniu:first-of-type{color:#ff3f68;border: 1px solid #ff3f68;}
.anniu:first-of-type:hover{color:#fff;border: 1px solid #ff3f68;background-color: #ff3f68;}
.anniu:last-of-type:hover{color: #fff;background-color: #878787;}
.phoneBox .el-form-item__content {display: flex !important;}
.phoneBox .el-input{width: 372px;}
.touxiang{width: 520px;height: 300px;margin:0 auto;background-color: #eceff4;}
.imbox{text-align: center;margin: 0;display: flex;flex-direction: column;align-items: center;padding-top: 40px;}
.imbox img{width: 149px;height: 149px;background: #fff;border-radius: 50%;display: inline-block;}
</style>
