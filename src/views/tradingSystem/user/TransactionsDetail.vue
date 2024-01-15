<template>
    <div class="DPD-container">
        <el-main class="DPD-main-container">
            <el-form :inline="true" class="form" :model="TCform" ref="TCformRef">
                <el-card shadow="never" class="asset-info-card">
                    <el-form-item label="数据商品名:" style="width:20% ;">{{ TCform.name }}</el-form-item>
                    <el-form-item label="价格:" style="width:15% ;">{{ TCform.nominal_price }}</el-form-item>
                    <el-form-item label="商品关键词:" style="width: 25%;">{{ TCform.keyword }}</el-form-item>
                    <el-form-item label="产业类别:" style="width: 20%;">{{ TCform.industry_division }}</el-form-item>
                    <el-form-item label="数据类型:" style="width: 10%;">{{ TCform.type }}</el-form-item>
                    <el-form-item label="购买方:" style="width: 100%;">{{ TCform.seller_name }}</el-form-item>
                    <el-form-item label="销售方:" style="width: 100%;">{{ TCform.buyer_name }}</el-form-item>

                    <el-form-item label="数据描述:" style="width: 100%;">{{ TCform.products_description }}</el-form-item>
                    <el-form-item label="数据应用方法:" style="width: 100%;">{{ TCform.application_scenario }}</el-form-item>
                    <el-form-item label="订单生效时间:" style="width: 30%;">{{ TCform.tradding_time }}</el-form-item>
                    <el-form-item label="权益到期时间:" style="width: 30%;">{{ TCform.tradding_time }}</el-form-item>
                    <el-form-item label="数据文件" style="width: 100%;">
                        <el-button type="primary" class="submit-button" @click="toFiles()" link="true">获取文件</el-button>
                        </el-form-item>

                    <!-- <el-input placeholder="请输入名称" v-model="TCform.name" /> -->
                </el-card>


            </el-form>

        </el-main>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getPassDA } from '@/api/data_asset'
import { createNewDP } from '@/api/data_products'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile, UploadFiles, FormInstance } from 'element-plus';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const GrobalPath = 'file://laptop-ccr9qmkc/'
const PropertyRange: any = [
    { label: "数据所有权", value: "数据所有权" },
    { label: "数据使用权", value: "数据使用权" },
    { label: "其他", value: "其他" },
]
const TCformRef = ref<FormInstance>()

const TCform = reactive({
    buyer_name: route.query.buyer_name,
    seller_name: route.query.seller_name,
    property_range: route.query.property_range,
    application_scenario: route.query.application_scenario,
    time_limit: route.query,
    name: route.query.name,
    nominal_price: route.query.nominal_price,
    industry_division: route.query.industry_division,
    data: route.query.data,
    products_description: route.query.products_description,
    keyword: route.query.keyword,
    type: route.query.type,
    tradding_time: route.query.time_limit,
})

getPassDA(1).then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            OwnerDataAsset.arr = res.data.data
        }
    }
})

let OwnerDataAsset = reactive<{ arr: any }>({ arr: [] })

const toFiles = () =>{
    router.push('/files/'+TCform.data)
}




</script>
<style scoped>
.DPD-container {
    overflow-y: hidden;
}

.DPD-main-container {
    margin: 20px;
    padding: 0px;
    height: 100%;
}

.DAR-form-container {
    position: relative;
    overflow: hidden;

}
</style>

