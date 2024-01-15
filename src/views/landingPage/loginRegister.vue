<template>
    <div class="main-container">
        <!-- <indexHeader /> -->
        <el-row :gutter="20">

            <el-col :span="16">
                欢迎使用电力数据交易平台
            </el-col>


            <el-col :span="8">
                <!-- 登陆部分 -->
                <div v-if="loginState" class="sign">
                    <!-- 多种登陆方式的选择 -->
                    <el-tabs v-model="loginMethod" class="login-method-tabs" @tab-click="handleClick">
                        <!-- 手机号密码登录 -->
                        <el-tab-pane label="密码登录" name="first">
                            <!-- 手机号密码表单 -->
                            <el-form ref="signRuleFormRef" :model="loginForm" status-icon :rules="loginRules"
                                label-width="0px" class="demo-ruleForm">
                                <el-form-item prop="phone">
                                    <el-input v-model="loginForm.phone" autocomplete="off" size="large" placeholder="请输入用户名"
                                        :prefix-icon="User" />
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="loginForm.password" type="password" autocomplete="off"
                                        size="large" placeholder="请输入密码" :prefix-icon="Key" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="loginSubmitForm(signRuleFormRef)" class="submit-button"
                                        size="large">登录</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <div>
                                        <a href="/repwd">忘记密码</a>
                                        <a href="#" @click="loginState = !loginState">立即注册</a>
                                    </div>

                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <!-- 扫码登录 -->
                        <el-tab-pane label="扫码登陆" name="second">

                        </el-tab-pane>

                    </el-tabs>
                </div>
                <!-- 注册部分 -->
                <div v-else class="sign">
                    <el-tabs v-model="loginMethod" class="login-method-tabs" @tab-click="handleClick">
                        <el-tab-pane label="新用户注册" name="first">
                            <el-form ref="signRuleFormRef" :model="regForm" status-icon :rules="regRules">
                                <el-form-item prop="id">
                                    <el-input v-model="regForm.id" autocomplete="off" size="large" placeholder="请输入用户名"
                                        :prefix-icon="User" />
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="regForm.password" type="password" autocomplete="off"
                                        size="large" placeholder="请输入密码" :prefix-icon="Key" />
                                </el-form-item>
                                <el-form-item prop="phone">
                                    <el-input v-model="regForm.phone" autocomplete="off" size="large"
                                        placeholder="请输入手机号码" :prefix-icon="Iphone">
                                        <template #append>
                                            <el-button color="#626aef">获取验证码</el-button>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <!-- <el-form-item prop="phoneVC">
                                    <el-input v-model="regForm.phoneVC" autocomplete="off" size="large"
                                        placeholder="请输入验证码" :prefix-icon="Crop" />
                                </el-form-item> -->
                                <el-form-item prop="email">
                                    <el-input v-model="regForm.email" autocomplete="off" size="large"
                                        placeholder="请输入电子邮箱" :prefix-icon="Message" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="regSubmitForm(signRuleFormRef)" class="submit-button"
                                        size="large">注册</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <a href="#" @click="loginState = !loginState">立即登录</a>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type TabsPaneContext } from 'element-plus'
import { Crop, Iphone, Key, Message, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { login, reg } from '@/api/user'
import { setToken } from '@/utils/cookies'


const loginState = ref(true)
let router = useRouter()
// ***登录表单***/


const signRuleFormRef = ref<FormInstance>()

const idNotNonCheck = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    }
    callback()
} //id不为空
const passwordNotNonCheck = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }
    callback()
}//密码不为空
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
}//手机验证码格式正确
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


const regForm = reactive({
    id: '',
    password: '',
    phone: '',
    // phoneVC: '',
    email: '',
})


const loginForm = reactive({
    phone: '',
    password: '',
})

// 登录表单规则
const loginRules = reactive({
    phone: [{ validator: phoneCheck, trigger: 'blur' }],
    password: [{ validator: passwordNotNonCheck, trigger: 'blur' }],
    
})

// 注册表单规则
const regRules = reactive({
    id: [{ validator: idNotNonCheck, trigger: 'blur' }],
    password: [{ validator: passwordNotNonCheck, trigger: 'blur' }],
    phone: [{ validator: phoneCheck, trigger: 'blur' }],
    phoneVC: [{ validator: phoneVcCheck, trigger: 'blur' }],
    email: [{ validator: emailCheck, trigger: 'blur' }],
})


// *登录* //
const loginSubmitForm = (formEL: FormInstance | undefined) => {
    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {
            login(loginForm).then(res => {
                ElMessage(res.data.msg)
                if(res.data.code == 200){
                    setToken('id',res.data.data.id,1)
                    setToken('name',res.data.data.name,1)
                    setToken('authority',res.data.data.authority,1)
                    if(res.data.data.authority == '管理员') router.push('/as')
                    else router.push('/s/user')
                }     
            })

        } else {
            console.log('用户名或密码错误!')
            return false
        }
    })
}
// 注册
const regSubmitForm = (formEL: FormInstance | undefined) => {
    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {
            reg(regForm).then(res =>{
                if (res.status == 200){
                    ElMessage(res.data.msg)

                    if(res.data.code == 200){
                        // router.push('/login')
                        console.log('注册成功!')
                    }
                    else{
                        console.log('注册失败!')
                    }
                    
                }
            })

            
            router.push('/')
        } else {
            console.log('用户名或密码错误!')
            return false
        }
    })
}



// ***登录表单***//


// ***登录模式切换表***//
const loginMethod = ref("first")

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
// ***登录模式切换表***//
</script>

<style scoped>
.main-container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}


.sign {
    position: relative;
    margin-top: 5em;
    width: 350px;
    /* height: 400px; */
    /* border: 1px solid black; */
    padding: 10px;
    background-color: #fff;
}

.submit-button {
    width: 100%;
    height: 100%;
}

.login-method-tabs {
    font-size: large;
}

a {
    font-size: small;
    margin-right: 10px;
}
</style>