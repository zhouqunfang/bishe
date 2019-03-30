//验证手机号
export const phonetest = phone=> {
  var reg = /^1(3|4|5|7|8)\d{9}$/;
  if (!reg.test(phone)) {
    return true
  }else{
    return false
  }
}
//验证中文姓名
export const nametest = name => {
  var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
  if (!nameReg.test(name)) {
    return true
  } else {
    return false
  }
}
