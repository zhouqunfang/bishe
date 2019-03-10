import { post } from "../../main";
// export const SignIn = {
//   sign (params){
//     return post('/api/user/sign',params);
//   } 
// }
export const SignIn = params => post('/api/user/sign', params)

