<template> 
  <section class="comSum">
      <header>
        <div class="clearfix">
            <i class="topHeader"></i>
            <span>待发货</span>
        </div>
      </header>
      <section class="mt">
        <location></location>
        <productNum :productData="orderDetail"></productNum>
        <div class="bg" v-show="orderDetail.remark != ''&& orderDetail.remark != null">
            <div class="tellWords">
                <span>买家留言</span>
                <input v-model="orderDetail.remark"></input>
            </div>
        </div>
        <detail :detailData="orderDetail"></detail>
            <div class="returnBtn" @click="toApply" v-show="productChild.isSaleAfter == 0">
                <a href="javascript:;">申请退款</a>
            </div>
      </section>
  </section>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
    } 
    header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 88/200/1.17rem;
        line-height: 88/200/1.17rem;
        background: #3c3c42;
        div{
            height: 88/200/1.17rem;
            color: #fff;
            font-size: 26/200/1.17rem;
            .topHeader{
                display: block;
                width: 33/200/1.17rem;
                height: 33/200/1.17rem;
                margin: 27.5/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
                float: left;
                background: url(../../../common/imgs/wait-time.png) no-repeat center;
                background-size: 100%;
            }
            span{
                float: left;
            }
            .rest-timer{
                margin-left: 100/200/1.17rem;
            }
        }
    }
    .m20{
        margin-top: 20/200/1.17rem;
    }
    .comSum{
        background: #f4f4f4;
    }
        .tellWords{
            margin-bottom: 20/200/1.17rem;
            background: #fff;
            font-size: 24/200/1.17rem;
            color: #666;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-top: 1px solid #e9e9e9;
            margin-left: 30/200/1.17rem;
        }
        .tellWords input{
            border: none;
            height: 100%;
            font-size: 26/200/1.17rem;
            color: #333;
            padding-left: 30/200/1.17rem;
        }
    .returnBtn{
        width: 100%;
        float: left;
        margin-bottom: 200/200/1.17rem;
        a{
            display: block;
            width: 90%;
            height: 66/200/1.17rem;
            line-height: 66/200/1.17rem;
            border: 1px solid #999999;
            border-radius: 5px;
            text-align: center;
            font-size: 28/200/1.17rem;
            color: #333;
            margin-left: 40/200/1.17rem;
        }
    }
    .mt{
        margin-top: 88/200/1.17rem;
    }
</style>
<script>
    import productNum from './productNum.vue'
    import location from './location.vue'
    import detail from './detail.vue'
    export default {
        components:{
            productNum,
            location,
            detail
        },
        data(){
            return{
                productChild:[],
                timer: '',
                orderData:"",  
                orderDetail:{},
                dealTimer:{
                    m:0,
                    s:0
                },
            }
        },
        methods:{
             timerDetail() {
                
                Date.prototype.format = function (format) {
                    let date = {
                        "M+": this.getMonth() + 1,
                        "d+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        "S+": this.getMilliseconds()
                    };
                    if (/(y+)/i.test(format)) {
                        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                    }
                    for (var k in date) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                        }
                    }
                    return format;
                }
        },
        toApply(){
            var orderId = this.$route.query.id
            this.$router.push({name: 'comeApply', query:{orderId: orderId}})
        }
        
    },
    created(){
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                var orderDetail = JSON.parse(res.bodyText).order
                    this.orderDetail = orderDetail
                    var productChild = orderDetail.childList[0]
                    this.timerDetail();
            }).catch((res)=>{

            })
            document.body.style.backgroundColor = "#fff";
            document.body.style.paddingBottom = "1.0/1.17rem";
            document.title = "待发货"
            
        }
}
</script>