<template>
    <div class="order-body">
        <p class="line-through"></p>
        <router-link :to="{name: 'address', query: queryData}" style="display: block">
            <ul class="order-content">
                <li class="address-logo"></li>
                <li class="address-detail">
                    <p class="p1 clearfix">
                        <span class="fl">收货人: {{addressName}}</span>
                        <span class="fr">{{mobile}}</span>
                    </p>
                    <p class="p2">收货地址: {{address}}</p>
                </li>
                <li class="address-go"></li>
            </ul>
        </router-link>
        <p class="line-through"></p>

        <!-- 多商户 购物车跳转过来  -->
        <div v-if="tatalShow">
            <section class="order-tro" v-for="(item, index) in orderData" :key="index">
                <nav>{{item.storeName}}</nav>
                <div class="productInfo clearfix" v-for="(it, i) in item.shopCarList" :key="i">
                    <div class="fl picInfo" :style="{backgroundImage:'url('+picUrl+it.imageUrl+')'}"></div>
                   
                    <div class="fl proName">
                        <h3>{{it.productName}}</h3>
                        <h5>￥{{it.productPrice}}</h5>
                    </div>
                    <div class="fr proNum">X {{it.num}}</div>
                </div>
                <div class="distribute clearfix">
                    <span class="fl">配送方式</span>
                    <span class="fr">{{distribution}}</span>
                </div>
                <div class="tellWords">
                    <span class="fl">卖家留言</span>
                    <input class="fr" v-model="tellWord[index]" placeholder="点击给商家留言">
                </div>
                <div class="totals">
                    <font class="totals-first">共{{numsList[index]}}件商品</font>
                    <font>合计</font>
                    <font class="totals-second">￥{{pricesList[index]}}</font>
                </div>
                <p class="line-through"></p>
            </section>
        </div>

        <!-- 从商品详情跳转过来  -->
        <section class="order-tro" v-else>
            <nav>{{orderOne.storeName}}</nav>
            <div class="productInfo clearfix">
                <div class="fl picInfo" :style="{backgroundImage:'url(' + picUrl + orderOne.bigPicture+')'}"></div>
               
                <div class="fl proName">
                    <h3>{{orderOne.name}}</h3>
                    <h5>￥{{this.shoppingPrice}}</h5>
                </div>

                <div class="fr proNum">X {{this.$route.query.numbers}}</div>         
            </div>
            <div class="distribute clearfix">
                <span class="fl">配送方式</span>
                <span class="fr">{{distribution}}</span>
            </div>
            <div class="tellWords">
                <span class="fl">卖家留言</span>
                <input class="fr" v-model="orderOneTellWord" placeholder="点击给商家留言">
            </div>
            <div class="totals">
                <font class="totals-first">共{{this.$route.query.numbers}}件商品</font>
                <font>合计</font>
                <font class="totals-second">￥{{(this.$route.query.numbers * this.shoppingPrice).toFixed(2)}}</font>
            </div>
            <p class="line-through"></p>
        </section>
        <router-link to="/" style="display: block">
            <div class="favorable clearfix">
                <span class="fl">优惠券</span>
                <i class="fr"></i>
            </div>
        </router-link>
        <p class="line-through"></p>
        <ul class="order-price">
            <li class="clearfix">
                <span class="fl">商品金额</span>
                <font class="fr">￥{{priceTotals}}</font>
            </li>
            <li class="clearfix">
                <span class="fl">优惠</span>
                <font class="fr">-￥{{Losepirce}}.00</font>
            </li>
            <li class="clearfix">
                <span class="fl">运费(免运费)</span>
                <font class="fr">+￥{{Addpirce}}.00</font>
            </li>
        </ul>
    
        <footer class="clearfix">
            <div class="fl">
                <h6>实付款:
                    <font>￥{{priceTotals}}</font>
                </h6>
                <p>优惠金额:￥{{computePrice}}</p>
            </div>
            <button class="fr" @click="present">提交订单</button>
        </footer>
        <alert-c :title="title" v-show="isShow"></alert-c>
    </div>
</template>

