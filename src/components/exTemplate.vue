<template>
  <!--主要容器开始-->
  <div class="">

  </div>
  <!--主要容器结束-->
</template>

<script>
  let vm; //留住this
  import {getNodeContent} from '../api/example'
  export default {
    name: 'exTemplate', //定义模块名称
    data() {
      return {

      } //定义模块变量
    },
    methods: {
      //接口调用方法
      getText(){
        let param ={
          channelId:44,
          path:"/about/fans"
        }
        getNodeContent(param).then(res => {


        }).catch(res => {

        })
      },
    },//方法定义区
    /**
     * 生命周期
     **/
    //el 和 data 并未初始化
    beforeCreate: function () {
      vm = this//留住this
    },
    //完成了 data 数据的初始化，el没有
    created: function () {

    },
    //完成了 el 和 data 初始化
    beforeMount: function () {

    },
    //完成挂载
    mounted: function () {

    },
    //更新前,
    beforeUpdate: function () {

    },
//更新后,
    updated: function () {

    },
//销毁前,
    beforeDestroy: function () {

    },
//销毁后
    destroyed: function () {

    },
    //组件激活时,此生命周期只在<keep-alive>标签内生效
    activated:function () {

    },
    //组件停用时,此生命周期只在<keep-alive>标签内生效
    deactivated:function () {

    }
  }
</script>
<style scoped lang="scss">

</style>
