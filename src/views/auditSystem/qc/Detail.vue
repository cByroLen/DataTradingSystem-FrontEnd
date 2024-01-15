<template>
    <div class="qc-container">

        <el-main class="qc-main-container">
            <el-scrollbar height="859px">
                <div class="QCform-container">
                    <el-form :model="QCform" label-width="420px" class="form" ref="QCformRef">
                        <!-- 工商信息板块 -->
                        <el-form-item>
                            <div class="tag">工商信息</div>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码">
                            <el-input v-model="QCform.c_unified_social_credit_code" size="large"
                                placeholder="18位统一社会信用代码" />
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="QCform.c_name" size="large" placeholder="请输入市场主体名称" />
                        </el-form-item>
                        <el-form-item label="企业类型">
                            <el-input v-model="QCform.c_type" size="large" placeholder="请输入企业类型" />
                        </el-form-item>
                        <el-form-item label="经营范围">
                            <el-input v-model="QCform.c_scrope" :autosize="{ minRows: 3, maxRows: 5 }" type="textarea"
                                placeholder="请输入企业经营范围" />
                        </el-form-item>
                        <el-form-item label="营业执照">
                            <el-select v-model="QCform.c_license_type" placeholder="证件类型" style="width: 115px"
                                size="large">
                                <el-option label="一般企业" value="1" />
                                <el-option label="个体工商户" value="2" />
                                <el-option label="事业单位" value="3" />
                                <el-option label="政府&组织" value="4" />
                            </el-select>
                            <el-upload ref="CompanyLicense" action="http://localhost:5173/api/user/qc/CL"
                                :auto-upload="true" :limit="1" :on-success="CompanyLicenseRes" show-file-list="true">
                                <el-button color="#626aef" plain type="primary" size="large">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        
                                    </div>
                                </template>
                            </el-upload>
                        </el-form-item>

                        <!-- 经营者信息模块 -->
                        <el-form-item>
                            <div class="tag">经营者信息</div>
                        </el-form-item>
                        <el-form-item label="经营者姓名">
                            <el-input v-model="QCform.m_name" size="large" placeholder="请输入经营者姓名" />
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="QCform.m_phone" size="large" placeholder="请输入经营者手机号码" />
                        </el-form-item>
                        <el-form-item label="经营者证件">
                            <el-input v-model="QCform.m_license" placeholder="请输入经营者证件号"
                                class="input-with-select" size="large">
                                <template #prepend>
                                    <el-select v-model="QCform.m_license_type" placeholder="证件类型"
                                        style="width: 115px" size="large">
                                        <el-option label="身份证" value="1" />
                                        <el-option label="护照" value="2" />
                                        <el-option label="港澳通行证" value="3" />
                                        <el-option label="台胞证" value="4" />
                                        <el-option label="其他" value="5" />
                                    </el-select>
                                </template>
                            </el-input>
                        </el-form-item>

                        <!-- 开户银行信息 -->
                        <el-form-item>
                            <div class="tag">开户银行信息</div>
                        </el-form-item>
                        <el-form-item label="账户信息">
                            <el-upload ref='BankInfo' action="http://localhost:5173/api/user/qc/BI"
                                :auto-upload="true" :limit="1" :on-success="BankInfoRes" show-file-list="true">
                                <el-button color="#626aef" plain type="primary" size="large">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        仅支持单文件上传
                                    </div>
                                </template>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="开户银行">
                            <el-input v-model="QCform.b_bank" size="large" placeholder="请输入开户银行" />
                        </el-form-item>
                        <el-form-item label="开户银行机构">
                            <el-input v-model="QCform.b_institution" size="large" placeholder="请输入开户银行机构" />
                        </el-form-item>
                        <el-form-item label="开户名称">
                            <el-input v-model="QCform.b_account_name" size="large" placeholder="请输入开户名称" />
                        </el-form-item>
                        <el-form-item label="开户账户">
                            <el-input v-model="QCform.b_account" size="large" placeholder="请输入开户账户" />
                        </el-form-item>

                        <!-- 联系信息 -->
                        <el-form-item>
                            <div class="tag">联系人信息</div>
                        </el-form-item>
                        <el-form-item label="联系人姓名">
                            <el-input v-model="QCform.l_name" size="large" placeholder="请输入联系人姓名" />
                        </el-form-item>
                        <el-form-item label="地理区域">
                            <el-cascader size="large" :options="GeographicAreaOption" v-model="QCform.l_area" :props="props"
                                placeholder="请选择地理区域">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="通讯地址">
                            <el-input v-model="QCform.l_address" size="large" placeholder="请输入通讯地址" />
                        </el-form-item>
                        <el-form-item label="邮政编码">
                            <el-input v-model="QCform.l_code" size="large" placeholder="请输入邮政编码" />
                        </el-form-item>
                        <el-form-item label="电子邮箱">
                            <el-input v-model="QCform.l_email" placeholder="请输入联系人电子邮箱" size="large">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="企业网址">
                            <el-input v-model="QCform.l_website" placeholder="请输入企业网址（默认HTTPS）" size="large">
                                <template #prepend>Https://</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="QCform.l_phone" size="large" placeholder="请输入联系人手机号码" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="dialogFormVisible = true">审核</el-button>
                            <el-dialog v-model="dialogFormVisible" title="审核">
                                <el-form :model="renewAuditForm" ref="renewAuditFormRef">
                                    <el-form-item label="审核结果" >
                                        <el-select v-model="renewAuditForm.audit_status" placeholder="请选择审核结果">
                                            <el-option label="通过" value="审核已通过" />
                                            <el-option label="不通过" value="审核未通过" />
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取消</el-button>
                                        <el-button type="primary" @click="RenewAudit(renewAuditFormRef)">
                                            确认
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                </div>
            </el-scrollbar>
        </el-main>
    </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { regionData } from 'element-china-area-data'
