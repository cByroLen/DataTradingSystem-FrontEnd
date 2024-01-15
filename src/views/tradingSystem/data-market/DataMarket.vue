<template>
    <div class="dm-container">


        <el-card class="selecter-box" shadow="never">
            <el-form :inline="true" class="demo-form-inline" :model="DataMarketSelecter">
                <el-form-item>
                    <div>筛选条件1</div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="SelecterGroup1" size="large">
                        <el-checkbox-button v-for="index in num" :key="index" :label="index">
                            {{ index }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <div>筛选条件2</div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="SelecterGroup2" size="large">
                        <el-checkbox-button v-for="index in num" :key="index" :label="index">
                            {{ index }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <div>筛选条件3</div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="SelecterGroup3" size="large">
                        <el-checkbox-button v-for="index in num" :key="index" :label="index">
                            {{ index }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </el-card>

        <el-form :inline="true" class="form" ref="DataAssetRegFormRef" style="margin-left: 20px;">

            <el-form-item class='row' v-for="item in MarketList.arr" @click="toDetail(item)">
                <el-card class="col" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span class="name">{{ item.name }}</span>
                            <span class="price">{{ item.nominal_price }} 元/件</span>

                        </div>
                    </template>

                    <el-row :gutter="20">
                        <el-col :span="16">
                            <div>产品类型：{{ item.type }}</div>
                            <div>行业所属：{{ item.industry_division }}</div>
                            <div>关键词：{{ item.keyword }}</div>
                            <div>交易权属：{{ item.property_range }}</div>
                        </el-col>
                        <el-col :span="8">
                            <el-image style="width: 100px; height: 100px" :src="FlaskGobalPath+item.pre_img" fit="cover" />
                        </el-col>
                    </el-row>

                    

                    


                </el-card>
            </el-form-item>
        </el-form>

        <el-pagination v-model:current-page="page.current_page" v-model:page-size="page.size"
                    layout="prev, pager, next" :total='page.element_total' @current-change="CurrentChange"
                    @prev-click="PrevClick" @next-click="NextClick" />





    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getTcCount, getTcOwnerID } from '@/api/tranction_contract'
import { countPass , getPass } from '@/api/data_products'

const num = ['1', '2', '3', '4']
const DataMarketSelecter = reactive({
})
const SelecterGroup1 = ref([])
const SelecterGroup2 = ref([])
const SelecterGroup3 = ref([])
const FlaskGobalPath = 'http://localhost:5173/files/'

let MarketList = reactive<{ arr: any }>({ arr: [] })

const router = useRouter()

countPass().then(res => {
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
    size: 6
})

getPass(page.current_page).then(res => {
    if (res.status == 200) {
        if (res.data.data != null) {
            MarketList.arr = res.data.data
        }
    }
})

const CurrentChange = (val: number) => {
    console.log(`${val} items per page`)
    getPass(page.current_page).then(res => {
        if (res.status == 200) {  
            if (res.data.data != null) {
                MarketList.arr = res.data.data
            }
        }
    })

}
const PrevClick = () => {
    if (page.current_page > 1) {
        page.current_page - 1
        getPass(page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    MarketList.arr = res.data.data
                }
            }
        })
    }


}
const NextClick = () => {
    if (page.current_page < page.element_total) {
        page.current_page + 1
        getPass(page.current_page).then(res => {
            if (res.status == 200) {
                if (res.data.data != null) {
                    MarketList.arr = res.data.data
                }
            }
        })

    }
}

const toDetail = (item: any) => {
    router.push({
        path: '/s/data-market/detail',
        query: item
    })
}

</script>
<style scoped>
.dm-container {
    overflow-x: hidden;
    ;
}

.selecter-box {
    margin-bottom: 40px;
}

.col {
    margin-bottom: 15px;
    width: 100%;
}

.row {
    width: 31%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name {
    font-size: xx-large;
}

.price {
    font-size: larger;
    color: red;
}</style>