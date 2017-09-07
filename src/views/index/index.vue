<template>
    <div class="index-body">
        <!--banner-->
        <swiper class="index-banner" :options="bannerSwiperOption">
            <swiper-slide v-for="item in bannerData" :key="item.id">
                <a :href="item.linkUrl" :style="{backgroundImage:'url('+picUrl+item.imageUrl+')'}"></a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    
        <!--advice-->
        <section>
            <swiper class="index-advice" :options="adviceSwiperOption" ref="advice">
                <swiper-slide v-for="item in adviceData" :key="item.id">
                    <a :href="item.url">
                        <font>{{item.title}}</font>
                    </a>
                </swiper-slide>
            </swiper>
        </section>
    
        <!--limitShop-->
        <limit-shop></limit-shop>
    
        <!--footer-->
        <index-footer></index-footer>
    </div>
</template>

<style lang="less">
.index-body {
    .index-banner {
        height: 400/200rem/1.17rem;
        background: #fff;
        a {
            display: block;
            height: 100%;
            background-size: 100% 100%;
        }
        .swiper-pagination span {
            width: 18/200/1.17rem;
            border-radius: 0;
            height: 5px;
            background: #fff;
        }
        .swiper-pagination-bullet-active {
            background: #000;
            opacity: 0.7
        }
    }
    .index-advice {
        height: 70/200rem;
        background: #fff;
        padding-left: 20/200rem;
        a {
            display: block;
            font-size: 24/200rem;
            color: #f48f18;
            line-height: 70/200rem;
            font {
                padding-left: 20/200rem;
                color: #666;
            }
        }
    }
}
</style>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import limitShop from './limitShop.vue'
import indexFooter from './footer.vue'
export default {
    components: {
        swiper,
        swiperSlide,
        limitShop,
        indexFooter
    },
    data() {
        return {
            // banner
            bannerData: [],
            bannerSwiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                notNextTick: true,
                autoplay: 3000,
                pagination: '.swiper-pagination',
                // slidesPerView: 'auto',  
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
                // effect: 'fade'  //切换效果
            },
            // advice
            adviceData: [],
            adviceSwiperOption: {
                direction: 'vertical',
                autoplay: 2000,
                //  此属性 影响异步数据获取渲染
                // slidesPerView: 'auto',  
                // centeredSlides: true,  
                spaceBetween: 30,
                loop: true,
                observer: true,
                observeParents: true,

            },
            picUrl: window.sessionStorage.getItem('picUrl')
        }
    },
    created() {
        document.body.style.backgroundColor = "#f4f4f4";
        document.title = "首页";

        // 广告轮播
        this.$http.get('/eb-wxshop/wxshop/base/queryAllMessages').then((res) => {
            this.adviceData = res.body.data;
        })

        // banner轮播
        this.$http.get('/eb-wxshop/wxshop/order/listIndexAdNotice').then((res) => {
            this.bannerData = res.body.adInfos;
        })
    }
}
</script>

