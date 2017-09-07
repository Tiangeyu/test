<template>
  <div class="car-content">
    <header class="clearfix" v-show="phoneShow">
        <i class="fl"></i>
        <font class="fl">绑定手机可保存购物车中所有物品</font>
        <span class="fr">立即绑定</span>
    </header>
    <section class="valid" v-for="(item, index) in editData" :key="index">
        <nav class="clearfix"><i class="fl"></i><font class="fl" @click="stateChange">{{validtitle}}</font></nav>
        <valid :editCar="editCarShow" :editItem="item" :orderListCheck="dataList[index].checkItem" @isTrue="isTrue" @isFalse="isFalse" :id="index" @computedTotalPrice="computedTotalPrice"></valid>
    </section>
    <footer>
        <div class="clearfix footer1">
            <div class="fl check-box" :style="{backgroundImage: 'url('+allImgSrc+')'}">
                <input type="checkbox" name="carParent" v-model="carParent" @change="carParentSelect">
            </div>
            <font class="fl f1">全选</font>    
            <button class="fr">结算{{'('+num+')'}}</button>
            <font class="fr f2">不含运费</font>
            <font class="fr f3">￥{{totalPrice}}</font>
            <font class="fr f4">合计: </font>
        </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
    .car-content{
        .check-box{
            width: 30/200rem;
            height: 100%;
            background: url('../../common/imgs/not-select.png') no-repeat left center;
            background-size: 100%; 
            input{
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
        header{
            height: 70/200rem;
            background: #3c3c42;
            padding: 0 20/200rem;
            i{
                width: 30/200rem;
                height: 100%;
                background: url('../../common/imgs/phoneClose.png') no-repeat left center;
                background-size: 100%; 
            }
            font{
                padding-left: 20/200rem;
                font-size: 24/200rem;
                height: 70/200rem;
                line-height: 70/200rem;
                color:#fff;
            }
            span{
                font-size: 26/200rem;
                color: #ff2725;
                height: 70/200rem;
                line-height: 70/200rem;
            }
        }
        .valid{
            margin-top: 20/200rem;
            nav{
                height: 70/200rem;
                padding-left: 24/200rem;
                background: #fff;
                i{
                    width: 13/200rem;
                    height: 70/200rem;
                    background: url('../../common/imgs/edit.png') no-repeat left center;
                    background-size: 100%;
                    margin-right: 26/200rem;
                }
                font{
                    color: #454545;
                    font-size: 26/200rem;
                    line-height: 70/200rem;
                }
            }
        }
        footer{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 104/200rem;
            border-top: 1px solid #d3d3d3;
            padding:0 24/200rem;
            background: #fff;
            .footer1{
                height: 100%;
                font{
                    height: 100%;
                    line-height: 104/200rem;
                }
                .f1{
                    padding-left: 20/200rem;
                    font-size: 26/200rem;
                    color: #454545;                  
                }
                .f2{
                    font-size: 22/200rem;
                    color: #666;
                    padding: 0 20/200rem;
                }
                .f3{
                    color: #ff0000;
                    font-size: 28/200rem;           
                }
                .f4{
                    padding-right: 20/200rem;
                    color: #333;
                    font-size: 28/200rem;
                }
                button{
                    height: 89/200rem;
                    margin-top: 7/200rem;
                    width: 200/200rem;
                    background: #ff0000;
                    border-radius: 4/200rem;
                    line-height: 89/200rem;
                    text-align: center;
                    font-size: 28/200rem;
                    color: #fff;
                }
            }
        }
    }
</style>


<script>
    import valid from './valid.vue'
    import imgSrc from '../../common/imgs/not-select.png'
    import SelectImgSrc from '../../common/imgs/choose.png'
    export default{
        components:{
            valid
        },
        data(){
            return{
                phoneShow: true,
                validtitle: "编辑",
                editCarShow: true ,
                editData: [],
                allImgSrc: imgSrc,
                carParent: false,
                dataList:[],
                dataLength: 0,
                totalPrice: 0,
                num: 0
            }
        },
        created(){
            document.title = "购物车"
            document.body.style.backgroundColor = "#f4f4f4"

            this.$http.get('/eb-wxshop/wxshop/customer/queryShopCar?customerId=1').then(function(res){
                this.editData = res.body.validList
                this.dataLength = res.body.validList.length;            
                for(let i = 0; i<this.dataLength; i++){                 
                    this.dataList.push({});
                    // this.dataList[i].checkItem = [];  
                    this.$set(this.dataList[i], 'checkItem', [])
                    for(let j=0; j < res.body.validList[i].shopCarList.length; j++){                               
                       // this.dataList[i].checkItem[j] = false    
                       this.dataList[i].checkItem.push(false)            
                    }            
                }
                
                // console.log(this.dataList)
            },function(res){
                alert("服务器异常")
            })
        },
        computed:{
            
        },
        methods:{
            stateChange(){
                if(this.validtitle == "编辑"){
                    this.validtitle = "完成"                  
                }else{
                    this.validtitle = "编辑"
                }
                this.editCarShow = !this.editCarShow
            },
            carParentSelect(){
                //  全选
                if(this.carParent){
                    this.allImgSrc = SelectImgSrc
                    for(let i=0; i<this.dataLength; i++){
                        for(let j=0; j<this.dataList[i].checkItem.length; j++){
                            this.dataList[i].checkItem.splice(j,1,true)
                        }
                    }
                // 全不选
                }else{
                    this.allImgSrc = imgSrc
                    for(let i=0; i<this.dataLength; i++){
                        for(let j=0; j<this.dataList[i].checkItem.length; j++){
                            this.dataList[i].checkItem.splice(j,1,false)
                        }
                    }
                   
                }
                 //console.log(this.dataList)
            },
            isTrue(i, j){
                this.dataList[i].checkItem.splice(j,1,true)
                //  forEach无法一次性结束所有循环,for才可以
                    // this.dataList.forEach((item, index)=>{
                    //     item.checkItem.forEach((it, indx)=>{
                    //         console.log(it)
                    //         if(it == false){
                            
                    //             this.allImgSrc = imgSrc
                    //             this.carParent = false;
                    //             return
                    //         }
                    //     })
                    // })
                    // this.allImgSrc = SelectImgSrc
                    // this.carParent = true;
                //  内含forEach失败demo
                for(let i=0; i<this.dataList.length; i++){
                    for(let j=0; j<this.dataList[i].checkItem.length; j++){
                        if(this.dataList[i].checkItem[j] == false){
                            this.allImgSrc = imgSrc
                            this.carParent = false;
                            return
                        }
                    }
                }
                this.allImgSrc = SelectImgSrc
                this.carParent = true;
            },
            isFalse(i, j){
                this.dataList[i].checkItem.splice(j,1,false)
                this.allImgSrc = imgSrc
                this.carParent = false;
                // console.log(this.dataList)
            },
            computedTotalPrice(price){
                this.totalPrice = this.totalPrice + price
            }
        },
        watch:{
            //  检测不到数组的变化  失败
            dataList(){
                // alert(1)
                for(let i=0; i<this.dataLength; i++){
                    for(let j=0; j<this.dataList[i].checkItem.length; j++){
                        if(this.dataList[i].checkItem[j] == false){
                                this.allImgSrc = imgSrc
                                this.carParent = false;
                            return
                        }
                    }
                }
                this.allImgSrc = SelectImgSrc
                this.carParent = true;
            }
        }
    }
</script>
