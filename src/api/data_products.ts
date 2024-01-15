import { request } from '@/utils/request'
import qs from "qs"


const user_url = '/dp'

export function getDpOwnerID(OwnerID:number,page:number){
    return request({
        url:user_url + '?owner_id='+ OwnerID + '&page=' + page,
        method:'get',
    })
}

export function getDpCount(){
    return request({
        url:user_url + '/count',
        method:'get',
    })
}

export function uploadImg(file:any){
    return request({
        url:user_url + '/img',
        method:'POST',
        file:file
    })
}

export function createNewDP(data:any){
    return request({
        url:user_url + '/create',
        method:'POST',
        data: qs.stringify( data )
    })
}

export function renewDP(data:any){
    return request({
        url:user_url + '/renew',
        method:'POST',
        data: qs.stringify( data )
    })
}

export function renewMarketStatus(data:any){
    return request({
        url:user_url + '/renew_market_status',
        method:'POST',
        data: qs.stringify( data )
    })
}

export function countPass(){
    return request({
        url:user_url + '/countPass',
        method:'GET'
    })
}

export function getPass(page:any){
    return request({
        url:user_url + '/getPass?page=' + page,
        method:'GET'
    })
}

export function getProductsAudit(page:any){
    return request({
        url:user_url + '/getProductsAudit?page=' + page,
        method:'GET'
    })
}
export function getProductsAuditCount(){
    return request({
        url:user_url + '/getProductsAuditCount',
        method:'GET'
    })
}


export function renewProductsAudit(data:any){
    return request({
        url:user_url + '/renewProductsAudit',
        method:'post',
        data: qs.stringify(data)
    })
}






