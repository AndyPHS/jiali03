<template>
    <div>
        <head-menu></head-menu>
        <div class="w-full px-10 mx-auto">
            <h2 class="py-2 text-lg text-center w-2/5">
              张三起诉李四离婚纠纷  
            </h2>
            <p class="pb-1 text-base text-center w-2/5">民事起诉状</p>
            <p class="text-left pb-1">事实与理由：</p>
            <div class="flex">
                <div class="w-2/5 h-40 border rounded">
                    <div>
                        
                    </div>
                </div>
                <div class="w-1/5 h-40 mx-4 border rounded">
                    中间
                </div>
                <div class="w-2/5 h-40 border rounded">
                    右侧
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {}
        },
        mounted () {

        },
        methods:{

        }
    }
</script>

<style scoped>
.h-40{height: 480px;}
</style>