import type { UploadProps, UploadFile, UploadFiles, UploadInstance,FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus'
import { renewQCAudit } from '@/api/user'
import { useRoute,useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const dialogFormVisible = ref(false)

const QCformRef  = ref<FormInstance>()
const BankInfo = ref<UploadInstance>()
const CompanyLicense = ref<UploadInstance>()


const QCform = reactive({
    c_unified_social_credit_code: route.query.c_unified_social_credit_code,//统一社会信用代码
    c_name: route.query.c_name,//企业名称
    c_type: route.query.c_type,//企业类型
    c_scrope: route.query.c_scrope,//企业业务范围
    //营业执照
    c_license_type: route.query.c_license_type,//执照类型
    c_license: route.query.c_license,
    m_name: route.query.m_name,//法人姓名
    m_phone: route.query.m_phone,//法人电话
    //法人证件
    m_license_type: route.query.m_license_type,//证件类型
    m_license: route.query.m_license,//证件

    b_account_info: route.query.b_account_info,//开户信息
    b_bank: route.query.b_bank,//开户银行
    b_institution: route.query.b_institution,//开户银行机构
    b_account: route.query.b_account,//开户账户
    b_account_name: route.query.b_account_name,//开户名称

    l_name: route.query.l_name,
    l_area: route.query.l_area,
    l_address:route.query.l_address,
    l_code: route.query.l_code,
    l_email: route.query.l_email,
    l_website: route.query.l_website,
    l_phone: route.query.l_phone,

})

const renewAuditFormRef  = ref<FormInstance>()

const renewAuditForm = reactive({
    id:route.query.id,
    audit_status:''
})

const GeographicAreaOption = regionData



const props = {
    expandTrigger: 'hover' as const,
}

const BankInfoRes: UploadProps['onSuccess'] = (res: any, file: UploadFile,files:UploadFiles) =>{
    QCform.b_account_info = res.data
}
const CompanyLicenseRes: UploadProps['onSuccess'] = (res: any, file: UploadFile,files:UploadFiles) =>{
    QCform.c_license = res.data
}


const RenewAudit = (formEL: FormInstance | undefined) => {
    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {
            renewQCAudit(renewAuditForm).then(res =>{
                if (res.data.code == 200) {
                    ElMessage('审核已完成！')
                    router.push('/as/qc')
                }
                else{
                    ElMessage('审核提交失败！请重新提交')
                }
            })
        }
        else{
            ElMessage('认证资料提交失败！请重新提交')
        }
    })
}

    



</script>

<style>
.qc-container {
    overflow-x: hidden;
    width: auto;
    height: auto;
}

.qc-main-container {
    padding: 0px;
    height: 100%;
}


.QCform-container {
    position: relative;
    overflow: hidden;
}

.form {
    width: 1300px;
    overflow-y: hidden;
}
</style>