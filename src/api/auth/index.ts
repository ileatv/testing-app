import Endpoint from '../endpoints';
import { ILoginRequest, ILoginResponse } from './types';
import { axiosInstance } from '../instance';
import { AxiosPromise } from 'axios';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> => {
    return axiosInstance.post(Endpoint.AUTH.LOGIN, params);
}