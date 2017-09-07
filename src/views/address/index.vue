<template>
  <section class="bg">
    <div class="addList" v-for="(item,index) in userInfo" :key="index" @click="toPath(item)">
        <ul class="clearfix">
            <li>{{item.customerName}}</li>
            <li>{{item.mobile}}</li>
            <li>{{item.province}}{{item.address}}</li>
        </ul>
        <div class="setDiv clearfix" >
            <dl>
                <dt @click="setDefault(item.id,index)"><input name="defaultAddress" type="radio" class="singleChect"  :checked='item.isDefault == 1' />默认地址</dt>
                <dd @click="toDelete(index,item.id)"><i></i>删除</dd>
                <div class="clearfix"><dd @click="edit(item)"><i></i>编辑</dd></div>
            </dl>
        </div>
    </div>
    <div v-if="this.userInfo.length<=0"><i class="noAddress"></i></div>
    <div v-show="remained" class="noticeBox">{{notice}}</div>
    <section>
        <footerBtn></footerBtn>
    </section>
  </section>
</template>
<style lang="less" scoped>
    .bg{
        width: 100%;
        overflow: hidden;
        .addList{
            width: 100%;
            // height: 205/200/1.17rem;
            background-color: #fff;
            border-bottom: 1px solid #e9e9e9;
            ul{
                width: 100%;
                margin-top: 20/200/1.17rem;
                border-bottom: 1px solid #e9e9e9;
                // height: 135/200/1.17rem;
                padding-bottom: 10/200/1.17rem;
                font-size: 30/200/1.17rem;
                color: #323232;
            }
            li{
                float: left;
                margin: 24/200/1.17rem 0 0 30/200/1.17rem;

            }
            li:nth-child(2){
                margin-left: 35/200/1.17rem;
            }
            li:nth-child(3){
                width: 95%;
                margin: 30/200/1.17rem 0 0 30/200/1.17rem;
                display: block;
                font-size: 24/200/1.17rem; 
                color: #646464;
            }
            .setDiv{
                width: 100%;
                height: 70/200/1.17rem;
                dt{
                    font-size: 24/200/1.17rem;
                    color: #333333;
                    height: 70/200/1.17rem;
                    line-height: 70/200/1.17rem;
                    float: left;
                }
                dd{
                    font-size: 24/200/1.17rem;
                    color: #969696;
                    float: right;
                    margin-right: 50/200/1.17rem;
                    height: 70/200/1.17rem;
                    line-height: 70/200/1.17rem;
                    i{
                    display: block;
                    float: left;
                    width: 13/200/1.17rem;
                    height: 25/200/1.17rem;
                    background: url(../../common/imgs/edit.png) no-repeat center;
                    background-size: 100% 100%;
                    margin: 22/200/1.17rem 20/200/1.17rem 0 0;
                    }
                }
                dd:nth-child(2){
                    i{
                        float: left;
                        display: block;
                        width: 23/200/1.17rem;
                        height: 23/200/1.17rem;
                        background: url(../../common/imgs/delete.png) no-repeat center;
                        background-size: 100% 100%;
                        margin: 22/200/1.17rem 20/200/1.17rem 0 10/200/1.17rem;
                    }
                }
            }
            .singleChect{
                float: left;
                display: block;
                width: 30/200/1.17rem;
                height: 30/200/1.17rem;
                margin: 20/200/1.17rem 10/200/1.17rem 0 30/200/1.17rem;
            }
        }
        .noAddress{
            display: block;
            margin: 0 auto;
            margin-top:400/200/1.17rem; 
            width: 335/200/1.17rem;
            height: 248/200/1.17rem;
            background: url(../../common/imgs/address-none.png) no-repeat center;
            background-size: 100% 100%;
        }
        .noticeBox {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 110/200/1.17rem;
            font-size: 20/200/1.17rem;
            background-color: rgba(0, 0, 0, 0.3);
            margin: 0 auto;
            margin-top: 60/200/1.17rem;
            width: 500/200/1.17rem;
            height: 80/200/1.17rem;
            line-height: 80/200/1.17rem;
            text-align: center;
            color: #fff;
            z-index: 9900;
            overflow: hidden;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
            border-radius: 10px;
        }
    }   
