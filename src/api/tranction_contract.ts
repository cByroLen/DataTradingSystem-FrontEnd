import { request } from '@/utils/request'
import qs from "qs"

const user_url = '/tc'

export function getTcOwnerID(BuyerID:number,page:number){
    return request({
        url:user_url + '?buyer_id='+ BuyerID + '&page=' + page,
        method:'get',
    })
}

export function getTcCount(){
    return request({
        url:user_url + '/count',
        method:'get',
    })
}

export function createNewTC(data:any){
    return request({
        url:user_url + '/create',
        method:'POST',
        data: qs.stringify( data )
    })
}



