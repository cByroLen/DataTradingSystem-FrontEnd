<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="sidebar" default-active="1-1"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>总览</span>
          </template>
            <el-menu-item index="1-1">权属认证</el-menu-item>
            <el-menu-item index="1-2">资产录入</el-menu-item>
            <el-menu-item index="1-3">数据商品</el-menu-item>
            <el-menu-item index="1-4">交易合同</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>数据资产</span>
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon><icon-menu /></el-icon>
          <span>数据商品</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><icon-menu /></el-icon>
          <span>数据交易市场</span>
        </el-menu-item>
      </el-menu>
    </el-col>

  </el-row>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {Document,Menu as IconMenu,Location,Setting,} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
  
<style>
.sidebar:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
}
</style>