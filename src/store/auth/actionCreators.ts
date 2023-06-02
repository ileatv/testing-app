import { Dispatch } from '@reduxjs/toolkit';
import api from '../../api';
import { ILoginRequest, ILoginResponse } from '../../api/auth/types';
import { loginStart, loginSucess, loginFailure, logoutSuccess, loadProfileStart, loadProfileFailure, loadProfileSucess } from "./authReducer"
// import { history } from '../../utils/history';
import { store } from ".."
import { AxiosPromise } from "axios"
import { isTokenExpired } from "../../utils/jwt"
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';


//асинхронная функция в которой отправляется запрос на логин
export const loginUser =
    (data: ILoginRequest) =>
        async (dispatch: Dispatch): Promise<void | string> => {
            try {
                dispatch(loginStart())

                const res = await api.auth.login(data)

                //Если логирование прошло успешно, то передаём в редьюсер access токен
                dispatch(loginSucess(res.data.accessToken))

                // dispatch(getProfile() as any)
                // return 'NO ERROR'
                // const errorMessage = 'undefined'
                // return errorMessage

            } catch (e: any) {
                console.error(e)

                dispatch(loginFailure(e.message))

                const router = useRouter();

                if (router !== null) {
                    await router.push('/Authorization');
                }

                if (e.response && e.response.status === 401) {
                    const errorMessage = 'Неверный логин или пароль';
                    console.log(errorMessage);
                    console.log(e.response);
                    return errorMessage;

                } else {
                    const errorMessage = 'Произошла ошибка при выполнении запроса';
                    console.log(errorMessage);
                    console.log(e.response);
                    return errorMessage;
                }

                // if (axios.isAxiosError(e)) {
                //     if (e.response && e.response.status === 401) {
                //         const errorMessage = 'Неверный логин или пароль';
                //         console.log(errorMessage);
                //         console.log(e.response);
                //         // return errorMessage;
                //     } else {
                //         const errorMessage = 'Произошла ошибка при выполнении запроса';
                //         console.log(errorMessage);
                //         console.log(e.response);
                //         // return errorMessage;
                //     }
                // } else {
                //     const errorMessage = 'Произошла неизвестная ошибка';
                //     console.log(errorMessage);
                //     console.log(e);
                //     // return errorMessage;
                // }
            }
        }

export const logoutUser = () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await api.auth.logout()

            dispatch(logoutSuccess())

            // const router = useRouter();

            // if (router !== null) {
            //     await router.push('/');
            // }
        } catch (e) {
            console.error(e)
        }
    }

// export const getProfile = () =>
//     async (dispatch: Dispatch<any>): Promise<void> => {
//         try {
//             dispatch(loadProfileStart())

//             const res = await api.auth.getProfile()

//             dispatch(loadProfileSucess(res.data))
//         } catch (e: any) {
//             console.error(e)

//             dispatch(loadProfileFailure(e.message))
//         }
//     }

// // переменная для хранения запроса токена (для избежания race condition)
// let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

// export const getAccessToken =
//     () =>
//         async (dispatch: Dispatch<any>): Promise<string | null> => {
//             try {
//                 const accessToken = store.getState().auth.authData.accessToken

//                 if (!accessToken || isTokenExpired(accessToken)) {
//                     if (refreshTokenRequest === null) {
//                         refreshTokenRequest = api.auth.refreshToken()
//                     }

//                     const res = await refreshTokenRequest
//                     refreshTokenRequest = null

//                     dispatch(loginSucess(res.data.accessToken))

//                     return res.data.accessToken
//                 }

//                 return accessToken
//             } catch (e) {
//                 console.error(e)

//                 return null
//             }
//         }