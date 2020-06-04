import axios from 'axios';
let baseUrl = '';
export const unSubmitCase = params=>{
    return axios.get('https://nei.netease.com/api/apimock-v2/e87739b244ae3706efa082ed6c8070b0/unSubmitCase');
}
// export const getUndiagnosedCase = params=>{
//     return axios.get('undiagnosedCase',{params:params});
// }
// export const getUserList = params=>{
//     return axios.get(`${baseUrl}/user/list`,{params:params})
// }
// export const getSysmenu = ()=>{
//     return axios.get('../../menu.json')
// }
// export const getDeleUser = params=>{
//     return axios.get('user/deletUsers',{params:params});
// }
// export const getEditUser = params=>{
//     return axios.get(`${baseUrl}/user/editUser`,{
//         params:params
//     })
// }
// export const getAddUser = params=>{
//     return axios.get(`${baseUrl}/user/addUser`,{
//         params:params
//     })
// }
// export const getDeleteOne = params=>{
//     return axios.get(`${baseUrl}/user/DeleteOne`,{params:params})
// }
// export const testApi = ()=>{
//     return axios.get("/testApi/getkeywhereisddata?CITY_NAME=全省&S_id=B08I00136&callback=")
// }