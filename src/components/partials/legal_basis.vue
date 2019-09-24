<template>
    <div>
        <div>
            <ul class="flex flex-wrap my-4 overflow-wrap">
                <li class="px-2 py-1 bg-green-500 rounded text-white mx-2 my-2" v-for="(item,index) in oldlabel" :key="item.id" @click="addLabelarr(item.title)">{{item.title}}</li>
            </ul>

        </div>
        <div class="inputbox">
            <div class="arrbox">
                <div v-for="(item,index) in labelarr" :key="index" class="spanbox">
                    <span>{{item}}</span>
                    <i class="spanclose" @click="removeitem(index,item)"></i>
                </div>
                <input
                        placeholder="输入后回车"
                        size="5"
                        v-model="currentval"
                        @keyup.enter="addlabel"
                        class="input"
                        type="text"
                />
            </div>
        </div>

        <!-- 常用label展示 -->
        <div></div>
    </div>
</template>

<script>
    import {selectCaseLable} from "@/api/api/requestLogin.js";    // 查询标签接口
    import {updateCaseData} from '@/api/api/requestLogin.js'   // 修改页面信息
  export default {
    name: 'legal_basis',
    props: {
      parentarr: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currentval: '',
        labelarr: [],
        oldlabel: ''
      }
    },
    mounted () {
      this.getCaseLable();    // 获取标签
    },
    watch: {
      labelarr (old, cur) {
        this.$emit('on-change', this.labelarr)
      },
      parentarr () {
        if (this.parentarr.length > 0) {
          this.labelarr = this.oldlabel
          for (let i = 0; i < this.parentarr.length; i++) {
            this.labelarr.push(this.parentarr[i])
          }
        } else {
          this.labelarr = []
        }
      }
    },
    methods: {
      // 移除标签
      removeitem (index, item) {
        this.labelarr.splice(index, 1)
      },
      // input回车加入labelarr中
      addlabel () {
        let count = this.oldlabel.indexOf(this.currentval)
        if (count === -1) {
          this.labelarr.push(this.currentval)
          this.oldlabel.push(this.currentval)
        }
        this.currentval = ''
      },
      // 获取标签
      getCaseLable () {
        selectCaseLable().then((data) =>{
          // console.log(data.data)
          this.oldlabel = data.data.data;
          let cloneData = JSON.parse(JSON.stringify(data.data.data))  ;
          console.log(cloneData)
          return cloneData.filter(father=>{
            let branchArr = cloneData.filter(child=>father.id == child.parentId)    //返回每一项的子级数组
            branchArr.length>0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
            return father.parentId==0;      //返回第一层
          });
        })
      },
      addLabelarr (e) {
        this.labelarr.push(e);
        updateCaseData().then((data) =>{
          console.log(JSON.parse(data.config.data))
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .inputbox {
        background-color: white;
        font-size: 12px;
        border: 1px solid #dcdee2;
        border-radius: 6px;
        margin-bottom: 18px;
        padding: 6px 1px 1px 6px;
        text-align: left;
        font-size: 0;
        margin-bottom: 0;
    }
    .input {
        font-size: 14px;
        border: none;
        box-shadow: none;
        outline: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        width: auto !important;
        max-width: inherit;
        min-width: 80px;
        vertical-align: top;
        height: 30px;
        color: #34495e;
        margin: 2px;
        line-height: 30px;
    }
    .arrbox {
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 6px 1px 1px 6px;
        text-align: left;
        font-size: 0;
    }
    .spanbox {
        line-height: 30px;
        margin: 2px;
        padding: 0 10px;
        background-color: #1abc9c;
        color: white;
        border-radius: 4px;
        font-size: 13px;
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        overflow: hidden;
        transition: 0.25s linear;
    }
    .spanbox:hover {
        padding: 0px 17px 0 3px;
    }
    .spanclose {
        color: white;
        padding: 0 10px 0 0;
        cursor: pointer;
        font-size: 12px;
        position: absolute;
        right: -3px;
        text-align: right;
        text-decoration: none;
        top: 0;
        width: 100%;
        bottom: 0;
        z-index: 2;
        opacity: 0;
        filter: "alpha(opacity=0)";
        transition: opacity 0.25s linear;
        font-style: normal;
    }
    .spanbox:hover .spanclose {
        padding: 0 10px 5px 0;
        opacity: 1;
        -webkit-filter: none;
        filter: none;
    }
    .spanclose:after {
        content: "x";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 27px;
    }
</style>
