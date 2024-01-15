<template>
    <div class="DPD-container">
        <el-main class="DPD-main-container">
            <el-form :inline="true" class="form" :model="DataProductRegForm" ref="DataProductRegFormRef">
                <el-card shadow="never" class="asset-info-card">
                    <el-form-item label="数据资产" style="width: 30%;">
                        <el-select placeholder="请选择数据已注册的数据资产" v-model="DataProductRegForm.data_asset_id"
                            style="width: 100%;">
                            <el-option v-for="item in OwnerDataAsset.arr" :key="item.name" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据商品名" style="width: 30%;">
                        <el-input placeholder="请输入名称" v-model="DataProductRegForm.name" />
                    </el-form-item>
                    <el-form-item label="数据商品名" style="width: 25%;">
                        <el-input placeholder="请输入定价" v-model="DataProductRegForm.nominal_price" />
                    </el-form-item>
                    <el-form-item label="交易权限" style="width: 45%;">
                        <el-select placeholder="请选择权属范围" v-model="DataProductRegForm.property_range" style="width:100%">
                            <el-option v-for="item in PropertyRange" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权益期限" style="width: 45%;">
                        <el-date-picker type="date" placeholder="请选择权属有效时间" v-model="DataProductRegForm.time_limit"  style="width:100%"/>
                    </el-form-item>
                </el-card>
                <el-card shadow="never">
                    <el-row :gutter="12">
                        <el-col :span="8">
                            <el-upload ref="DataRef" drag action="http://localhost:5173/api/dp/img" :auto-upload="true"
                                :limit="1" show-file-list="true" list-type="picture" :on-success="ImgPathRes" v-model:file-list="ImgFileList">
                                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                                <div class="el-upload__text">
                                    拖动文件上传 或 <em>点击上传</em>
                                </div>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        仅支持单文件上传
                                    </div>
                                </template>
                            </el-upload>

                        </el-col>
                        <el-col :span="16" style="padding-left: 5%;padding-right: 5%;">
                            <el-form-item label="产品描述" class="e2" style="width: 100%;">
                                <el-input placeholder="请输入数据格式" v-model="DataProductRegForm.products_description"
                                    :autosize="{ minRows: 5, maxRows: 8 }" type="textarea" />
                            </el-form-item>
                            <el-form-item label="应用场景" class="e2" style="width: 100%;">
                                <el-input placeholder="请输入数据格式" v-model="DataProductRegForm.application_scenario"
                                    :autosize="{ minRows: 5, maxRows: 8 }" type="textarea" />
                            </el-form-item>

                        </el-col>
                    </el-row>

                </el-card>
                <el-form-item>
                    <el-button type="primary" @click="RenewSubmit(DataProductRegFormRef)"
                        class="submit-button">更新信息</el-button>
                </el-form-item>


            </el-form>

        </el-main>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getPassDA } from '@/api/data_asset'
import { renewDP } from '@/api/data_products'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile, UploadFiles, FormInstance, UploadUserFile } from 'element-plus';
import { useRoute,useRouter} from 'vue-router'
import { getToken } from '@/utils/cookies'

const ID:any = getToken('id')
const PropertyRange: any = [
    { label: "数据所有权", value: "数据所有权" },
    { label: "数据使用权", value: "数据使用权" },
    { label: "其他", value: "其他" },
]

const FlaskGobalPath = 'http://localhost:5173/files/'
const router = useRouter()
const route = useRoute()

const DataProductRegFormRef = ref<FormInstance>()

const DataProductRegForm = reactive({
    id:route.query.id,
    name: route.query.name,
    audit_status: route.query.audit_status,
    market_status:route.query.market_status,
    nominal_price:route.query.nominal_price ,
    pre_img: route.query.pre_img,
    products_description: route.query.products_description,
    application_scenario: route.query.application_scenario,
    data_asset_id: route.query.data_asset_id,
    owner_id: route.query.owner_id,
    property_range: route.query.property_range,
    time_limit: route.query.time_limit,
})

getPassDA(ID).then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            OwnerDataAsset.arr = res.data.data
        }
    }
})

let OwnerDataAsset = reactive<{ arr: any }>({ arr: [] })
const ImgFileList  = ref<UploadUserFile[]>([{
    name:DataProductRegForm.name+'_商品图片.jpg',
    url: FlaskGobalPath+DataProductRegForm.pre_img
}])

const ImgPathRes: UploadProps['onSuccess'] = (res: any, file: UploadFile, files: UploadFiles) => {
    DataProductRegForm.pre_img = res.data
}
const RenewSubmit = (formEL: FormInstance | undefined) => {
    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {
            // DataProductRegForm.audit_status = "已提交审核"
            renewDP(DataProductRegForm).then(res => {
                if (res.data.code == 200) {
                    alert("数据商品信息修改成功!请等待后台审核")
                    router.push('/s/data-products')
                }
                else {
                    alert('提交错误，请稍后再试')
                }
            })

        } else {
            console.log('提交错误，请稍后再试')
            return false
        }
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
</style>

