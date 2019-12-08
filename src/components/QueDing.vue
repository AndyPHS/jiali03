<template>
  <div class="container mx-auto">
    <div>
      <el-form >
        <div class="ml-5">
          <div class="text-lg text-left my-2">根据您填写的信息，您与配偶生育有两个子女，需要处理的夫妻共同财产有三套房产、两辆车子、存款、理财、家具家电，以及债权债务。为了更高效地为您定制专属协议，建议您在填写前先准备好下列材料：</div>
          <div>
            <div class="flex w-2/3 mx-auto">
              <ul class="w-1/2 text-left">
                <li>1、结婚证（示例一）</li>
                <li>2、身份证（示例二）</li>
                <li>3、户口本（示例三）</li>
                <li>4、孩子出生证明（示例四）</li>
                <li>5、房产证（示例五）</li>
                <li>6、房屋买卖合同（示例六）</li>
              </ul>
              <ul class="w-1/2 text-left">
                <li>7、机动车登记证（示例七）</li>
                <li>8、理财协议（示例八）</li>
                <li>9、保险合同（示例九）</li>
                <li>10、银行账户（示例十）</li>
                <li>11、存折（示例十一）</li>
                <li>12、家具家电品牌名称（示例十二）</li>
              </ul>
            </div>
          </div>
          <div class="text-lg text-left my-2">
            协议定制共有基本信息、婚姻状况、子女信息、财产信息、债权债务信息五个板块，预计耗时20分钟，请您安排好时间。
          </div>
        </div>
      </el-form>
      <div class="my-4">
        <div class="w-40 mx-auto">
          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="NextPage">
            开始定制
          </div>
        </div>
      </div>
      <div>
        <div class="flex w-2/3 mx-auto">
          <div class="w-2/6">示例一（结婚证）：</div>
          <div class="w-4/6">
            <img src="@/assets/images/lihun/001(1).jpeg" alt="结婚证图片">
            <img src="@/assets/images/lihun/001(2).jpeg" alt="结婚证图片">
          </div>
        </div>
        <div class="flex w-2/3 mx-auto">
          <div class="w-2/6">
            示例二（身份证）：
          </div>
          <div class="w-4/6">
            <img src="@/assets/images/lihun/001(1).jpeg" alt="结婚证图片">
          </div>
        </div>
        <div class="flex w-2/3 mx-auto">
          <div class="w-2/6">
            示例三（户口本）：
          </div>
          <div class="w-4/6">
            <img src="@/assets/images/lihun/003(1).jpeg" alt="户口本图片">
            <img src="@/assets/images/lihun/003(2).jpeg" alt="户口本图片">
            <img src="@/assets/images/lihun/003(3).jpeg" alt="户口本图片">
          </div>
        </div>
        <div class="flex w-2/3 mx-auto">
          <div class="w-2/6">
            示例四（孩子出生证明）：
          </div>
          <div class="w-4/6">
            <img src="@/assets/images/lihun/004.jpeg" alt="孩子出生证明图片">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
      // label_case,
    },
      data () {
          return {
            hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            childNum: '',
            answerMsg: [],
            childAll: [],
            ChildBirthday: '',
            ChildName: ''
          }
      },
      name: 'FangChan',
      mounted () {

      },
      mounted () {
        this.childList();
      },
      methods: {
        getId (index) {
          return 'box_' + index
        },
        childMsg1 () {
          return [
           
          ]
        },
        NextPage () {
          this.$router.replace("/BasicInformation");
        },
        addChildBirthday1 (e) {
           console.log(e,12312313)
        },
        addChildBirthday (e) {
          console.log(e,12312313)
        },
        addChildName (e) {    // 添加姓名
          console.log(e)
          alert(e)
        },
        addChildSex (e) {
          console.log(e)
        },
        addChildId (e) {
          console.log(e)
        },
        consoleChild () {

        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
</style>
