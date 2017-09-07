<template>
  <section>
    <div class="centDiv">
        <ul class="clearfix">
            <li>
                <dl>
                    <label for="getPeople"><dt>收货人</dt></label>
                    <dd><input type="text" v-model="Name" id="getPeople"></dd>
                </dl>
            </li>
            <li>
                <dl>
                    <label for="conPhone"><dt>联系电话</dt></label>
                    <dd><input type="text" v-model="Phone" id="conPhone"></dd>
                </dl>
            </li>
            <li>
                <dl>
                    <label for="chooseArea"><dt>选择地区</dt></label>
                    <dd @click="pickerDom = true">
                        <input type="text" readonly id="myAddrs" name="addr" v-model="addressValue" />
                    </dd>
                </dl>
            </li>
            <li>
                <dl>
                    <label for="AddDetail"><dt>详情地址</dt></label>
                    <dd><input type="text" v-model="Location" id="AddDetail"></dd>
                </dl>
            </li>
        </ul>
    </div>
    <section>
        <div class="btnDiv">
            <ul>
                <li @click="toDelete()"><a>删除地址</a></li>
                <li @click="toSave()"><a>保存</a></li>
            </ul>
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
  </section>
</template>
<style lang="less" scoped>
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
    .centDiv{
        font-size: 30/200/1.17rem;
        color: #333;
        li{
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
            dt{
                margin-left: 24/200/1.17rem;
                width: 25%;
                float: left;
            }
            dd{
                width: 70%;
                float: left;
                input{
                    border: none;
                    width: 100%;
                    font-size: 30/200/1.17rem;
                    color: #333;
                }
            }
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
        font-size: 32/200/1.17rem;
        line-height: 70/200/1.17rem;
        margin-left: 85/200/1.17rem;
    }
    .headers font{
        float: right;
        color: #077eff;
        font-size: 32/200/1.17rem;
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
        .btnDiv{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 97/200/1.17rem;
        border-top: 1px solid #e1e1e1;
        padding-top: 7/200/1.17rem;
        ul{
            margin: 0 auto;
            width: 650/200/1.17rem;
        }
        li{
            width: 325/200/1.17rem;
            float: left;
            a{  
                display: block;
                width: 325/200/1.17rem;
                height: 90/200/1.17rem;
                line-height: 90/200/1.17rem;
                background-color: #e93b39;
                color: #fff;
                font-size: 34/200/1.17rem; 
                text-align: center; 
            }
        }
        li:nth-child(1){
            a{
                background-color: #1a191e;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
            }
        }li:nth-child(2){
            a{
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
            }
        }
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
                remained:false,
                isShow:false,
                notice:'请填写完整信息',
                title:"手机号码有误，请重填",
                Name:'',
                Phone:'',
                addressValue:'',
                Location:"",
                area1: {},
                addressOpen: true,
                addressValue: "",
                pickerDom: false,
                companyName:'',
                showBlea: true,
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
        methods:{
            //修改地址
            toSave(){
                var Name = this.Name
                var Phone = this.Phone
                var addressValue = this.addressValue;
                var Location = this.Location
                
                 if(Name==''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {     
                        that.remained = false;
                        // alert(1)
                    }, 2000);
                    return false;
                }else if(Phone == ''){
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
                }else if( Location ==''){
                    this.remained = !this.remained;
                    var that = this;
                    setTimeout(function() {            
                        that.remained = false;
                    }, 2000);
                    return false;
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.Phone))){ 
                    this.title = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                var addressValue = this.addressValue;
                var Name = this.Name;
                var Phone = this.Phone;
                var Location = this.Location;
                var AddressId = this.$route.query.AddressId;
                // console.log(Name+";"+Phone+";"+addressValue+";"+Location+';')
                // console.log(this.wxCustomerId)
                //编辑地址
                this.$http.get('/eb-wxshop/wxshop/customer/updateAddress',{params:{customerId:this.wxCustomerId,addressId:AddressId,name:Name,mobile:Phone,province:addressValue,address:Location}}).then((res)=>{
                    // console.log(res)
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
            //删除地址
            toDelete(){
                var id = this.$route.query.AddressId;
                console.log(id)
                this.$http.get('/eb-wxshop/wxshop/customer/delAddress',{params:{addressId:id}}).then((res)=>{
                    // console.log(res.body)
                    if(res.body.result=='000'){
                        this.$router.push('/address');
                    }else{
                        alert(res.body.resultMsg)
                    }
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
        },
        created() {
            this.Name = this.$route.query.Name;
            this.Phone = this.$route.query.Phone;
            this.addressValue = this.$route.query.Address;
            this.Location = this.$route.query.Location;
            this.AddressId = this.$route.query.AddressId;
            document.body.style.backgroundColor = "#fff";
            // document.body.style.paddingBottom = "0.52/1.17rem";
            document.title = "编辑地址"
            
        }
    }
</script>
