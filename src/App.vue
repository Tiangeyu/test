<template>
  <div id="app">
    <router-view></router-view>
    <alert-c :title="title" v-show="isShow"></alert-c>
  </div>
</template>

<script>
  import alertC from './components/alertC.vue'
  import Vue from 'vue'
  export default {
    name: 'app',
    components:{
      alertC
    },
    data(){
      return{
         appid: "",
         isShow: false,
         title:'',
         code:''
      }
    },
    created() {
      // 图片公用路径
      window.sessionStorage.setItem('wxCustomerId', 11);
      window.sessionStorage.setItem('customerName','maomao');
      window.sessionStorage.setItem('binding',0);     
      // Vue.prototype.wxCustomerId = 1;
      this.$http.get('/eb-wxshop/wxshop/wx/queryPicUrl').then((res)=>{
          //  console.log(res.body.url)
          // 全局都可以使用 使用方法是 this.picUrl
          window.sessionStorage.setItem("picUrl", res.body.url)
          this.$router.push('/index')
          //Vue.prototype.picUrl = res.body.url;
      },(res)=>{
          this.title="图片头获取失败"
          this.isShow = !this.isShow;
          var that = this
          setTimeout(function() {
            that.isShow = !that.isShow
          }, 3000);
      })

      // 获取用户信息
      //  获取appid
      // if(location.href.search('code') > 1){
      //     this.code = location.href.split("?code=")[1].split("&")[0] 
      // }   
      // if(this.code){
      //   //  这一条数据是走的最慢的  因为要调用外网获取数据
      //   this.$http.get("/eb-wxshop/wxshop/wx/auth", {params:{code: this.code, state: 1}}).then(function(res){
      //     let wxUser = JSON.stringify(res.body.customer)
      //     //  储存到本地
      //     window.sessionStorage.setItem("wxCustomerId", res.body.customer.id)
      //     window.sessionStorage.setItem("customerName", res.body.customer.nickName)
      //     window.sessionStorage.setItem("wxUserPhone", res.body.customer.phone)
      //     window.sessionStorage.setItem('binding', res.body.customer.binding)
      //     window.sessionStorage.setItem('wxUser', wxUser)
      //     this.$router.push({name:'index'})             
      //   }, function(res){
      //       this.title="用户信息获取失败"
      //       this.isShow = !this.isShow;
      //       var that = this
      //       setTimeout(function() {
      //         that.isShow = !that.isShow
      //       }, 3000);
      //   }) 
      // }else{
      //   this.$http.get('/eb-wxshop/wxshop/wx/getAuthParam').then(function(res){            
      //       this.appid = res.body.appid;                      
      //       window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.appid+"&redirect_uri=http%3A%2F%2Fshop.ryhx.com.cn%2Feb-wxshop%2FsmallShop%2Findex.html&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";            
      //   },function(res){
      //       this.title="获取appid失败"
      //       this.isShow = !this.isShow;
      //       var that = this
      //       setTimeout(function() {
      //         that.isShow = !that.isShow
      //       }, 3000);
      //   })
      // } 
    }
  }
</script>

<style>
  @import './common/css/reset.css'
</style>


