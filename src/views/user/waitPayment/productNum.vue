<template>
  <section class="product">
      <ul class="clearfix">
          <li class="shopHead">
              <i class="userH" ></i>
              <span>{{productData.storeName}}</span>
              <a href="javascript:;" @click="isShow=!isShow">联系商家</a>
          </li>
          <!--v-for="item in productChild"-->
          <li class="productInfo" v-for="item in productChild">
              <div class="boxPic">
                <i class="productPic" :style="{backgroundImage:'url('+picUrl +item.centerImage+')'}"></i>
              </div>
              <div class="detail">
                <dl>
                  <dt>{{item.productName}}</dt>
                  <dd>
                      <span>数量 :</span>
                      <span>X {{item.quantity}}</span>
                  </dd>
                  <dd>
                      <span class="realPay">￥{{item.unitPrice}}</span>
                  </dd>
              </dl>
              </div>
          </li>
      </ul>
        <div class="alertA" v-show="isShow">
            <div class="al-block">
                <h3><a :href="'tel:'+serveNum">拨打商家电话{{serveNum}}</a></h3>
                <div class="al-button clearfix">
                    <button class="fr" @click="isShow=!isShow">关闭</button>
                </div>
            </div>
        </div>
  </section>
</template>
<style lang="less" scoped>
    .product{
        margin-top: 20/200/1.17rem;
        background: #fff;
        ul{
            margin-left: 25/200/1.17rem;
            .shopHead{
                height: 70/200/1.17rem;
                line-height: 70/200/1.17rem;
                border-bottom: 1px solid #e9e9e9;
                font-size: 26/200/1.17rem;
                color: #454545;
                .userH{
                    display: block;
                    width: 40/200/1.17rem;
                    height: 40/200/1.17rem;
                    background: url(../../../common/imgs/wait-panda.png) no-repeat center;
                    background-size: 100%;
                    float: left;
                    margin: 15/200/1.17rem 20/200/1.17rem 0 5/200/1.17rem;
                }
                a{
                    color: #b8a47f;
                    font-size: 26/200/1.17rem;
                    border-radius: 2px;
                    display: block;
                    float: right;
                    width: 160/200/1.17rem;
                    height: 40/200/1.17rem;
                    line-height: 40/200/1.17rem;
                    text-align: center;
                    margin: 14/200/1.17rem 20/200/1.17rem 0 0;
                    border: 1px solid #b8a47f;
                }
            }
            .productInfo{
                // height: 188/200/1.17rem;
                color: #454545;
                .boxPic{
                    width: 25%;
                    .productPic{
                        display: block;
                        width: 146/200/1.17rem;
                        height: 146/200/1.17rem;
                        background: url(../../../common/imgs/wait-box.png) no-repeat center;
                        background-size: 100%;
                        float: left;
                        margin: 21/200/1.17rem 25/200/1.17rem 0 5/200/1.17rem;
                        border-radius: 5px;
                    }
                }
                .detail{
                    float: left;
                    margin-bottom: 20/200/1.17rem; 
                    // height: 188/200/1.17rem;
                    width: 73%;
                    dt{
                        margin-top: 30/200/1.17rem;
                        font-size: 28/200/1.17rem;
                    }
                    dd{
                        margin-top: 20/200/1.17rem;
                        font-size: 24/200/1.17rem;
                        color: #333;
                        span:nth-child(2){
                            float: right;
                            margin-right: 20/200/1.17rem;
                        }
                    }
                    .realPay{
                        margin-top: 20/200/1.17rem;
                        font-size: 28/200/1.17rem;
                        color: #e93b39;
                    }
                }
                
            }
        }
    }
     .alertA{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.3);
        .al-block{
            width: 580/200/1.17rem;
            height: 400/200/1.17rem;
            background: #fff;
            border-radius: 20/200/1.17rem; 
            margin: 0 auto;
            margin-top: 25vh;
        }
        h3{
            padding-top: 90/200/1.17rem;
            font-size: 32/200/1.17rem;
            color: #333;
            text-align: center;
        }
        .al-button{
            margin-top: 120/200/1.17rem;
            margin-left: 70/200/1.17rem;   
            button{
                background: #e93b39;
                width: 190/200/1.17rem;
                height: 80/200/1.17rem;
                font-size: 35/200/1.17rem;
                line-height: 80/200/1.17rem;
                text-align: center;
                margin-right: 200/200/1.17rem;
                color: #fff;
            }
           
        }
    }
</style>
<script>
    // import Clipboard from 'clipboard'
    // new Clipboard('.btn');
    export default {
        components:{
            
        },
        data(){
            return{
                picUrl:window.sessionStorage.getItem('picUrl'),
                productData:'',
                showPhone:false,
                productChild:'',
                productImage:'',
                storeInfo:[],
                isShow:false,
                productChild:[],
                storeId:'',
                serveNum:""
            }
        },
        methods:{
            okEnter(){
                this.$emit("isOk")
            }
        },
        created(){
            var storeId = '';
            var orderId = this.$route.query.id;
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                
                if(res.body.result =='000'){
                    var productData = JSON.parse(res.bodyText).order
                    this.productData = productData
                    storeId = productData.storeId
                    var productChild = productData.childList
                    this.productChild = productChild
                    // var productImage = this.picUrl + this.productChild.centerImage
                    // this.productImage = productImage
                    this.$http.get('/eb-wxshop/wxshop/customer/servicePhone',{params:{storeId:storeId}}).then((responce)=>{
                        if(responce.body.result=='000'){
                            var serveNum = responce.body.servicePhone
                            this.serveNum = serveNum
                        }else{
                            alert(responce.body.resultMsg)
                        }
                    }).catch((responce)=>{

                    })
                }else{
                    alert(responce.body.resultMsg)
                }
                
            }).catch((res)=>{

            })
            
        },
    }
</script>
