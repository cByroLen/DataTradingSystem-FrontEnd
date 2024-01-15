<template>
    <div class="DAR-container">

        <el-container>
            <el-header class="DAR-header-container">
                <el-form :inline="true" :model="Search" class="demo-form-inline">
                    <el-form-item label="数组资产搜索">
                        <el-input v-model="Search.name" placeholder="请输入搜索关键字" />
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="Search.audit_status" placeholder="请选择审核状态">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SearchSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main class="DAR-main-container">
                <el-table :data="OwnerDataAsset.arr" style="width: 100%" border>
                    <el-table-column prop="name" label="数据名称" width="180" />
                    <el-table-column prop="type" label="数据类型" />
                    <el-table-column prop="keyword" label="关键字" />
                    <el-table-column prop="renew_time" label="数据更新实践" />
                    <el-table-column prop="audit_status" label="审核状态" />

                    <el-table-column label="操作"> 
                        <template #default="scope">
                            <el-button size="small" @click="toDetail(scope.row)">信息更改/数据更新</el-button>
                            
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
import { onScopeDispose, reactive, ref } from 'vue'
import { ElTable } from 'element-plus'
import { getDaOwnerID, getDaCount } from '@/api/data_asset'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { routerKey, useRouter } from 'vue-router'
import { getToken } from '@/utils/cookies'
// 头页搜索部分(最后再做)
const router = useRouter()

const ID:any = getToken('id')

const Search = reactive({
    name: '',
    audit_status: '',
})



const SearchSubmit = () => {
    console.log('submit!')
}

//data
let OwnerDataAsset = reactive<{ arr: string[] }>({ arr: [] })

getDaCount(ID).then(res => {
    if (res.status == 200) {
        console.log(ID);
        
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

getDaOwnerID(ID, page.current_page).then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            OwnerDataAsset.arr = res.data.data
        }
    }
})

const CurrentChange = (val: number) => {
    console.log(`${val} items per page`)
    getDaOwnerID(ID, page.current_page).then(res => {
        if (res.status == 200) {
            if (res.data.data != null) {
                OwnerDataAsset.arr = res.data.data
            }
        }
    })

}
const PrevClick = () => {
    if (page.current_page > 1) {
        page.current_page - 1
        getDaOwnerID(1, page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    OwnerDataAsset.arr = res.data.data
                }
            }
        })
    }


}
const NextClick = () => {
    if (page.current_page < page.element_total) {
        page.current_page + 1
        getDaOwnerID(1, page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    OwnerDataAsset.arr = res.data.data
                }
            }
        })

    }
}

const toDetail = (item:any) =>{
    router.push({
        path:'/s/data-asset/detail',
        query:item
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