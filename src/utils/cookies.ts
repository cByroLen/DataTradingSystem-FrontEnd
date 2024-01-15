import Cookies from 'js-cookie'
 
// export const TOKEN_KEY = 'TOKEN'
 
export const setToken = (key:any,value:any, cookieExpires:any) => {
  Cookies.set(key, value, { expires: cookieExpires || 1 })
}
 
export const getToken = (key:any) => {
  const token = Cookies.get(key)
  if (token) return token
  else return false
}
 
export const delToken = (key:any) => {
  Cookies.remove(key)
}

export type SystemCookies = {
    id:number,
    name:string,
    authority:string
}