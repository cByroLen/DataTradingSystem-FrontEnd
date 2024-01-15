<template>
    <div class="DPD-container">
        <el-main class="DPD-main-container">
            <el-form :inline="true" class="form" :model="DataProductForm" ref="DataProductFormRef">
                <el-card shadow="never" class="asset-info-card">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-image style="width: 100px; height: 100px" :src="GrobalPath + DataProductForm.pre_img"
                                fit="cover" />
                        </el-col>
                        <el-col :span="14" style="margin-bottom: 20px;">
                            <el-row :gutter="20">
                                <el-col :span="18">
                                    <div class="name">{{ DataProductForm.name }}</div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="price">{{ DataProductForm.nominal_price }} 元</div>
                                </el-col>
                            </el-row>

                            <div class="industry">{{ DataProductForm.industry_division }}</div>

                            <div class="type">{{ DataProductForm.type }}</div>


                            <div class="slider">
                                <el-slider v-model="value" show-input />
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-button type="primary" style="width: 100%;" size="large" @click="toConfirm(DataProductForm)">购买</el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="primary" style="width: 100%;" size="large">添加搜藏</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div style="margin-top: 50px;"></div>
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="商品参数" name="first">
                            <div class="tab-line">关键词：{{ DataProductForm.keyword }}</div>
                            <div class="tab-line">产业类型：{{ DataProductForm.industry_division }}</div>
                            <div class="tab-line">数据类型：{{ DataProductForm.type }}</div>
                            <div class="tab-line">权益期限：{{ DataProductForm.time_limit }}</div>
                            <div class="tab-line">交易权属：{{ DataProductForm.property_range }}</div>
                        </el-tab-pane>
                        <el-tab-pane label="商品描述" name="second">
                            <div class="tab-line">{{ DataProductForm.products_description }}</div>
                        </el-tab-pane>
                        <el-tab-pane label="商品应用" name="third">
                            <div class="tab-line">{{ DataProductForm.application_scenario }}</div>
                        </el-tab-pane>
                        <el-tab-pane label="数据预览" name="fourth">

                        </el-tab-pane>
                    </el-tabs>

                </el-card>


            </el-form>

        </el-main>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { createNewTC } from '@/api/tranction_contract'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile, UploadFiles, FormInstance } from 'element-plus';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const value = ref(1)
const activeName = ref('first')

const GrobalPath = 'http://localhost:5173/files/'
const PropertyRange: any = [
    { label: "数据所有权", value: "数据所有权" },
    { label: "数据使用权", value: "数据使用权" },
    { label: "其他", value: "其他" },
]
const DataProductFormRef = ref<FormInstance>()

const DataProductForm = reactive({
    id: route.query.id,
    name: route.query.name,
    nominal_price: route.query.nominal_price,
    pre_img: route.query.pre_img,
    products_description: route.query.products_description,
    application_scenario: route.query.application_scenario,
    data_asset_id: route.query.data_asset_id,
    seller_id: route.query.owner_id,
    seller_name:route.query.seller_name,
    property_range: route.query.property_range,
    time_limit: route.query.time_limit,
    keyword: route.query.keyword,
    industry_division: route.query.industry_division,
    type: route.query.type,
})

// getPassDA(1).then(res => {
//     if (res.status == 200) {
//         if (res.data.data != null) {
//             OwnerDataAsset.arr = res.data.data
//         }
//     }
// })

// let OwnerDataAsset = reactive<{ arr: any }>({ arr: [] })

const ImgPathRes: UploadProps['onSuccess'] = (res: any, file: UploadFile, files: UploadFiles) => {
    DataProductForm.pre_img = res.data
}

const toConfirm = (item: any) => {
    router.push({
        path: '/s/data-market/confirm',
        query: item
    })
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

.name {
    font-size: xx-large;
}

.asset-info-card {
    padding: 50px 20px 50px 20px;
}

.price {
    font-size: xx-large;
    color: red;
}

.industry {
    margin-top: 20px;
}

.type {
    margin-top: 20px;
    margin-bottom: 50px;
}

.slider {
    margin-top: 30px;
    width: 60%;
    margin-bottom: 30px;
}
.tab-line{
    margin-top: 20px;
    font-size: larger;
}
</style>

