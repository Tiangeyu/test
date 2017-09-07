<template>
  <section>
    <div class="centDiv">
        <ul class="clearfix">
            <li>
                <dl>
                    <label for="getPeople"><dt>收货人</dt></label>
                    <dd><input type="text" v-model="addName" id="getPeople"></dd>
                </dl>
            </li>
            <li>
                <dl>
                    <label for="conPhone"><dt>联系电话</dt></label>
                    <dd><input type="tel" v-model="addPhone" id="conPhone"></dd>
                </dl>
            </li>
            <li>
                <dl class="chooseAdd">
                    <dt>选择地区</dt>
                    <dd @click="pickerDom = true">
                        <input type="text" readonly id="myAddrs" name="addr" v-model="addressValue"/>
                        <div class="clearfix" v-show="addressOpen"><span class="fl">请选择</span><i class="fl"></i></div>
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <label for="addDetail"><dt>详情地址</dt></label>
                    <dd><input type="text" v-model="addLocation" id="addDetail"></dd>
                </dl>
            </li>
        </ul>
    </div>
    <div @click="editAdd()" class="underBtn">
        <button>保存</button>
    </div>
    <div class="gearArea" v-show="pickerDom">
        <mt-picker v-show="pickerDom" :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" :showToolbar="showBlea">
            <div class="headers">
                <span @click="cancel">取消</span>
                <font @click="sure">完成</font>
            </div>
        </mt-picker >
    </div>
    <div v-show="remained" class="noticeBox">{{notice}}</div>
    <div v-show="isShow" class="noticeBox">{{title}}</div>
  </section>
</template>
<style lang="less" scoped>
    //  @import 'mint-ui/lib/style.css';
    .centDiv{
        font-size: 30/200/1.17rem;
        color: #333;
        li{
            font-size: 30/200/1.17rem;
            color: #333;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
            dt{
                margin-left: 24/200/1.17rem;
                width: 25%;
                float: left;
            }
            dd{
                font-size: 30/200/1.17rem;
                color: #333;
                width: 70%;
                float: left;
                input{
                    border: none;
                    width: 100%;
                    font-size: 30/200/1.17rem;
                }
            }
            .chooseAdd{
                position: relative;
                div{
                    position: absolute;
                    right: 20/200/1.17rem;
                    top: 0;                
                    height: 88/200/1.17rem;
                  span{
                        display: inline-block;
                        line-height:  88/200/1.17rem;
                        color: #333;
                        font-size: 26/200/1.17rem;
                        margin-right: 20/200/1.17rem;
                    }
                    i{
                        display: inline-block;
                        width: 13/200/1.17rem;
                        height: 88/200/1.17rem;
                        background: url('../../common/imgs/right_arrow.png') no-repeat left center;
                        background-size: 100%; 
                    }
                }
            }
        }
    }
    .underBtn{ 
        height: 96/200/1.17rem;
        background-color: #fff;
        padding-top: 7/200/1.17rem;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        button{  
            margin: 0 auto;
            display: block;
            width: 700/200/1.17rem;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            background-color: #e93b39;
            color: #fff;
            font-size: 34/200/1.17rem; 
            text-align: center; 
            border-radius: 4px;
        }
    }
    //  picker的header
    .headers{
        border-top: 1px solid #b2b2b2;
        height: 100%;
        background-color: #f5f5f5;
    }
    .headers span{
        float: left;
        color: #077eff;
        font-size: 28/200/1.17rem;
        line-height: 70/200/1.17rem;
        margin-left: 85/200/1.17rem;
    }
    .headers font{
        float: right;
        color: #077eff;
        font-size: 28/200/1.17rem;
        line-height: 70/200/1.17rem;
        margin-right: 85/200/1.17rem;
    }
    .picker{
        position: fixed;
        bottom: 0px;
        width: 100vw;
        background: #fff;
    }
    .gearArea {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 10px;
        background-color: rgba(0, 0, 0, 0);
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9900;
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }
    .noticeBox {
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
</style>
<script>
    import Vue from 'vue' 
    import {Picker} from 'mint-ui';
    Vue.component(Picker.name, Picker)
    import s from '../../common/js/data.json'
    export default {
        data(){
            return{
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
                title:'手机号码有误，请重填',
                isShow:false,
                remained:false,
                notice:'请填写完整信息',
                addName:"",
                addPhone:'',
                addressValue:'',
                addLocation:'',
                area1: {},
                addressOpen: true,
                addressValue: "",
                pickerDom: false,
                companyName:'',
                showBlea: true,
                saveAdd:'',
                addressSlots: [
                    {
                        flex: 1,
                        defaultIndex: 1,
                        values: Object.keys(s),
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                addressProvince: '省',
                addressCity: '市',
                addressXian: '区'
            }
        },
        watch:{
            addressValue(newValue,oldValue){
                if(newValue != oldValue){
                    this.addressOpen = false;
                    this.addressValue = newValue
                }
                
            }
        },
        created() {
            
            document.body.style.backgroundColor = "#fff";
            // document.body.style.paddingBottom = "0.52rem";
            document.title = "添加新地址"
        },
        methods:{
            editAdd(){
                var addName = this.addName
                var addPhone = this.addPhone
                var addressValue = this.addressValue;
                var addLocation = this.addLocation
                
                 if(addName==''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {     
                        that.remained = false;
                        // alert(1)
                    }, 2000);
                    return false;
                }else if(addPhone == ''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {           
                        that.remained = false;
                    }, 2000);
                    return false;
                }else if(addressValue==''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {            
                        that.remained = false;
                    }, 2000);
                    return false;
                }else if(addLocation==''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {            
                        that.remained = false;
                    }, 2000);
                    return false;
                 }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.addPhone))){ 
                    this.title = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                this.$http.get('/eb-wxshop/wxshop/customer/saveAddress',{params:{customerId:this.wxCustomerId,name:addName,mobile:addPhone,province:addressValue,address:addLocation},headers:{ 'Content-Type':"application/json;charset=UTF-8"}}).then((res)=>{
                    console.log(res)
                    if(res.body.result=='000'){  
                        if(this.$route.query.numbers){
                            this.$router.push({name: 'address', query: {numbers : this.$route.query.numbers, productId: this.$route.query.productId}})
                        }else if(this.$route.query.ids){
                            this.$router.push({name: 'address', query: {ids :this.$route.query.ids}})
                        }else{
                            this.$router.push('/address');
                        }
                       
                    }else{
                        alert(res.body.resultMsg)
                    }

                }).catch((res)=>{

                })
            },
            onAddressChange(picker, values) {
                let sheng = Object.keys(s);            
                let shi = Object.keys(s[values[0]]);             
                picker.setSlotValues(1, shi);
                let xian = s[values[0]][values[1]];
                this.addressProvince = values[0];
                this.addressCity = values[1];
                this.addressXian = values[2];
                picker.setSlotValues(2, Object.keys(xian));
            },
            cancel() {
                this.pickerDom = false;
            },
            sure() {
                 this.pickerDom = false;
                 this.addressValue = this.addressProvince + " " + this.addressCity + " " + this.addressXian;
            }
        },
        mounted(){
            this.$nextTick(() => {
                setTimeout(() => {//这个是一个初始化默认值的一个技巧
                this.addressSlots[0].defaultIndex = 0;
                }, 100);
            });
        }   
    }

</script>
