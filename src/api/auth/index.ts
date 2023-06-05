//Endpoints
import Endpoints from '../endpoints';

//Types
import { ILoginRequest, ILoginResponse } from './types';

//Instances
import { axiosInstance } from '../instance';

//Axios
import { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(Endpoints.AUTH.LOGIN, params);
}

export const refreshToken = (): AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.AUTH.REFRESH)

export const logout = (): AxiosPromise<void> => {
    return axiosInstance.get(Endpoints.AUTH.LOGOUT);
}

export const getProfile = (): AxiosPromise<string> =>
    axiosInstance.get(Endpoints.AUTH.PROFILE);

