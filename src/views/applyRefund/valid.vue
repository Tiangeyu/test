<template>
  <div class="valid-div">
    <div class="title clearfix">
        <div class="fl check-box" :style="{backgroundImage: 'url('+allImgSrc+')'}">
            <input type="checkbox" name="car" v-model="allCheck" @change="allSelect">
        </div>
        <font class="fl">{{editItem.storeName}}</font>
    </div>
    <dl class="clearfix" v-for="(itemCar, indx) in editItem.shopCarList" :key="indx">
        <dt class="fl">
            <div class="check-box" :style="{backgroundImage: 'url('+imgSrcList[indx]+')'}">
                <input type="checkbox" v-model="checkList[indx]" @change="signSelect(indx)">
            </div>
        </dt>
        <dd class="fl">
            <router-link to="/" class="car-detail" v-show="editCar">
                <div class="car-img">
                    
                </div>
                <div class="car-infor" :class="{'borderN': !indexi}">
                    <h3>{{itemCar.storeName}}</h3>
                    <p class="clearfix"><span class="fl">￥{{itemCar.productPrice}}</span><font class="fr">X {{itemCar.num}}</font></p>
                </div>
            </router-link>
            <div class="edit-car" v-show="!editCar">
                <div class="car-img">                 
                </div>
                <div class="car-infor" :class="{'borderN': !indexi}">
                    <div class="comput clearfix">
                        <i class="add-car fl"></i><input class="fl" type="text" :value="itemCar.num" readonly><i class="reduce-car fl"></i>
                    </div>
                    <p>￥{{itemCar.productPrice}}</p>
                </div>
            </div>
        </dd>
    </dl>
  </div>
</template>

<style lang="less" scoped>
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
    .valid-div{
        background: #fff;
        margin-top: 20/200rem;
        padding-left: 24/200rem;
        .title{
            height: 70/200rem;
            border-bottom: 1px solid #d3d3d3;          
            font{
                padding-left: 26/200rem;
                font-size: 26/200rem;
                line-height: 70/200rem;
                color: #454545;
            }
        }
        dl{
            height: 186/200rem;
            dt{
                height: 100%;
                padding-right: 30/200rem;
                width: 30/200rem;
            }
            dd{
                .car-detail{
                    display: flex;
                    .car-img{
                        width: 146/200rem;
                        height: 146/200rem;
                        margin: 20/200rem 0;
                        margin-right: 20/200rem;
                        background: url('../../common/imgs/select_product_pic.png') no-repeat;
                        background-size: 100%; 
                    }
                    .car-infor{
                        border-top: 1px solid #d3d3d3;
                        width: 494/200rem;
                        height: 100%;
                        h3{
                            padding-top: 50/200rem;
                            font-size: 28/200rem;
                            color: #333;
                            padding-bottom: 30/200rem;
                        }
                        p{ 
                            span{
                                font-size: 30/200rem;
                                color: #f00;
                            }
                            font{      
                                padding-right: 24/200rem;                    
                                font-size: 28/200rem;
                                color: #454545;
                            }
                        }
                    }
                }
                .edit-car{
                    display: flex;
                    .car-img{
                        width: 146/200rem;
                        height: 146/200rem;
                        margin: 20/200rem 0;
                        margin-right: 20/200rem;
                        background: url('../../common/imgs/select_product_pic.png') no-repeat;
                        background-size: 100%; 
                    }
                    .car-infor{
                        border-top: 1px solid #d3d3d3;
                        width: 494/200rem;
                        height: 100%;
                        .comput{
                            padding-top: 30/200rem;
                            .add-car{
                                width: 48/200rem;
                                height: 44/200rem;
                                background: url('../../common/imgs/minus.png') no-repeat center;
                                background-size: 20/200rem 2/200rem;
                                border: 1px solid #d3d3d3;
                                border-radius: 5/200rem 0 0 5/200rem;
                            }
                            input{
                                width: 70/200rem;
                                height: 44/200rem;
                                border-top: 1px solid #d3d3d3;
                                border-bottom: 1px solid #d3d3d3;
                                font-size: 26/200rem;
                                text-align: center;
                                line-height: 44/200rem;

                            }
                            .reduce-car{
                                width: 48/200rem;
                                height: 44/200rem;
                                background: url('../../common/imgs/plus.png') no-repeat center;
                                background-size: 20/200rem 20/200rem;
                                border: 1px solid #d3d3d3;
                                border-radius:0 5/200rem 5/200rem 0;
                            }
                        }
                        p{       
                            padding-top: 30/200rem;                    
                            font-size: 30/200rem;
                            color: #f00;                          
                        }
                    }
                }
            }
            .borderN{
                border:  0!important;
            }
        }
    }
</style>

<script>
    import imgSrc from '../../common/imgs/not-select.png'
    import SelectImgSrc from '../../common/imgs/choose.png'
    export default{
        // 删除与结算切换
        props:[
            'editCar',  // 删除与结算切换
            'editItem', // 商品数据
            'orderListCheck',   //商品是否被选择
            'id'    // 第几个商户
        ],
        data(){
            return{
                indexi: false,
                allCheck: false,
                allImgSrc: imgSrc,
                dataLenght:0,
                imgSrcList:[],
                checkList:this.orderListCheck
            }
        },
        methods:{
            allSelect(){
                // alert(this.allCheck)
               if(this.allCheck){
                     // 单个订单全选中状态
                    this.allImgSrc = SelectImgSrc;
                    for(let i=0; i<this.dataLenght; i++){
                        this.imgSrcList.splice(i,1,SelectImgSrc)
                        this.$emit('isTrue', this.id, i)
                    }                 
               }else{
                    //单个订单全取消状态  (显示与状态保持一致性)  
                    this.allImgSrc = imgSrc;
                    for(let i=0; i<this.dataLenght; i++){
                        this.imgSrcList.splice(i,1,imgSrc)
                        this.$emit('isFalse', this.id, i)
                        this.$emit('computedTotalPrice', )
                    } 
               }
            },
            signSelect(i){
                // console.log(this.checkList[i])
                // console.log(this.checkList.length)
                if(this.checkList[i]){      
                   // alert(i)
                    this.$emit('isTrue', this.id, i)
                }else{               
                    this.$emit('isFalse', this.id, i)
                }
            }
        },
        mounted(){
            // console.log(this.editItem.shopCarList.length)
            this.dataLenght = this.editItem.shopCarList.length

            //  属性显示与状态
            for(let i=0; i<this.dataLenght; i++){
                this.imgSrcList.push(imgSrc)
            }

            // console.log(this.imgSrcList)
        },
        watch:{
            checkList(){
                for(let i=0; i<this.dataLenght; i++){
                    if(this.checkList[i] == false){
                        this.imgSrcList.splice(i,1,imgSrc)     
                    }else{
                        this.imgSrcList.splice(i,1,SelectImgSrc)
                    }
                }
                for(let i=0; i<this.dataLenght; i++){
                    if(this.checkList[i] == false){                      
                        this.allCheck = false
                        this.allImgSrc = imgSrc
                        return 
                    }
                    this.allCheck = true
                    this.allImgSrc = SelectImgSrc
                    
                }
            }
        }
    }
</script>

