import { routes } from "../routes";

const APP_BACKEND_URL  = "http://localhost:1337";

export function getToken(){
    //return localStorage.getItem(ACCESS_TOKEN_KEY)
    return localStorage.getItem('jwt');
}

export function getBackend(){
    return APP_BACKEND_URL;
}


export function setToken(data){
    //localStorage.setItem(ACCESS_TOKEN_KEY, val)
    console.log(data)
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('userData', JSON.stringify(data.user.username))
}

export function login(username, password){
    //向auth0发起请求
    window.location.href=APP_BACKEND_URL+'/api/connect/auth0';
}

export function logout(){
    //localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem('jwt');
    //localStorage.removeItem('username');
    routes.push('/login')
}


export function authenticate(){
    return getToken() != null && getToken() != undefined
}