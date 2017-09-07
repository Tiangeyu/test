<template>
  <div class="apply-parent">
    <header>
        <div :class="{avtive: isShow}"><p @click="applyFor">售后申请</p></div><div :class="{avtive: !isShow}"><p @click="applyRecord">申请记录</p></div>
    </header>
    <section class="apply" v-show="isShow">    
       <!--申请售后-->
       <applyorder  v-for="(item,index) in applayPageList" :key="index" class="item" :applyData="item"></applyorder>
       <img class="information" v-show="imgShow" src="../../common/imgs/noApply.png"/>
    </section>
    
    <section class="recorded" v-show="!isShow">
        <!--申请售后-->
       <apply-record  v-for="(item,index) in applyRecordList" :key="index" class="item" :applyData="item"></apply-record>
       <img class="information" v-show="imgShow1" src="../../common/imgs/noApply.png"/>
    </section>
    <alert-c :title="title" v-show="isShowC"></alert-c>
  </div>
</template>

<style lang="less" scoped>
    .apply-parent{
        header{
            height: 70/200/1.17rem;
            background-color: #fff;
            font-size: 28/200/1.17rem;   
            display: flex;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            div{
                flex: 1;
                p{
                    box-sizing: border-box;
                    width: 140/200/1.17rem;
                    margin: 0 auto;
                    height: 100%;
                    line-height: 70/200/1.17rem;
                    color: #333;
                    text-align: center;
                }
            }
            .avtive p{
                color: #b8a47f;
                border-bottom: 2px solid #b8a47f;
            }
        }
    }
    .apply,.recorded{
        margin-top: 90/200/1.17rem;
    }
    
    .information{
        height: 248/200/1.17rem;
        width: 166/200/1.17rem;
        position: fixed;
        left: 50%;
        top: 20%;
        margin-left: -166/400/1.17rem;
    }
</style>


<script>
    import alertC from '../../components/alertC.vue'
    import applyorder from './applyOrder.vue'
    import applyRecord from './applyRecord.vue'
    export default{
        components:{
            applyorder,
            applyRecord,
            alertC
        },
        data(){
            return{
                isShow: true,
                applayPageList:[],
                applyRecordList:[],
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
                picUrl: window.sessionStorage.getItem('picUrl'),
                imgShow: true,
                imgShow1: false,
                title: '',
                isShowC: false
            }
        },
        methods:{       
            applyFor() {
                this.isShow = true;
                if(this.applayPageList.length == 0){
                    this.$http.get('/eb-wxshop/wxshop/order/listPaidOrders?&numPerPage=20&pageNum=1',{params:{customerId: this.wxCustomerId}}).then((res) => {
                    // console.log(res.body.orders) 
                        this.applayPageList = res.body.orders; 
                        if(res.body.orders.length == 0){
                            this.imgShow = true;
                        }else{
                            this.imgShow = false;
                        }      
                    }, function(res){
                        // alert("申请退款服务数据请求失败")
                        this.title = "申请退款服务数据请求失败"
                        this.isShowC = !this.isShowC
                        var that = this
                        setTimeout(function() {
                            that.isShowC = !that.isShowC
                        }, 3000);

                    })
                }
            },
            applyRecord() {
                this.isShow = false;
                if(this.applyRecordList.length == 0){
                      this.$http.get('/eb-wxshop/wxshop/order/listRefundOrders?&numPerPage=20&pageNum=1',{params:{customerId: this.wxCustomerId}}).then((res) => {
                      //  console.log(res.body.orders) 
                        this.applyRecordList = res.body.orders; 
                        if(res.body.orders.length == 0){
                            this.imgShow1 = true;
                        }else{
                            this.imgShow1 = false;
                        } 
                    },function(res){
                        // alert("申请记录服务数据请求失败")
                        this.title = "申请退款服务数据请求失败"
                        this.isShowC = !this.isShowC
                        var that = this
                        setTimeout(function() {
                            that.isShowC = !that.isShowC
                        }, 3000);
                    })
                }
            }
        },

        created() {
            document.body.style.backgroundColor = "#f4f4f4";
            document.title = "申请售后";
            
            this.$http.get('/eb-wxshop/wxshop/order/listPaidOrders?&numPerPage=20&pageNum=1',{params:{customerId: this.wxCustomerId}}).then((res) => {
            //    console.log(res.body.orders) 
            
                this.applayPageList = res.body.orders; 
                if(res.body.orders.length == 0){
                    this.imgShow = true;
                }else{
                      this.imgShow = false;
                }       
            },(res)=>{
                this.title = "申请退款服务数据请求失败"
                this.isShowC = !this.isShowC
                var that = this
                setTimeout(function() {
                    that.isShowC = !that.isShowC
                }, 3000);
            })
        }
    }
</script>
