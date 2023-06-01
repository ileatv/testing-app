import Endpoints from '../endpoints';
import { ILoginRequest, ILoginResponse } from './types';
import { axiosInstance } from '../instance';
import { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(Endpoints.AUTH.LOGIN, params);
}

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH)

export const logout = (): AxiosPromise<void> => {
    // return axiosInstance.get(Endpoints.AUTH.LOGOUT);
    const url = Endpoints.AUTH.LOGOUT + `?_=${Math.random()}`;
    return axiosInstance.get(url);
}

// export const getProfile = (): AxiosPromise<string> =>
//     axiosInstance.get(Endpoints.AUTH.PROFILE);

