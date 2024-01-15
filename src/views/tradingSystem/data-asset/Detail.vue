<template>
        <div class="DAR-container">
        <el-main class="DAR-main-container">
            <el-scrollbar height="839px">
                <div class="DAR-form-container">
                    <el-form :inline="true" class="form" :model="DataAssetRegForm" ref="DataAssetRegFormRef">
                        <h2>资产信息</h2>
                        <el-card shadow="never" class="asset-info-card">
                            <el-form-item label="数据资产名称" style="width: 30%;">
                                <el-input placeholder="请输入名称" v-model="DataAssetRegForm.name" />
                            </el-form-item>
                            <el-form-item label="数据关键词" style="width: 60%;">
                                <el-input placeholder="请输入关键词" v-model="DataAssetRegForm.keyword" />
                            </el-form-item>
                            <el-form-item label="所属行业" style="width: 22%;">
                                <el-select placeholder="请选择所属行业" v-model="DataAssetRegForm.industry_division">
                                    <el-option v-for="item in IndustryDivision" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据种类" style="width: 22%;">
                                <el-select placeholder="请选择数据种类" v-model="DataAssetRegForm.type">
                                    <el-option v-for="item in DataType" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据权属范围" style="width: 22%;">
                                <el-select placeholder="请选择权属范围" v-model="DataAssetRegForm.property_range">
                                    <el-option v-for="item in PropertyRange" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据规模" style="width: 22%;">
                                <el-input placeholder="请输入数据规模" v-model="DataAssetRegForm.size" />
                            </el-form-item>
                        </el-card>

                        <h2>资产凭证</h2>
                        <el-card shadow="never">
                            <el-form-item label="溯源证明文件" class="e3">
                                <el-upload ref="TCDRef" show-file-list="true" :auto-upload="true" drag
                                    action="http://localhost:5173/api/da/TCD" :limit="1" :on-success="TCDpathRes" v-model:file-list="TCDFileList" style="width: 150%;">
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
                            </el-form-item>
                            <el-form-item label="质量评估报告" class="e3">
                                <el-upload ref="QARRef" show-file-list="true" :auto-upload="true" drag
                                    action="http://localhost:5173/api/da/QAR" :limit="1" :on-success="QARpathRes" v-model:file-list="QARFileList" style="width: 150%;">
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
                            </el-form-item>
                        </el-card>

                        <h2>数据内容</h2>
                        <el-card shadow="never">
                            <el-row :gutter="12">
                                <el-col :span="12">
                                    <el-upload ref="DataRef" drag action="http://localhost:5173/api/da/data"
                                        :auto-upload="true" :limit="1" :on-success="DatapathRes" show-file-list="true" v-model:file-list="DataFileList" >
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
                                <el-col :span="12" style="padding-left: 5%;padding-right: 5%;">
                                    <el-form-item label="数据格式" class="e2">
                                        <el-input placeholder="请输入数据格式" v-model="DataAssetRegForm.format"
                                            show-file-list="true" :auto-upload="false" />
                                    </el-form-item>
                                    <el-form-item label="数据采集时间" class="e2">
                                        <el-date-picker type="date" placeholder="请选择数据采集时间"
                                            v-model="DataAssetRegForm.begin_time" />
                                    </el-form-item>
                                    <el-form-item label="数据更新时间" class="e2">
                                        <el-date-picker type="date" placeholder="请选择数据更新时间"
                                            v-model="DataAssetRegForm.renew_time" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-table stripe style="width: 100%">
                                <el-table-column width="180" />
                            </el-table>
                        </el-card>
                        <el-form-item>
                            <el-button type="primary" @click="RenewSubmit(DataAssetRegFormRef)"
                                class="submit-button">提交审核</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-scrollbar>


        </el-main>

    </div>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, UploadFile, UploadFiles, UploadInstance, UploadProps,UploadUserFile } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import {  RenewDA } from '@/api/data_asset'
import { useRoute,useRouter} from 'vue-router'

const FlaskGobalPath = 'http://localhost:5173/files/'

const router = useRouter()
const route = useRoute()


const DataAssetRegFormRef = ref<FormInstance>()

