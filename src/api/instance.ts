//Axios
import axios, { AxiosError } from 'axios';

//Store
import { store } from "../store";

//Endpoints
import Endpoints from "./endpoints";

//Function from actionCreators
import { getAccessToken, logoutUser } from "../store/auth/actionCreators";

//Экземпляр для выполнения HTTP-запросов к API по url-адресу
export const axiosInstance = axios.create({
    baseURL: 'https://api.pfctngr.ru',
})

//Массив url-адресов, для которых не требуется авторизация
const urlsSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REFRESH, Endpoints.AUTH.LOGOUT]

//Перехватчик запросов, функция обратного вызова проверяет, если URL-адрес запроса
//находится в массиве urlsSkipAuth, то запрос выполняется без токена авторизации.
//Этот перехватчик является механизмом автоматической авторизации при каждом запросе, 
//если токен доступа еще действителен.
axiosInstance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {

        config.headers.Authorization = `Bearer ${accessToken}`
        // const autharization = `Bearer ${accessToken}`
        // config.headers = {
        //     ...config.headers,
        //     Authorization: autharization
        // }
    }

    return config
})

//Перехватчик для автоматического завершения сеанса пользователя, если токен доступа устарел
//или не действителен. Если пользователь уже вышел из системы, перехватчик не будет отправлять
//на логаут
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const isLoggedIn = !!store.getState().auth.authData.accessToken

        if ((error.response?.status === 401) && isLoggedIn && error.request.url !== Endpoints.AUTH.LOGOUT) {
            store.dispatch(logoutUser())
        }

        throw error
    }
)