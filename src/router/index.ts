import { componentSizeMap } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/Template/Header/indexHeader.vue'),
      children:[
        {
          path: '',
          name: '首页',
          component: () => import('../views/landingPage/index.vue')
        },
        {
          path: 'login',
          name: '登录',
          component: () => import('../views/landingPage/loginRegister.vue')
        },
        {
          path: 'repwd',
          name: '账号找回',
          component: () => import('../views/landingPage/passwordRecovery.vue')
        },
        {
          path: 'aboutus',
          name: '关于我们',
          component: () => import('../views/landingPage/passwordRecovery.vue')
        },

      ]
    },
    
    {
      path: '/s',
      component: () => import('../components/Template/Header/tradingSystemHeader.vue'),
      children:[
        {
          path: '',
          name: '首页',
          component: () => import('../views/tradingSystem/index.vue')
        },
        {
          path:'user',
          name:'用户',
          component: () => import('../views/tradingSystem/user/user.vue')
        },
        {
          path:'user/qc',
          name:'用户认证',
          component: () => import ('../views/tradingSystem/user/QualificationCertificate.vue')
        },
        {
          path:'user/transactions',
          name:'交易记录',
          component: () => import ('../views/tradingSystem/user/Transactions.vue')
        },
        {
          path:'user/transactions/detail',
          name:'交易记录详情',
          component: () => import ('../views/tradingSystem/user/TransactionsDetail.vue')
        },

        
        {
          path:'data-asset',
          name:'数据资产总览',
          component: () => import ('../views/tradingSystem/data-asset/DataAsset.vue'),
        },
        {
          path:'data-asset/reg',
          name:'数据资产注册',
          component: () => import ('../views/tradingSystem/data-asset/Reg.vue'),
        },

        {
          path:'data-asset/detail',
          name:'资产详情',
          component: () => import ('../views/tradingSystem/data-asset/Detail.vue')
        },


        {
          path:'data-products',
          name:'数字商品总览',
          component: () => import ('../views/tradingSystem/data-products/DataProducts.vue'),
        },
        {
          path:'data-products/reg',
          name:'数字商品注册',
          component: () => import ('../views/tradingSystem/data-products/Reg.vue'),
        },
        {
          path:'data-asset/detail',
          name:'资产详情',
          component: () => import ('../views/tradingSystem/data-asset/Detail.vue')
        },
        {
          path:'data-products/detail',
          name:'商品信息详情',
          component: () => import ('../views/tradingSystem/data-products/Detail.vue'),
        },
        

        {
          path:'data-market',
          name:'数据市场',
          component: () => import ('../views/tradingSystem/data-market/DataMarket.vue')
        },
        {
          path:'data-market/detail',
          name:'商品页详情',
          component: () => import ('../views/tradingSystem/data-market/Detail.vue'),
        },
        {
          path:'data-market/confirm',
          name:'交易确认',
          component: () => import ('../views/tradingSystem/data-market/Confirm.vue'),
        },

      ]
    },
    {
      path:'/as',
      component: () => import('../components/Template/Header/auditSystemHeader.vue'),
      children:[
        {
          path:'',
          name:'首页',
          component: () => import ('../views/auditSystem/index.vue')
        },
        {
          path:'qc',
          component: () => import ('../views/auditSystem/qc/QC.vue')
        },
        {
          path:'qc/detail',
          component: () => import ('../views/auditSystem/qc/Detail.vue')
        },
        {
          path:'data-asset',
          component: () => import ('../views/auditSystem/data-asset/DataAsset.vue')
        },
        {
          path:'data-asset/detail',
          component: () => import ('../views/auditSystem/data-asset/Detail.vue')
        },
        {
          path:'data-products/',
          component: () => import ('../views/auditSystem/data-products/DataProducts.vue')
        },
        {
          path:'data-products/detail',
          component: () => import ('../views/auditSystem/data-products/Detail.vue')
        }
      ]
      
    },


    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/404.vue')
    },
  ]
})

export default router
