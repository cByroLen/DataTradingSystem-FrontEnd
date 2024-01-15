import { request } from '@/utils/request'
import qs from "qs"

const user_url = '/user'

export function login(data:any){
    return request({
        url:user_url + '/login',
        method:'post',
        data: qs.stringify( data ),
    })
}

export function reg(data:any){
    return request({
        url:user_url + '/reg',
        method:'post',
        data:qs.stringify( data ),
    })
}

export function newQC(data:any){
    return request({
        url:user_url + '/qc',
        method:'post',
        data:qs.stringify( data ),
    })
}

export function getQCAudit(page:any){
    return request({
        url:user_url + '/getQcAudit?page=' + page,
        method:'get',
    })
}

export function getQCAuditCount(){
    return request({
        url:user_url + '/getQcAuditCount',
        method:'get'
    })
}

export function renewQCAudit(data:any){
    return request({
        url:user_url + '/renewQcAudit',
        method:'post',
        data:qs.stringify( data ),
    })
}


