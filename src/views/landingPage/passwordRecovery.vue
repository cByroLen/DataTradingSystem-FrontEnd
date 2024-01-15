<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, TabsPaneContext } from 'element-plus'
import { Iphone, Crop, Lock, Message } from '@element-plus/icons-vue';

const recoveryMethod = ref('first')
const recoveryRuleFormRef = ref<FormInstance>()
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const phoneCheck = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入手机号'))
    } else {
        let phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        if (phoneReg.test(value)) {
            callback()
        }
        else {
            callback(new Error('请输入正确格式的手机号'))
        }
    }
}//手机不为空且手机格式正确


const phoneVcCheck = (rule: any, value: any, callback: any) => {
    callback()
}


const emailCheck = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入邮箱'))
    } else {
        let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (emailReg.test(value)) {
            callback()
        }
        else {
            callback(new Error('请输入正确格式的邮箱'))
        }
    }
}//邮箱不为空且手机格式正确

const emailVcCheck = (rule: any, value: any, callback: any) => {
    callback()
}

const recoveryRuleForm = reactive({
    phone: '',
    phoneVC: '',
    email: '',
    emailVC: '',
})

const signRules = reactive({
    phone: [{ validator: phoneCheck, trigger: 'blur' }],
    phoneVC: [{ validator: phoneVcCheck, trigger: 'blur' }],
    email: [{ validator: emailCheck, trigger: 'blur' }],
    emailVC: [{ validator: emailVcCheck, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('登录成功!')
        } else {
            console.log('用户名或密码错误!')
            return false
        }
    })
}//表单提交

</script>

<template>
    <div class="main-container">
        <div>
            <el-tabs v-model="recoveryMethod" class="login-method-tabs" @tab-click="handleClick">
                <!-- 电话找回 -->
                <el-tab-pane label="手机找回" name="first">
                    <el-form ref="signRuleFormRef" :model="recoveryRuleForm" status-icon :rules="signRules"
                        label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="phone">
                            <el-input v-model="recoveryRuleForm.phone" autocomplete="off" size="large" placeholder="请输入手机号"
                                :prefix-icon="Iphone" />
                        </el-form-item>

                        <el-form-item prop="phoneVC">
                            <el-input v-model="recoveryRuleForm.phoneVC" type="password" autocomplete="off" size="large"
                                placeholder="请输入验证码" :prefix-icon="Lock">
                                <template #append>
                                    <el-button color="#626aef">获取验证码</el-button>
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm(recoveryRuleFormRef)" class="submit-button"
                                size="large">认证</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- 邮箱找回 -->
                <el-tab-pane label="邮箱找回" name="second">
                    <el-form ref="signRuleFormRef" :model="recoveryRuleForm" status-icon :rules="signRules"
                        label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="email">
                            <el-input v-model="recoveryRuleForm.phone" autocomplete="off" size="large" placeholder="请输入邮箱"
                                :prefix-icon="Message" />
                        </el-form-item>
                        <el-form-item prop="emailVC">
                            <el-input v-model="recoveryRuleForm.phoneVC" type="password" autocomplete="off" size="large"
                                placeholder="请输入验证码" :prefix-icon="Lock">
                                <template #append>
                                    <el-button color="#626aef">获取验证码</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(recoveryRuleFormRef)" class="submit-button"
                                size="large">认证</el-button>
                        </el-form-item>
                    </el-form>

                </el-tab-pane>

            </el-tabs>

        </div>
    </div>
</template>

<style scoped>
.main-container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}

.main-container>div {
    width: 30%;
    margin: auto;
    margin-top: 5em;

}

.submit-button {
    width: 100%;
    height: 100%;
}
</style>