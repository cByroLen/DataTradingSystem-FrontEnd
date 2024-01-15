import { request } from '@/utils/request'
import qs from "qs"

const user_url = '/da'

export function getDaOwnerID(OwnerID:number,page:number){
    return request({
        url:user_url + '?owner_id='+ OwnerID + '&page=' + page,
        method:'get',
    })
}

export function getDaCount(OwnerID:number){
    return request({
        url:user_url + '/count' + "?owner_id=" + OwnerID,
        method:'get',
    })
}

export function uploadTCD(file:any){
    return request({
        url:user_url + '/TCD',
        method:'POST',
        file:file
    })
}

export function uploadQAR(file:any){
    return request({
        url:user_url + '/TCD',
        method:'POST',
        file:file
    })
}

export function uploadData(file:any){
    return request({
        url:user_url + '/data',
        method:'POST',
        file:file
    })
}

export function createNewDA(data:any){
    return request({
        url:user_url + '/create',
        method:'POST',
        data: qs.stringify( data )
    })
}

export function RenewDA(data:any){
    return request({
        url:user_url + '/renew',
        method:'POST',
        data: qs.stringify( data )
    })
}
export function getPassDA(owner_id:any){
    return request({
        url:user_url + '/getPass'  + '?owner_id='+ owner_id ,
        method:'GET'
    })
}

export function getAssetAudit(page:any){
    return request({
        url:user_url + '/getAssetAudit'  + '?page='+ page,
        method:'GET'
    })
}

export function getAssetAuditCount(){
    return request({
        url:user_url + '/getAssetAuditCount',
        method:"get"
    })
}
export function renewAssetAudit(data:any){
    return request({
        url:user_url + '/renewAssetAudit',
        method:'POST',
        data: qs.stringify( data )
    })
}
