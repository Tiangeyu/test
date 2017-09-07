<template>
    <div class="bg" v-show="childCom.isShow">
        <div class="choice_box clearfix">
            <div class="info">
                <div class="pic">
                    <!-- <img src="../../common/imgs/select_product_pic.png"> -->
                    <img :src="imgSrc">
                </div>
                <i class="close clearfix" @click="close"></i>
                <div class="fl content">
                    <p class="title">{{productTitle}}</p>
                    <!-- <P class="zero_count"><i>{{zero_count}}</i>件包邮</P> -->
                    <p class="price">￥<i>{{unitPrice}}</i></p>
                </div>
            </div>
            <div class="choice">
                <!-- <div class="size">
                    <p>规格</p>
                    <ul class="clearfix">
                        <li v-for="(item,index) in sizes" class="fl" @click="selected(index,item)" :class="{selected: index === activeI}" :key="index">
                            {{item}}
                        </li> 
                    </ul>
                </div> -->
                <div class="num_count clearfix">
                    <div class="fl">
                        <!-- <p class="buy_num">购买数量（每人限购<i>{{buy_num}}</i>件）</p> -->
                        <p class="buy_num">购买数量</p>
                    <p class="rest_num">剩余<i>{{quantity}}</i>件</p>
                    </div>
                    <div class="num clearfix fr">
                        <i class="fl" @click='reduce()'>-</i>
                        <p class="fl">{{inputVal}}</p>
                        <i class="fl" @click='add()'>+</i>
                    </div>
                </div>
            </div>
            <div class="footer clearfix">
                <div>
                    <!-- <router-link to="/"> -->
                        <p class="fl add_into_cart" @click="addIntoCart">加入购物车</p>
                    <!-- </router-link>
                    <router-link to="/"> -->
                        <p class="fl buy_now" @click="buyNow">立即购买</p>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
        <alert-c :title="title" v-show="isShow"></alert-c>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        z-index: 999;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .choice_box{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        .info{
            margin-left: 30/200/1.17rem;
            height: 206/200/1.17rem;
            width: 100%;
            padding-bottom: 0/200/1.17rem;
            border-bottom: 2/200/1.17rem solid #e9e9e9;
            .pic{
                width: 214/200/1.17rem;
                height: 214/200/1.17rem;
                position: absolute;
                top: -40/200/1.17rem;
                left: 30/200/1.17rem;
                border: 1/200/1.17rem solid #eee;
                background: #fff;
                img{
                    width: 206/200/1.17rem;
                    height: 206/200/1.17rem;
                    margin-left: 4/200/1.17rem;
                    margin-top: 4/200/1.17rem;
                }
            }
            .content{
                margin-left: 244/200/1.17rem;
                .title{
                    width: 400/200/1.17rem;
                    font-size: 30/200/1.17rem;
                    color: #454545;
                    margin-top: 30/200/1.17rem;
                    line-height: 40/200/1.17rem;
                }
                .zero_count{
                    font-size: 24/200/1.17rem;
                    color: #666;
                    margin-top: 10/200/1.17rem;
                }
                .price{
                    font-size: 36/200/1.17rem;
                    color: #e93b39;
                    margin-top: 20/200/1.17rem;
                }
            }
            .close{
                width: 32/200/1.17rem;
                height: 32/200/1.17rem;
                background: url(../../common/imgs/close_circle.png);
                background-size: 100%;
                position: absolute;
                top: 30/200/1.17rem;
                right: 30/200/1.17rem;
            }
        }
        .choice{
            margin-left: 30/200/1.17rem;
            margin-bottom: 200/200/1.17rem;
            .size{
                border-bottom: 2/200/1.17rem solid #e1e1e1;
                p{
                    font-size: 26/200/1.17rem;
                    color: #333;
                    margin-top: 30/200/1.17rem;
                }
                ul{
                    height: 64/200/1.17rem;
                    margin-top: 20/200/1.17rem;
                    margin-bottom: 30/200/1.17rem;
                    li{
                        width: 130/200/1.17rem;
                        height: 64/200/1.17rem;
                        line-height: 64/200/1.17rem;
                        text-align: center;
                        border: 2/200/1.17rem solid #333;
                        border-radius: 4/200/1.17rem;
                        margin-right: 30/200/1.17rem;
                    }
                    .selected{
                        background: #b8a57f;
                        border: none;
                        width: 134/200/1.17rem;
                        height: 68/200/1.17rem;
                    }
                }
            }
            .num_count{
                border-bottom: 2/200/1.17rem solid #e1e1e1;
                .buy_num{
                    font-size: 28/200/1.17rem;
                    color: #333;
                    margin-top: 30/200/1.17rem;
                }
                .rest_num{
                    font-size: 22/200/1.17rem;
                    color: #666;
                    margin-top: 10/200/1.17rem;
                    margin-bottom: 30/200/1.17rem;
                }
            }
            .num{
                position: relative;
                top: 27/200/1.17rem;
                right: 30/200/1.17rem;
                width: 240/200/1.17rem;
                height: 68/200/1.17rem;
                border: 2/200/1.17rem solid #e9e9e9; 
                border-radius: 8/200/1.17rem;
                // margin-top: 27/200/1.17rem;
                i{
                    width: 70/200/1.17rem;
                    line-height: 64/200/1.17rem;
                    font-size:44/200/1.17rem;
                    text-align: center;
                    color: #999;
                }
                i:last-child{
                    margin-left: 100/200/1.17rem;
                }
                p{
                    position: absolute;
                    left: 68/200/1.17rem;
                    top: -2/200/1.17rem;
                    width: 96/200/1.17rem;
                    text-align: center;
                    line-height: 64/200/1.17rem;
                    height: 68/200/1.17rem;
                    border: 2/200/1.17rem solid #333;
                    border-radius: 4/200/1.17rem;
                    font-size: 24/200/1.17rem;
                    color: #333;
                }
            }
        }
        .footer{
            text-align: center;
            width: 100%;
            // width: 670/200/1.17rem;
            height: 104/200/1.17rem;
            line-height: 104/200/1.17rem;
            border-top: 2/200/1.17rem solid #e1e1e1;
            div{
                margin: 0 auto;
                width: 650/200/1.17rem;
                margin-top: 7/200/1.17rem;
                .add_into_cart{
                    width: 325/200/1.17rem;
                    height: 90/200/1.17rem;
                    line-height: 90/200/1.17rem;
                    background: #1a191e;
                    font-size: 34/200/1.17rem;
                    color: #fff;
                    border-radius: 4/200/1.17rem 0 0 4/200/1.17rem;
                    // margin-left: 50/200/1.17rem;
                    // margin-top: 7/200/1.17rem;
                }
                .buy_now{
                    width: 325/200/1.17rem;
                    height: 90/200/1.17rem;
                    line-height: 90/200/1.17rem;
                    background: #e93b39;
                    font-size: 34/200/1.17rem;
                    color: #fff;
                    border-radius: 0 4/200/1.17rem 4/200/1.17rem 0;
                    // margin-right: 20/200/1.17rem;
                    // margin-top: 7/200/1.17rem;
                }
            }
        }
    }
