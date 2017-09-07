<template>
    <div class="section">
        <div class="product_pic">
             <swiper class="product-banner" :options="bannerSwiperOption">
                <swiper-slide v-for="(item,index) in bannerData" :key="index">
                    <img class="pic_css" :src='picUrl+item' />
                    <!-- <p class="pic_num"><i>{{index+1}}</i>/<i>{{pic_all_num}}</i></p> -->
                </swiper-slide> 
            </swiper> 
            <div class="swiper-pagination pic_num"></div>
            <!-- <p class="pic_num"><i>{{index+1}}</i>/<i>{{pic_all_num}}</i></p> -->
        </div>
        <div class="product_basic_info">
            <div class="clearfix">
                <p class="fl price">￥<i>{{unitPrice}}</i></p>
                <p class="fl org_price">￥<del>{{listPrice}}</del></p>
                <p class="fr zero_freight">免邮费</p>
            </div>
            <p class="title">{{title}}</p>
        </div>
        <div class="gap_f4_20"></div>
        <div v-html="description" class="description"></div>
    </div>
</template>
<style lang="less" scoped>
    .section{
        position: absolute;
        width: 100%;
        top: 88/200/1.17rem;
        margin-bottom: 104/200/1.17rem;
        z-index: 0;
        .product_pic{
            position: relative;
        }
        .product_basic_info{
            height: 180/200/1.17rem;
            line-height: 200/200/1.17rem;
            width: 100%;
            .price{
                font-size: 48/200/1.17rem;
                color: #e93b39;
                margin-left: 30/200/1.17rem;
                margin-top: 35/200/1.17rem;
            }
            .org_price{
                font-size: 30/200/1.17rem;
                color: #cacaca;
                margin-left: 12/200/1.17rem;
                margin-top: 50/200/1.17rem;
            }
            .zero_freight{
                font-size: 30/200/1.17rem;
                color: #666;
                margin-right: 50/200/1.17rem;
                margin-top: 50/200/1.17rem;
            }
            .title{
                max-width: 680/200/1.17rem;
                font-size: 32/200/1.17rem;
                color: #454545;
                margin-left: 30/200/1.17rem;
                margin-top: 24/200/1.17rem;
            }
        }
        .gap_f4_20{
            height: 20/200/1.17rem;
            background: #f4f4f4;
        }
    }
    .product-banner{
        height: 660/200/1.17rem;
        background: #fff;
        .pic_css{
            height: 100%;
            width: 100%;
        }
        // .pic_num{
        //     position: absolute !important;
        //     right: 30/200/1.17rem !important;
        //     bottom: 20/200/1.17rem !important;
        //     width: 60/200/1.17rem !important;
        //     height: 30/200/1.17rem !important;
        //     line-height: 30/200/1.17rem !important;
        //     border: 2/200/1.17rem solid #e9e9e9 !important;
        //     border-radius: 4/200/1.17rem !important;
        //     color: #333 !important;
        //     font-size: 22/200/1.17rem !important;
        //     text-align: center !important;
        //     background: #fff !important;
        // }
    }
    .pic_num{
        position: absolute;
        left: 650/200/1.17rem;
        // right: 30/200/1.17rem;
        bottom: 20/200/1.17rem;
        width: 66/200/1.17rem;
        height: 30/200/1.17rem;
        line-height: 30/200/1.17rem;
        border: 2/200/1.17rem solid #e9e9e9;
        border-radius: 4/200/1.17rem;
        color: #333;
        font-size: 22/200/1.17rem;
        text-align: center;
        background: #fff;
    }
    .description{
        margin: 0 auto;
        width: 690/200/1.17rem;
        margin-top: 30/200/1.17rem;
        overflow: hidden;
    }
</style>
<script>
    import {swiper,swiperSlide} from "vue-awesome-swiper"
    // import imgsrc from '../../common/imgs/product_pic.png'
    export default {
        components:{
            swiper,
            swiperSlide
        },
        data(){
            return{
                bannerData:[
                    // {imgSrc:"",id:'1'},
                    // {imgSrc:"",id:'2'},
                    // {imgSrc:"",id:'3'},
                    // {imgSrc:"",id:'4'},
                    // {imgSrc:"",id:'5'},
                    // {imgSrc:"",id:'6'}
                    // {imgSrc:"http://192.168.8.5:8888/group1/M00/00/0A/wKgIBVkdYY-ADld4AAAv__WJsYI557.png",id:'5'}
                ],
                bannerSwiperOption:{
                    //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                    notNextTick: true,  
                    autoplay: 3000,
                    pagination: '.swiper-pagination',  
                    paginationType : 'fraction',
                    // slidesPerView: 'auto',  
                    centeredSlides: true,   
                    spaceBetween: 30,
                    loop: true,
                    initialSlide: 1,  
                    // effect: 'fade'  //切换效果
                },
                pic_all_num:"",
                // product_pic_scr:imgsrc,
                unitPrice:"",
                listPrice:"",
                title:"",
                productId:"",
                productDes:"",
                storeName:"",
                description:"",
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId')

            }

        },
        methods:{
            // add_into_car(){
            //     this.$http.post("/eb-wxshop/wxshop/customer/saveShopCar",{customerId:1,productId:this.productId,shoppingId:1,num:1,listPrice:this.listPrice,productPrice:this.unitPrice,productDes:this.productDes,storeName:this.storeName},{emulateJSON: true}).then(function(res){
            //         console.log(res)
            //     },function(){
            //         console.log('失败')
            //     })
            // }
        },
        created(){
            this.productId = this.$route.query.productId;
            this.$http.get("/eb-wxshop/wxshop/product/getProductDetail",{params:{productId:this.productId}},{emulateJSON: true}).then(function(res){
                var product = JSON.parse(res.bodyText);
                var banner = product.carousel;
                for(var i = 0;i<=product.carousel.length;i++){
                    if(product.carousel[i] == ""|product.carousel[i] == undefined){
                        product.carousel.splice(i,1);
                    }
                }
                this.bannerData=product.carousel;
                this.pic_all_num = product.carousel.length;
                this.listPrice = product.product.listPrice;
                this.unitPrice = product.shoppingPrice;
                this.title = product.product.name;
                this.productId = product.product.productId;
                this.productDes = product.product.description;
                this.storeName = product.product.storeName;
                this.description = product.product.description.replace(/group/,this.picUrl+"group");
                //console.log(this.description)
                // document.getElementsByClassName("description").childNodes.childNodes.style="width:100%";
                // console.log(this.description+"!!!!!!!"+this.picUrl)
                // this.product_org_price = product.product.listPrice;
                // this.product_org_price = product.product.listPrice;
                // for(var i=0;i<carousel.length;i++){
                //     var json={};
                //     json.imgSrc=this.picUrl+carousel[i];
                //     json.id=i+1;
                //     this.bannerData.push(json)
                // }
            }
            // ,(res)=>{
            //     this.titC='服务器网络链接中断，请稍后再试！'
            //     this.isC=true;
            //     var that=this
            //     setTimeout(function(){
            //             that.isC=false;
            //     },3000)
            // }
            )
        }
    }
</script>