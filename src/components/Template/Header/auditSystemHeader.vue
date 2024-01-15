<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})


const { circleUrl, squareUrl, sizeList } = toRefs(state)

const activeIndex = ref('1')



const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const Screen = reactive({
  Width:document.body.clientWidth,
  Height:document.body.clientHeight,
})

// pageHeader传参
var PageHeaderRouter:any = ref([
  {name:"用户",router:"/s/user"},
  {name:"用户资质认证",router:"/s/user/qc"},
  {name:"用户资质认证",router:"/s/user/qc"},
  {name:"用户资质认证",router:"/s/user/qc"},
])
</script>

<template>

    <el-container>
      <!-- s-sidebar -->
      <el-aside class="aside-container" width="200px">
        <el-row>
          <el-col :span="12">
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="sidebar" default-active="1-1"
              text-color="#fff" @open="handleOpen" @close="handleClose" router>
              <el-menu-item index="/as">
                <el-icon><icon-menu /></el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="/as/qc">
                <el-icon><icon-menu /></el-icon>
                <span>资质审核</span>
              </el-menu-item>
              <el-menu-item index="/as/data-asset">
                <el-icon><icon-menu /></el-icon>
                <span>数据资产审核</span>
              </el-menu-item>
              <el-menu-item index="/as/data-products">
                <el-icon><icon-menu /></el-icon>
                <span>数据商品审核</span>
              </el-menu-item>

              <!-- <el-sub-menu>
                <template #title>
                  <el-icon><icon-menu /></el-icon>
                  <span>用户页</span>
                </template>
                <el-menu-item index="/s/user">总览</el-menu-item>
                <el-menu-item index="/s/user/qc">资质认证</el-menu-item>
                <el-menu-item index="/s/user/transactions">交易合同</el-menu-item>
              </el-sub-menu>

              <el-sub-menu>
                <template #title>
                  <el-icon><icon-menu /></el-icon>
                  <span>数据资产</span>
                </template>
                <el-menu-item index="/s/data-asset">总览</el-menu-item>
                <el-menu-item index="/s/data-asset/reg">数据资产注册</el-menu-item>
              </el-sub-menu>

              <el-sub-menu>
                <template #title>
                  <el-icon><icon-menu /></el-icon>
                  <span>数据商品</span>
                </template>
                <el-menu-item index="/s/data-products">总览</el-menu-item>
                <el-menu-item index="/s/data-products/reg">数据资产注册</el-menu-item>
              </el-sub-menu>
              
              <el-menu-item index="/s/data-market">
                <el-icon><icon-menu /></el-icon>
                <span>数据交易市场</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        </el-row>

      </el-aside>

      <el-container>
        <!-- s-Header -->
        <el-header class="header-container">
          <el-menu :default-active="activeIndex" class="header" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" ellipsis="flase" router>
            <div class="left-flex-grow" />
            <el-menu-item index="/">数据交易中心</el-menu-item>
            <div class="right-flex-grow" />
            <el-sub-menu>
              <template #title>
                <el-avatar :size="30" :src="circleUrl" />
              </template>
              <el-menu-item index="3-1">个人中心</el-menu-item>
              <el-menu-item index="3-2">设置</el-menu-item>
              <el-menu-item index="/login">退出登录</el-menu-item>
            </el-sub-menu>
            <el-menu-item>xxx(用户名)
            </el-menu-item>
          </el-menu>
        </el-header>
        <!-- s-main -->
        <el-main class="main-container">
          <el-container>
            <el-header>
                <tradingSystemMainGuide :PageHeaderRouter="PageHeaderRouter" />
            </el-header>
            <el-main class="main-main-container">
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-main>
      </el-container>

    </el-container>
</template>
  


<style>
/* System中的Container分为头栏、侧边栏和主体三个部分 */

/* 容器&&架构部分 */
.container {
  /*主容器*/
  height: 100%;
  width: 100%;
}

.header-container {
  /* Header容器 */
  height: 40px;
  padding: 0%;
  width: 100%;

}
.main-container {
  /* 内容容器 */
  /* margin-left: 200px; */
  padding: 0px;
}

.main-main-container{
  padding: 0%;
}








/* 头栏部分 */
.header {
  width: 100%;
  height: 40px;
  border: 0;
  padding: 0;
  position: fixed;
  overflow: hidden;
}

.left-flex-grow {
  flex-grow: 0.02;
}

.right-flex-grow {
  flex-grow: 0.93;
}

/* 侧边栏部分 */
.sidebar {
  border: 0px;
  position: fixed;
}

.sidebar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 4000px;
}
</style>