<style lang="less" scoped>
.order-body {
    padding-bottom: 124/200/1.17rem;
    .line-through {
        height: 20/200/1.17rem;
        background: #f4f4f4;
    }
    .order-content {
        background: #fff;
        font-size: 26/200/1.17rem;
        color: #666;
        height: 140/200/1.17rem;
        display: flex;
        .address-logo {
            margin-left: 24/200/1.17rem;
            width: 26/200/1.17rem;
            height: 100%;
            margin-right: 30/200/1.17rem;
            background: url('../../common/imgs/order-addressLogo.png') no-repeat left center;
            background-size: 100%;
        }
        .address-detail {
            width: 596/200/1.17rem;
            height: 100%;
            .p1 {
                padding-top: 30/200/1.17rem;
                .fr {
                    padding-top: 4/200/1.17rem;
                }
            }
            .p2 {
                line-height: 35/200/1.17rem;
                padding-top: 10/200/1.17rem;
            }
        }
        .address-go {
            margin-left: 40/200/1.17rem;
            width: 13/200/1.17rem;
            height: 100%;
            background: url('../../common/imgs/right_arrow.png') no-repeat left center;
            background-size: 100%;
        }
    }
    .order-tro {
        background: #fff;
        nav {
            height: 70/200/1.17rem;
            font-size: 28/200/1.17rem;
            line-height: 70/200/1.17rem;
            color: #333;
            padding-left: 30/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
        }
        .productInfo {
            padding: 0 24/200/1.17rem;
            height: 190/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
            .picInfo {
                margin-top: 20/200/1.17rem;
                width: 150/200/1.17rem;
                height: 150/200/1.17rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .proName {
                padding-left: 30/200/1.17rem;
                padding-top: 34/200/1.17rem;
                max-width: 400/200/1.17rem;
                h3 {
                    font-size: 28/200/1.17rem;
                    color: #454545;
                }
                h5 {
                    padding-top: 20/200/1.17rem;
                    color: #e93839;
                    font-size: 30/200/1.17rem
                }           
            }
            .proNum {
                padding-top: 80/200/1.17rem;
                padding-right: 4/200/1.17rem;
                font-size: 30/200/1.17rem;
                color: #333;
            }
        }
        .distribute,
        .tellWords,
        .totals {
            padding: 0 20/200/1.17rem;
            font-size: 30/200/1.17rem;
            color: #333;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
        }
        .tellWords input {
            border: none;
            height: 100%;
            font-size: 28/200/1.17rem;
            color: #999;
            padding-left: 30/200/1.17rem;
            text-align: right;
        }
        .totals {
            text-align: right;
            border: 0;
            .totals-first {
                padding-right: 54/200/1.17rem;
            }
            .totals-second {
                font-size: 32/200/1.17rem;
                color: #e93839;
                padding-right: 4/200/1.17rem;
            }
        }
    }
    .favorable {
        padding: 0 20/200/1.17rem;
        font-size: 30/200/1.17rem;
        color: #333;
        height: 88/200/1.17rem;
        line-height: 88/200/1.17rem;
        background: #fff;
        .fr {
            width: 13/200/1.17rem;
            height: 100%;
            background: url('../../common/imgs/right_arrow.png') no-repeat left center;
            background-size: 100%;
        }
    }
    .order-price {
        background-color: #fff;
        height: 310/200/1.17rem;
        padding: 0 24/200/1.17rem;
        li {
            padding-top: 30/200/1.17rem;
            span {
                font-size: 30/200/1.17rem;
                color: #333;
            }
            font {
                font-size: 32/200/1.17rem;
                color: #e93839;
            }
        }
    }

    footer {
        height: 104/200/1.17rem;
        border-top: 1px solid #e9e9e9;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        .fl {
            padding-top: 20/200/1.17rem;
            padding-left: 24/200/1.17rem;
            h6 {
                font-size: 32/200/1.17rem;
                color: #333;
                font {
                    color: #e93839;
                    padding-left: 32/200/1.17rem;
                }
            }
            p {
                padding-top: 10/200/1.17rem;
                font-size: 24/200/1.17rem;
                color: #666;
            }
        }
        .fr {
            margin-right: 20/200/1.17rem;
            background: #e93839;
            width: 270/200/1.17rem;
            height: 89/200/1.17rem;
            line-height: 89/200/1.17rem;
            color: #fff;
            border-radius: 5/200/1.17rem;
            margin-top: 8/200/1.17rem;
            font-size: 34/200/1.17rem;
        }
    }
}
</style>
<script>
import alertC from '../../components/alertC.vue'
export default {
    components: {
        alertC
    },
    data() {
        return {
            distribution: '免运费',
            tellWord: [],
            Losepirce: 0,
            Addpirce: 0,
            computePrice: 0,
            orderData: [],
            address: "",
            addressName: "",
            mobile: "",
            tatalShow: true,
            orderOne: {},
            orderOneTellWord: "",
            title: "",
            isShow: false,
            wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
            picUrl: window.sessionStorage.getItem('picUrl'),
            queryData: this.$route.query,
            shoppingPrice:''
        }
    },
    methods: {
        /*
            提交订单接口
        */  
        present() {

            let that = this;
            if (this.address == "") {
                this.title = "请选择地址"
                this.isShow = !this.isShow;
                setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 3000);
                return
            }
            if (this.tatalShow) {
                /*
                    从购物车进来
                */  
                let objArr = [];
                let obj = {}
                for (let i = 0; i < this.orderData.length; i++) {
                    obj = {};
                    obj.address = this.address;
                    obj.contact = this.addressName;
                    obj.contactPhone = this.mobile;
                    obj.concessionsAmount = 0.00;
                    obj.customerId = this.wxCustomerId;
                    obj.customerName = window.sessionStorage.getItem('customerName');
                    obj.gathering = this.pricesList[i];
                    obj.productCost = this.pricesList[i];
                    obj.remark = this.tellWord[i];
                    obj.storeId = this.orderData[i].storeId;
                    obj.storeName = this.orderData[i].storeName;
                    obj.totalCost = this.pricesList[i];
                    obj.shoppingId = this.$route.query.shoppingId;
                    obj.childList = [];
                    for (let j = 0; j < this.orderData[i].shopCarList.length; j++) {
                        obj.childList[j] = {};
                        obj.childList[j].basePrice = this.orderData[i].shopCarList[j].listPrice;
                        obj.childList[j].bigImage = this.orderData[i].shopCarList[j].imageUrl;
                        obj.childList[j].centerImage = this.orderData[i].shopCarList[j].imageUrl;
                        obj.childList[j].smallImage = this.orderData[i].shopCarList[j].imageUrl;
                        obj.childList[j].productId = this.orderData[i].shopCarList[j].productId;
                        obj.childList[j].productName = this.orderData[i].shopCarList[j].productName;
                        obj.childList[j].quantity = this.orderData[i].shopCarList[j].num;
                        obj.childList[j].unitPrice = this.orderData[i].shopCarList[j].productPrice;
                    }
                    objArr.push(obj)
                }
                /*
                    保存订单
                */ 
                this.$http.get('/eb-wxshop/wxshop/order/saveOrder', { params: { orderInfos: JSON.stringify(objArr) } }).then(function (res) {
                    if (res.body.result == "000") {
                        let orderParentNo = res.body.orderParentNo;
                        let orderId = res.body.orderId;
                        /*
                            删除购物车商品(从购物车跳转过来的才有)
                        */ 
                        this.$http.get('/eb-wxshop/wxshop/customer/batchDelShopCar', { params: { ids: this.$route.query.ids } }).then((resp) => {
                            if (resp.body.result == "000") {
                                /*
                                    获取支付页面
                                */ 
                                 window.location.href = "../smallShop/pay.html?orderAmount="+this.priceTotals+"&bussOrderNo="+ orderParentNo+"&orderIdList="+orderId;
                                // this.$http.get('/eb-wxshop/wxshop/order/prePayment', { params: { orderAmount: this.priceTotals, bussOrderNo: orderParentNo } }).then((respon) => {
                                    //     if (respon.body.result == "000") {
                                    //         this.title = "正在跳转支付页面"
                                    //     } else {
                                    //         this.title = "跳转失败"
                                    //     }
                                    //     this.isShow = !this.isShow;
                                    //     setTimeout(function () {
                                    //         if (that.title == "正在跳转支付页面") {
                                    //             that.$router.push({ name: 'pay', query: { ifUrl: respon.body.showPage } });
                                    //         }
                                    //         that.isShow = !that.isShow;
                                    //     }, 3000);

                                    // }, () => {
                                    //     this.title = "跳转服务器失效"
                                    //     this.isShow = !this.isShow;
                                    //     setTimeout(function () {
                                    //         that.isShow = !that.isShow;
                                    //     }, 3000);
                                // })
                            } else {
                                this.title = "删除购物车失败"
                                this.isShow = !this.isShow;
                                setTimeout(function () {
                                    that.isShow = !that.isShow;
                                }, 3000);
                            }
                        }, (res) => {
                            this.title = "批量删除服务请求失败"
                            this.isShow = !this.isShow;
                            setTimeout(function () {
                                that.isShow = !that.isShow;
                            }, 3000);
                        })
                    } else {
                        this.title = "保存订单失败"
                        this.isShow = !this.isShow;
                        setTimeout(function () {
                            that.isShow = !that.isShow;
                        }, 3000);
                    }
                }, function (res) {
                    this.title = "保存订单服务器异常"
                    this.isShow = !this.isShow;
                    setTimeout(function () {
                        that.isShow = !that.isShow;
                    }, 3000);
                })
            } else {
                /*  
                    从商品详情进来
                */ 
                let objArr = [];
                let obj = {};
                obj.address = this.address
                obj.contact = this.addressName
                obj.contactPhone = this.mobile
                obj.concessionsAmount = 0.00
                obj.customerId = this.wxCustomerId
                obj.customerName = window.sessionStorage.getItem('customerName');
                obj.gathering = this.priceTotals;
                obj.productCost = this.priceTotals;
                obj.remark = this.orderOneTellWord;
                obj.storeId = this.orderOne.storeId;
                obj.storeName = this.orderOne.storeName;
                obj.totalCost = this.priceTotals;
                obj.childList = [];
                obj.childList[0] = {};
                obj.childList[0].basePrice = this.orderOne.listPrice;
                obj.childList[0].bigImage = this.orderOne.bigPicture;
                obj.childList[0].centerImage = this.orderOne.centerPicture;
                obj.childList[0].smallImage = this.orderOne.smallPicture;
                obj.childList[0].productId = this.orderOne.id;
                obj.childList[0].productName = this.orderOne.name;
                obj.childList[0].quantity = this.$route.query.numbers;
                obj.childList[0].unitPrice = this.shoppingPrice;
                obj.shoppingId = this.$route.query.shoppingId;
                objArr.push(obj);
                this.$http.get('/eb-wxshop/wxshop/order/saveOrder', { params: { orderInfos: JSON.stringify(objArr) } }).then(function (res) {
                    if (res.body.result == "000") {
                        let orderParentNo = res.body.orderParentNo;
                        let orderId = res.body.orderId;
                        window.location.href = "../smallShop/pay.html?orderAmount="+this.priceTotals+"&bussOrderNo="+ orderParentNo+"&orderIdList="+orderId;
                        // this.$http.get('/eb-wxshop/wxshop/order/prePayment', { params: { orderAmount: this.priceTotals, bussOrderNo: orderParentNo } }).then((respon) => {
                            //     if (respon.body.result == "000") {
                            //         this.title = "正在跳转支付页面"
                            //     } else {
                            //         this.title = "跳转失败"
                            //     }
                            //     this.isShow = !this.isShow;
                            //     alert( respon.body.showPage)
                            //     setTimeout(function () {
                            //         if (that.title == "正在跳转支付页面") {
                            //             that.$router.push({ name: 'pay', query: { ifUrl: respon.body.showPage } });
                            //         }
                            //         that.isShow = !that.isShow;
                            //     }, 3000);
                            // }, () => {
                            //     this.title = "跳转服务器失效"
                            //     this.isShow = !this.isShow;
                            //     setTimeout(function () {
                            //         that.isShow = !that.isShow;
                            //     }, 3000);
                        // })
                    } else {
                        this.title = "保存订单失败"
                        this.isShow = !this.isShow;
                        setTimeout(function () {
                            that.isShow = !that.isShow;
                        }, 3000);
                    }
                }, function (res) {
                    this.title = "保存订单服务器异常"
                    this.isShow = !this.isShow;
                    setTimeout(function () {
                        that.isShow = !that.isShow;
                    }, 3000);
                })
            }
        }
    },
    created() {
        document.title = "确认订单";
        document.body.style.backgroundColor = '#fff';
        /* 
          商品信息
          商品详情跳转过来
        */
        let that = this;
        if (this.$route.query.numbers) {
            this.tatalShow = false;
            this.$http.get("/eb-wxshop/wxshop/product/getProductDetail", { params: { productId: this.$route.query.productId } }).then(function (res) {
                this.orderOne = res.body.product;
                this.shoppingPrice = res.body.shoppingPrice;
            }, function (res) {
                this.title = "商品详情异常"
                this.isShow = !this.isShow;
                setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 3000);
            })
        /*
            购物车
        */   
        } else {
            this.tatalShow = true;
            this.$http.get("/eb-wxshop/wxshop/customer/queryAccountShopCar", { params: { ids: this.$route.query.ids } }).then(function (res) {
                this.orderData = res.body.validList;
            }, function (res) {
                this.title = "购物车异常"
                this.isShow = !this.isShow;
                setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 3000);
            })
        }
        /*
            订单地址
        */ 
        if (this.$route.query.address) {
            this.address = this.$route.query.address
            this.addressName = this.$route.query.customerName
            this.mobile = this.$route.query.mobile
        } else {
            this.$http.get('/eb-wxshop/wxshop/customer/queryAddress', { params: { customerId: this.wxCustomerId } }).then(function (res) {
                //  res.body.addressList;
                for (let i = 0; i < res.body.addressList.length; i++) {
                    if (res.body.addressList[i].isDefault == 1) {
                        this.address = res.body.addressList[i].address;
                        this.addressName = res.body.addressList[i].customerName;
                        this.mobile = res.body.addressList[i].mobile;
                        return
                    }
                }
            }, function (res) {
                this.title = "地址服务异常"
                this.isShow = !this.isShow;
                setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 3000);
            })
        }

    },
    computed: {
        /*
            数量数组 用于多商户数量统计
        */ 
        numsList() {
            let totals = []
            for (let m = 0; m < this.orderData.length; m++) {
                let tatalsItem = 0;
                for (let j = 0; j < this.orderData[m].shopCarList.length; j++) {
                    tatalsItem += this.orderData[m].shopCarList[j].num;
                }
                totals.push(tatalsItem);
            }
            return totals;
        },
        /*
            多商户价格数组统计
        */ 
        pricesList() {
            let totalsPirce = []
            for (let m = 0; m < this.orderData.length; m++) {
                let tatalsItem = 0;
                for (let j = 0; j < this.orderData[m].shopCarList.length; j++) {
                    tatalsItem += this.orderData[m].shopCarList[j].productPrice * this.orderData[m].shopCarList[j].num;
                }
                tatalsItem = tatalsItem.toFixed(2)
                totalsPirce.push(tatalsItem);
            }
            return totalsPirce;
        },
        /*
            总计价格
        */ 
        priceTotals() {
            if (this.tatalShow) {
                let item = 0;
                for (let i = 0; i < this.pricesList.length; i++) {
                    item += Number(this.pricesList[i])
                }
                item = item.toFixed(2)
                return item;
            } else {
                return (this.$route.query.numbers * this.shoppingPrice).toFixed(2);
            }

        },
        /*
            实际总计价格
        */ 
        practical() {
            this.priceTotals - Number(this.Losepirce) + Number(this.Addpirce)
        }
    }
}
</script>
