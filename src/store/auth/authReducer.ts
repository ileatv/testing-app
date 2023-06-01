//ReduxToolkit components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//Описываем интерфейс для редьюсера (слайсера)
export interface AuthState {
    //Хранение access токена при авторизации, если токен заполнен, то пользователь авторизован
    authData: {
        accessToken: string | null
        isLoading: boolean
        error: string | null,
    }

    //Для профиля описываем всё тоже самое
    profileData: {
        profile: string | null,
        isLoading: boolean
        error: string | null,
    }
}

const initialState: AuthState = {
    authData: {
        accessToken: null,
        isLoading: false,
        error: null,
    },

    profileData: {
        profile: null,
        isLoading: false,
        error: null,
    }
}

//Создание редьюсера
export const authReducer = createSlice({
    name: 'auth',
    //Передаем начальное состояние
    initialState,
    //И описываем все его изменения
    reducers: {
        loginStart: (state): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSucess: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loginFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadProfileStart: (state): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: true,
            }
        }),
        loadProfileSucess: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loadProfileFailure: (state, action: PayloadAction<string>): AuthState => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
                error: action.payload,
            }
        }),
        //Описание logout'a, просто описываем его начальное состояние
        logoutSuccess: (): AuthState => initialState,
    },
})

//Все эти функции из экшенов можем передать, чтобы не делать никакие переменные
export const { loadProfileStart, loadProfileSucess, loadProfileFailure, loginStart, loginSucess, loginFailure, logoutSuccess } = authReducer.actions

//Возвращаем редьюсер
export default authReducer.reducer