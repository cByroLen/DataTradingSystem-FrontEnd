<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>

<template>
  <el-menu :default-active="activeIndex" class="guide-menu" mode="horizontal" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b" ellipsis="flase" router>
    <div class="left-flex-grow" />
    <el-menu-item index="/">数据交易中心</el-menu-item>
    <el-menu-item index="2">产品中心</el-menu-item> 
    <el-sub-menu index="3">
      <template #title>解决方案</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
      <el-sub-menu index="3-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="4">Info</el-menu-item>
    <el-menu-item index="5">Orders</el-menu-item>
    <div class="right-flex-grow" />
    <el-menu-item index="/login">登录 / 注册</el-menu-item>
    
  </el-menu>

  <router-view></router-view>
</template>
  


<style>
.left-flex-grow {
  flex-grow: 0.1;
}
.right-flex-grow {
  flex-grow: 0.75;
}
.guide-menu{
  font-size: 2.5em;
}
</style>
