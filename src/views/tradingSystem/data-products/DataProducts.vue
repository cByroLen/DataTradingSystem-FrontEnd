<template>
    <div class="DAR-container">

        <el-container>
            <el-header class="DAR-header-container">
                <el-form :inline="true" :model="Search" class="demo-form-inline">
                    <el-form-item label="搜索框1">
                        <el-input v-model="Search.one" placeholder="Approved by" />
                    </el-form-item>
                    <el-form-item label="搜索框2">
                        <el-select v-model="Search.two" placeholder="Activity zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SearchSubmit">Query</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main class="DAR-main-container">
                <el-table :data="OwnerDataProducts.arr" style="width: 100%" border>
                    <el-table-column prop="name" label="商品名" />
                    <el-table-column prop="nominal_price" label="商品价格" />
                    <el-table-column prop="audit_status" label="商品审核状态" />
                    <el-table-column prop="market_status" label="商品上架状态" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="small" @click="toDetail(scope.row)">商品信息编辑</el-button>
                            <el-button size="small"
                                @click="scope.row.Visable = true, changeMarketStatus(scope.row)">上架状态编辑</el-button>
                            <el-dialog v-model="scope.row.Visable" title="商品状态编辑" append-to-body="true">
                                <el-form :model="changeMarketStatusForm" ref="changeMarketStatusFormRef">
                                    <el-form-item label="商品状态">
                                        <el-select v-model="changeMarketStatusForm.market_status" placeholder="请选择商品状态">
                                            <el-option label="下架" value="未上架" />
                                            <el-option label="上架" value="已上架" />
                                        </el-select>
                                    </el-form-item>

                                </el-form>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="scope.row.Visable = false">取消</el-button>
                                        <el-button type="primary" @click="Submit(changeMarketStatusFormRef)">
                                            确定
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="page.current_page" v-model:page-size="page.size"
                    layout="prev, pager, next" :total='page.element_total' @current-change="CurrentChange"
                    @prev-click="PrevClick" @next-click="NextClick" />
            </el-main>
        </el-container>

    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElTable, type FormInstance } from 'element-plus'
import { getDpOwnerID, getDpCount, renewMarketStatus } from '@/api/data_products'
import { routerKey, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { da } from 'element-plus/es/locale'
import { getToken } from '@/utils/cookies'

const router = useRouter()
const ID:any = getToken('id')



const SearchSubmit = () => {
    console.log('submit!')
}

const Search = reactive({
    one: '',
    two: '',
})

let OwnerDataProducts = reactive<{ arr: string[] }>({ arr: [] })

getDpCount().then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            page.element_total = res.data.data
        }
    }
})

// page_model
let page = reactive({
    current_page: 1,  //从第1页开始的话是这样写;
    element_total: 150, //总页数
    size: 15
})

getDpOwnerID(ID, page.current_page).then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            OwnerDataProducts.arr = res.data.data
        }
    }
})

const CurrentChange = (val: number) => {
    console.log(`${val} items per page`)
    getDpOwnerID(ID, page.current_page).then(res => {
        if (res.status == 200) {
            if (res.data.data != null) {
                OwnerDataProducts.arr = res.data.data
            }
        }
    })

}
const PrevClick = () => {
    if (page.current_page > 1) {
        page.current_page - 1
        getDpOwnerID(ID, page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    OwnerDataProducts.arr = res.data.data
                }
            }
        })
    }


}
const NextClick = () => {
    if (page.current_page < page.element_total) {
        page.current_page + 1
        getDpOwnerID(ID, page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    OwnerDataProducts.arr = res.data.data
                }
            }
        })

    }
}

const toDetail = (item: any) => {
    router.push({
        path: '/s/data-products/detail',
        query: item
    })
}

const changeMarketStatusFormRef = ref<FormInstance>()

const changeMarketStatusForm = reactive({
    id: '',
    market_status: '',
    audit_status: '',
})


const changeMarketStatus = (data: any) => {
    changeMarketStatusForm.id = data.id
    changeMarketStatusForm.market_status = data.market_status
    changeMarketStatusForm.audit_status = data.audit_status
}

const Submit = (formEL: FormInstance | undefined) => {

    if (!formEL) return
    formEL.validate((valid) => {
        if (valid) {

            if (changeMarketStatusForm.market_status == "已上架" && changeMarketStatusForm.audit_status != '审核已通过') {
                ElMessage('商品尚未通过审核，暂不能修改其上架状态')
            }
            else {
                renewMarketStatus(changeMarketStatusForm).then(res => {
                    ElMessage(res.data.msg)
                    router.push('/s/data-products')
                })
            }

        } else {
            console.log('提交错误，请稍后再试')
            return false
        }
    })
}



</script>

<style scoped>
.DAR-header-container {
    /* border: 1px solid #eee; */
    padding: 0px;
    border-radius: 6px;
    margin: 10px 0px 0px 20px;
    background-color: #fff;
}
</style>