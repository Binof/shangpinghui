import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  //先从本地存储判断是否已经有该游客token
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //当返回的是null时我们应该向本地存储添加该token
  if (!uuid_token) {
    //生成游客token
    uuid_token = uuidv4();
    //本地存储一次
    localStorage.setItem("UUIDTOKEN", uuid_token)
  }
  //这里必须返回值，拿不到uuid
  return uuid_token
}