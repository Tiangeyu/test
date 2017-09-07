import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index.vue'
import productInfo from '../views/productInfo/Index.vue'
import car from '../views/shoppingCar/index.vue'

Vue.use(Router)


export default new Router({
    routes: [{
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/productInfo',
            name: 'productInfo',
            component: productInfo
        },
        {
            path: '/car',
            name: 'car',
            component: car
        },
        {
            //重定向也是通过 routes 配置来完成，下面例子是所有 重定向到 /：
            path: '*',
            redirect: "/index"
        }
    ]
})