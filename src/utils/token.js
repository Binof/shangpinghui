//专门出路token值

//对外暴露一个存储token的函数
export const setToken = (token) => {
  return localStorage.setItem('TOKEN', token)
}
//获取token值的函数
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
//清除token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}