</style>
<script>
    import alertC from '../../components/alertC.vue'
    export default {
        props:['childCom'],
        components:{
            alertC
        },
        data(){
            return{
                productId:"",
                // sizes:['2.6寸','2.7寸','2.8寸'],
                isSelected:false,
                buy_num:5,
                quantity:1200,
                imgSrc:"",
                productTitle:"",
                zero_count:10,
                unitPrice:"",
                listPrice:"",
                inputVal:1,
                activeI:-1,
                storeData:{
                    type: "",
                    num: ""
                },
                productDes:"",
                storeName:"",
                title:"",
                isShow:false,
                shoppingId: 0,
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
                imageUrl:""
            }
        },
        methods:{
            reduce(){
                if(this.inputVal<=1){
                    this.inputVal=1;
                    return;
                }
                this.inputVal=this.inputVal-1;
            },
            add(){
                this.inputVal=this.inputVal+1;
            },
            selected(index,item){
            
                if(this.activeI == index) {
                    this.activeI = -1;
                }else{
                    this.activeI = index;
                    this.storeData.type = item;           
                }
            },
            addIntoCart(){
                // if(this.storeData.type == ''){
                //     alert("请选择规格")
                // }else{
                //     this.storeData.num = this.inputVal;
                //     console.log(this.storeData.type + ";" + this.storeData.num)
                // }
                this.storeData.num = this.inputVal;
                // console.log("customerId:"+this.wxCustomerId+"productId:"+this.productId+"shoppingId:"+this.shoppingId+
                // "num:"+this.inputVal+"listPrice:"+this.listPrice+"productPrice:"+this.unitPrice+"productDes:"+this.productDes+
                // "storeName:"+this.storeName+"imageUrl:"+this.picUrl)
                this.$http.post("/eb-wxshop/wxshop/customer/saveShopCar",{customerId:this.wxCustomerId,productId:this.productId,shoppingId:this.shoppingId,num:this.inputVal,listPrice:this.listPrice,productPrice:this.unitPrice,productDes:this.productDes,storeName:this.storeName,imageUrl:this.imageUrl,productName:this.productTitle},{emulateJSON: true}).then(function(res){
                    var back = JSON.parse(res.bodyText);
                    console.log(back);
                    if(back.result == "000"){
                        this.title = "商品已成功添加到购物车";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            that.$emit('hideBlock');
                            that.$emit('numRefresh');
                            // that.$router.push("/user")
                        }, 2000);
                    }else{
                        this.title = "添加失败";
                        // this.title = back.resultMsg;
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            //that.$emit('hideBlock');
                            // that.$router.push("/user")
                        }, 2000);
                    }
                    // console.log(this.productId+"@@@"+this.listPrice+"@@@"+this.inputVal+"@@@"+this.unitPrice+"@@@"+this.productDes+"@@@"+this.storeName)
                },function(){
                    console.log('失败')
                })
            },
            buyNow() {
                // if(this.storeData.type == ''){
                //     alert("请选择规格")
                // }else{
                //     this.storeData.num = this.inputVal;
                //     console.log(this.storeData.type + ";" + this.storeData.num)
                // }
                this.storeData.num = this.inputVal;
                this.$router.push({ path:'orderDetail', query: {productId:this.productId, numbers: this.storeData.num ,shoppingId:this.shoppingId}})
            },
            close(){
                // porps:['childCom']
                // this.$emit('isShow',0);
                this.$emit('hideBlock');
                
            }
        },
        created(){
            // var that = this;
            this.productId = this.$route.query.productId;
            this.shoppingId = this.$route.query.shoppingId;
            this.$http.get("/eb-wxshop/wxshop/product/getProductDetail",{params:{productId:this.productId}},{emulateJSON: true}).then(function(res){
                var product = JSON.parse(res.bodyText);
                this.listPrice = product.product.listPrice;
                this.unitPrice = product.product.unitPrice;
                this.productTitle = product.product.name;
                this.imgSrc = this.picUrl+product.product.bigPicture;
                this.productId = product.product.id;
                this.productDes = product.product.description;
                this.storeName = product.product.storeName;
                this.quantity = product.product.quantity;
                this.imageUrl = product.product.centerPicture;
                // this.product_org_price = product.product.listPrice;
            })
        }
    }
</script>


