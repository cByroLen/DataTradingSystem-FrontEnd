<template>
    <el-header class="page-header-container">
        <el-page-header :icon="ArrowLeft" class="page-header">
            <template #content>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="item in PageHeaderRouter" :to="{ path: item.router }">{{ item.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </el-page-header>
        <el-divider class="page-driver" />
    </el-header>
        
</template>

<script lang="ts" setup>
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
// 接受Page

type Porps = {
    PageHeaderRouter:any[], 
}
defineProps<Porps>()



</script>
<style>
.page-header-container{
    margin: 10px 0px 0px 0px;
    padding: 0%;
    overflow-y: hidden;
}

.page-header {
    position: fixed;
    width: 150%;
}

.page-driver {
    position: fixed;
    margin: 40px 0px 40px 0px;
}
</style>