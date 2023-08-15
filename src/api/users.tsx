import axios from 'axios';
import User from '../models/User';

export async function registerUser(user: any) {
    const response = await fetch(`http://localhost:5213/api/account/register-avatar-no`, {
        method: "POST",
        mode: 'no-cors',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: JSON.stringify(user)
    });

    return response.json()
}

/*
export async function registerUserAxios(user: any) {
axios({
    method: "post",
    url: "http://localhost:5213/api/account/register-avatar",
   
    data: user,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      
      console.log(response);
      return response.data;
    })
    .catch(function (response) {
     
      console.log(response);
      return response;
    });
}
*/
const usersAxios = axios.create({
    baseURL:"http://localhost:5213/api/account",
    headers: {"Content-Type": "multipart/form-data"}
})

const usersAxiosNoH = axios.create({
    baseURL:"http://localhost:5213/api/account",
   
})

const graduateAxios = axios.create({
    baseURL:"http://localhost:5213/api/graduate",
   
})

export const registerUserAxios = async (user:any) => {
    return await usersAxios.post("/register-avatar-n", user)
}


export const loginUserAxios = async (user:any) => {
    return await usersAxiosNoH.post("/login", user)
}

export const registerGraduateAxios = async (graduate:any) => {
    return await graduateAxios.post("/graduate", graduate)
}