</style>
<script>
    import footerBtn from './footerBtn.vue'
    import $ from 'jquery'
    export default {
        components:{
            footerBtn
        },
        data(){
            return {
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
                notice:'',
                remained:false,
                userInfo:[],
                addressInfo:[],
                Name:'',
                Phone:'',
                Location:'',
                Address:'',
                UserId:'',
                AddressId:'',
                name:'',
                checked:false,
                address: 0
            }
        },
        methods:{
            //删除一个
            toDelete:function(index,id){
                this.$http.get('/eb-wxshop/wxshop/customer/delAddress',{params:{addressId:id}}).then((res)=>{
                    // console.log(res.body)
                    if(res.body.result=='000'){
                        this.userInfo.splice(index,1);
                    }else{
                        alert(res.body.resultMsg)
                    }
                }, (res)=>{
                    
                })
            },
            //设置默认地址
            setDefault:function(id,index){
                event.stopPropagation();
                // var userId = this.$route.query.customerId
                this.$http.get('/eb-wxshop/wxshop/customer/updateAddressIsDefault',{params:{customerId:this.wxCustomerId,addressId:id}}).then((res)=>{
                    // console.log(res)
                    if(res.body.result=='000'){
                        $("input[type=radio][index]").prop("checked",true);
                        // this.notice = "更新默认地址成功"
                        // this.remained =true
                        // var that = this;
                        // setTimeout(function() {     
                        //     that.remained = false;
                        // }, 1000);
                        //  alert("更新默认地址成功")
                    }else{
                        this.notice = "更新默认地址失败"
                        this.remained =true
                        var that = this;
                        setTimeout(function() {     
                            that.remained = false;
                        }, 1000);
                        // alert("更新默认地址失败")
                    }
                }, (res)=>{
                        this.notice = "更新地址服务器异常"
                        this.remained =true
                        var that = this;
                        setTimeout(function() {     
                            that.remained = false;
                        }, 1000);
                    // alert("更新地址服务器异常")
                })
            },
            toPath(item){
                event.stopPropagation();
                if(this.$route.query.numbers){
                    this.$router.push({name: 'orderDetail', query: {numbers : this.$route.query.numbers, productId: this.$route.query.productId, address: item.address, mobile: item.mobile, customerName: item.customerName}})
                }else if(this.$route.query.ids){
                    this.$router.push({name: 'orderDetail', query: {ids :this.$route.query.ids, address: item.address, mobile: item.mobile, customerName: item.customerName}})
                }
            },
            edit(item){
                event.stopPropagation();
              //  :to="{name:'editAddress', query:{Name:item.customerName,Phone:item.mobile,Address:item.province,Location:item.address,AddressId:item.id}}" 
                if(this.$route.query.numbers){
                    this.$router.push({name: 'editAddress', query: {numbers : this.$route.query.numbers, productId: this.$route.query.productId,Name:item.customerName,Phone:item.mobile,Address:item.province,Location:item.address,AddressId:item.id}})
                }else if(this.$route.query.ids){
                    this.$router.push({name: 'editAddress', query: {ids :this.$route.query.ids,Name:item.customerName,Phone:item.mobile,Address:item.province,Location:item.address,AddressId:item.id}})
                }else{
                    this.$router.push({name: 'editAddress',query:{Name:item.customerName,Phone:item.mobile,Address:item.province,Location:item.address,AddressId:item.id}})
                }
            }
        },
    created() {
            // var userId = this.$route.query.customerId
            document.body.style.backgroundColor = "#f4f4f4";
            document.body.style.paddingBottom = "0.52/1.17rem";
            
            this.$http.get("/eb-wxshop/wxshop/customer/queryAddress",{params:{customerId:this.wxCustomerId},headers:{ 'Content-Type':"application/json;charset=UTF-8"}}).then(function(res){
                var userInfo = JSON.parse(res.bodyText).addressList
                    this.userInfo = userInfo
                    // console.log(userInfo)
                    this.name = this.$route.query.Name;
                    var phone = this.$route.query.Phone;
                    var address = this.$route.query.Address;
                    var location = this.$route.query.Location;
                
            },function(){

            })
            document.title = "管理收货地址"
            
        }
    }
</script>

