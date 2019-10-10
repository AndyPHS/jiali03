<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto ">
            <div>
                <div >
                    <h2 class="md:text-3xl text-orange-500 py-4">案例上传</h2>
                    <form action="" name="myForm" id="myForm" class="w-2/3 mx-auto" enctype="multipart/form-data">
                        <div class="text-left">
                            <span class="md:text-xl">文件名称</span>
                            <input type="text" name="title" id="name" placeholder="请输入文件名称" v-model="formMsg.title"
                                   class="md:text-xl border ml-2 text-base">
                        </div>
                        <div class="text-left py-2 flex whitespace-no-wrap">
                            <span class="md:text-xl">上传文件:</span>
                            <ul>
                                <li><input type="file" name="upfile" id="upfile"
                                           accept='image/jpeg, image/png, image/jpg' class="pl-2" @change="selectFile"
                                           multiple></li>
                                <li class="my-2 text-red-500">(注意：图片必须以1234……命名，切按顺序上传如：1.jpg)</li>
                                <!--<input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>-->
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li class="text-left my-2 w-full flex justify-between"
                                    v-for="(item, index) in filename">
                                    第{{index + 1}}个、{{item.name}} <br/>
                                    <p class="errP" v-show="isShow">{{form.fileMsg}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="w-1/2 mx-auto pt-6">
                            <button type="submit" class="px-6 py-2 bg-blue-500 text-white"
                                    @click.prevent="submitClick()">确认上传
                            </button>
                        </div>
                    </form>
                    <div class="my-6">
                        <a class="text-blue-500" @click="getList()">查看已上传的文件</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu'
  import {creatCase} from '@/api/api/requestLogin.js'
  // import {apiUrl} from '@/common/js/api.js'
  export default {
    name: 'caseupload',
    components: {
      HeadMenu,
    },
    data () {
      return {
        msg: localStorage.getItem('name'),
        formMsg: {
          title: '',
          imgs: []
        },
        isShow: false,
        filename: '',
        form: {
          fileMsg: '文件大小不能超过2M'
        }

      }
    },
    methods: {
      submitClick () {
        let formData = new FormData();
        let imgFiles = document.getElementById('upfile').files;
        for (let i = 0; i < imgFiles.length; i++) {
          formData.append('imgs',imgFiles[i])
        }
        formData.append('title',this.formMsg.title)
        creatCase(formData).then((data) => {
          console.log(data)
          this.$router.replace('/FileList')
        }).catch((data) => {

        })
      },
      selectFile: function () {


      },
      update(e){
        let file = e.target.files[0];
        let param = new FormData();
        param.append('imgs',file,file.name);//通过append向form对象添加数据
        param.append('title',this.formMsg.title);//添加form表单中其他数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type':'multipart/form-data', Authorization: 'bearer ' + localStorage.getItem('token')}
        };
        this.$axios.post(apiUrl.creatCase,param,config).then(responsive=>{
          console.log(responsive.data)
        })
      },
      uploadImg () {
        var files = document.getElementById('file').files
        if (files && files.length) {
          for (let item of files) {
            let size = item.size / 1024 / 1024
            if (size > 2) {
              this.$message.error('大小不能超过2M')
              return false
            }
            this.fileList.push(item['name'])
            this.files.push(item)
          }
        }
      },
      deleteFile (index) {
        var dom = document.getElementById('file')
        dome.value == ''
        this.fileList.splice(index, 1)
        this.Files.splice(index, 1)
      },
      getList () {
        this.$router.replace('/FileList')
      }
    }

  }
</script>

<style scoped>

</style>
