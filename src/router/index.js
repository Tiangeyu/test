import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/index.vue'
import productInfo from '../views/productInfo/Index.vue'
import car from '../views/shoppingCar/index.vue'
import address from '../views/address/index.vue'
import orderDetail from '../views/orderDetail/index.vue'
import editAddress from '../views/editAddress/index.vue'
import addAddress from '../views/addAddress/index.vue'
import user from '../views/user/Index.vue'
import orderSucess from '../views/orderDetail/orderSucess/Index.vue'
import bindTel from '../views/user/bindTel/Index.vue'
import userBack from '../views/user/userBack/Index.vue'
import waitPayment from '../views/user/waitPayment/index.vue'
import dealDone from '../views/user/dealDone/index.vue'
import applyFor from '../views/applyFor/index.vue'
import comeApply from '../views/comeFromOrderApply/index.vue'
import onlyRefund from '../views/onlyRefund/index.vue'
import password from '../views/user/password/Index.vue'
import serviceType from '../views/serviceType/index.vue'
// import exchange from '../views/exchange/index.vue'
// import applyRefund from '../views/applyRefund/index.vue'
import returnRefund from '../views/returnRefund/index.vue'
import myOrder from '../views/myOrder/index.vue'
import service from '../views/service/Index.vue'
import addOrder from '../views/addOrder/index.vue'
import changeTel from '../views/user/changeTel/Index.vue'
import loading from '../views/loading/index.vue'

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
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail
        },
        {
            path: '/orderSucess',
            name: 'orderSucess',
            component: orderSucess
        },
        {
            path: '/editAddress',
            name: 'editAddress',
            component: editAddress
        },
        {
            path: '/addAddress',
            name: 'addAddress',
            component: addAddress
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/bindTel',
            name: 'bindTel',
            component: bindTel
        },
        {
            path: '/userBack',
            name: 'userBack',
            component: userBack
        },
        {
            path: '/waitPayment',
            name: 'waitPayment',
            component: waitPayment
        },
        {
            path: '/dealDone',
            name: 'dealDone',
            component: dealDone
        },
        {
            path: '/applyfor',
            name: 'applyfor',
            component: applyFor,
        },
        {
            path: '/comeApply',
            name: 'comeApply',
            component: comeApply,
        },
        {
            path: '/onlyRefund',
            name: 'onlyRefund',
            component: onlyRefund,
        },
        {
            path: '/password',
            name: 'password',
            component: password,
        },
        {
            path: '/serviceType',
            name: 'serviceType',
            component: serviceType,
        },
        // {
        //     path: '/exchange',
        //     name: 'exchange',
        //     component: exchange,
        // },
        // {
        //     path: '/applyRefund',
        //     name: 'applyRefund',
        //     component: applyRefund,
        // },
        {
            path: '/returnRefund',
            name: 'returnRefund',
            component: returnRefund,
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: myOrder,
        },
        {
            path: '/service',
            name: 'service',
            component: service,
        },
        {
            path: '/addOrder',
            name: 'addOrder',
            component: addOrder
        },
        {
            path: '/changeTel',
            name: 'changeTel',
            component: changeTel
        },
        {
            path: '/loading',
            name: 'loading',
            component: loading
        },
        {
            //重定向也是通过 routes 配置来完成，下面例子是所有 重定向到 /：
            path: '*',
            redirect: "/loading"
        }
    ]
})