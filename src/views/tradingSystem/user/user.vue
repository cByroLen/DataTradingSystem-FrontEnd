<template>
    <el-card shadow="never">
        <div class="name">
            <span>欢迎使用电力数据交易平台      </span>
            <span >{{ name }}</span>
        </div>

        <div class="name">
            <span>当前账号的权限组为：</span>
            <span>{{ authority }}</span>
        </div>

    </el-card>

</template>

<script setup lang="ts">
import { getToken } from '@/utils/cookies'


const name: any = getToken('name')

const authority: any = getToken('authority')
</script>

<style scoped>
.name{
    font-size:x-large;
    margin-bottom: 1em;
}

.welcome{
    font-size: xx-large;
    margin-bottom: 1em;

}
</style>