const DataAssetRegForm = reactive({
    id:route.query.id,
    owner_id: route.query.owner_id,
    name:route.query.name,
    keyword: route.query.keyword,
    industry_division: route.query.industry_division,
    type: route.query.type,
    property_range: route.query.property_range,
    size: route.query.size,
    data: route.query.data,
    traceability_certification_documents: route.query.traceability_certification_documents,
    quality_assessment_report: route.query.quality_assessment_report,
    audit_status: route.query.audit_status,
    format: route.query.format,
    begin_time: route.query.begin_time,
    renew_time: route.query.renew_time,
})
const IndustryDivisionModel = ref('')
const IndustryDivision: any = [
    { label: "农、林、牧、渔业", value: "农、林、牧、渔业" },
    { label: "采矿业", value: "采矿业" },
    { label: "制造业", value: "制造业" },
    { label: "电力、热力、燃气及水生产和供应业", value: "电力、热力、燃气及水生产和供应业" },
    { label: "建筑业", value: "建筑业" },
    { label: "交通运输、仓储和邮政业", value: "交通运输、仓储和邮政业" },
    { label: "信息传输、软件和信息技术服务业", value: "信息传输、软件和信息技术服务业" },
    { label: "批发和零售业", value: "批发和零售业" },
    { label: "住宿和餐饮业", value: "住宿和餐饮业" },
    { label: "金融业", value: "金融业" },
    { label: "房地产业", value: "房地产业" },
    { label: "租赁和商务服务业", value: "租赁和商务服务业" },
    { label: "科学研究和技术服务业", value: "科学研究和技术服务业" },
    { label: "水利、环境和公共设施管理业", value: "水利、环境和公共设施管理业" },
    { label: "居民服务、修理和其他服务业", value: "居民服务、修理和其他服务业" },
    { label: "教育", value: "教育" },
    { label: "卫生和社会工作", value: "卫生和社会工作" },
    { label: "文化、体育和娱乐业", value: "文化、体育和娱乐业" },
    { label: "公共管理、社会保障和社会组织", value: "公共管理、社会保障和社会组织" },
    { label: "国际组织", value: "国际组织" },
]
const DataType: any = [
    { label: "数据服务", value: "数据服务" },
    { label: "数据包", value: "数据包" },
    { label: "数据接口（API）", value: "数据接口（API）" },
    { label: "数据报告", value: "数据报告" },
    { label: "数据分析模型", value: "数据分析模型" },
]
const PropertyRange: any = [
    { label: "数据所有权", value: "数据所有权" },
    { label: "数据使用权", value: "数据使用权" },
    { label: "其他", value: "其他" },
]

const TCDFileList  = ref<UploadUserFile[]>([{
    name:DataAssetRegForm.name+'_数据资产溯源文件',
    url: FlaskGobalPath+DataAssetRegForm.traceability_certification_documents
}])
const QARFileList  = ref<UploadUserFile[]>([{
    name:DataAssetRegForm.name+'_数据质量报告',
    url: FlaskGobalPath+DataAssetRegForm.quality_assessment_report
}])
const DataFileList  = ref<UploadUserFile[]>([{
    name:DataAssetRegForm.name+'_数据文件',
    url: FlaskGobalPath+DataAssetRegForm.data
}])

const TCDRef = ref<UploadInstance>()
const QARRef = ref<UploadInstance>()
const DataRef = ref<UploadInstance>()

const TCDpathRes: UploadProps['onSuccess'] = (res: any, file: UploadFile,files:UploadFiles) =>{
    console.log(res.data) 
    DataAssetRegForm.traceability_certification_documents = res.data
}
const QARpathRes: UploadProps['onSuccess'] = (res: any, file: UploadFile,files:UploadFiles) =>{
    console.log(res.data) 
    DataAssetRegForm.quality_assessment_report = res.data
}
const DatapathRes: UploadProps['onSuccess'] = (res: any, file: UploadFile,files:UploadFiles) =>{
    console.log(res.data) 
    DataAssetRegForm.data = res.data
}



const RenewSubmit = (formEL: FormInstance | undefined) => {
    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {
            DataAssetRegForm.audit_status = "已提交审核"
            RenewDA(DataAssetRegForm).then(res => {
                if (res.data.code == 200) {
                    alert("数据资产更新成功！")
                    router.push('/s/data-asset')
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
.e {
    width: 22.933%;
}

.e2 {
    width: 80%;
}

.e3 {
    width: 45%;
}

h2 {
    margin-bottom: 20px;
}

h2:nth-child(n+2) {
    margin-top: 20px;
}

</style>