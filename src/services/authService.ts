
import { isAxiosError } from 'axios';
import type { IResponse, IUser } from '../libs/interfaces';
import axiosClient from '../libs/axiosClient';

const AUTH_PATHS = {
    REGISTER: '/api/auth/signUp',
    LOGIN: '/api/auth/signIn',
};

interface ILoginParams {
    email: string;
    password: string;
};

interface IRegisterParams {
    email: string;
    password: string;
    fullName: string;
};



interface IAuthService {
    login: (params: ILoginParams) => Promise<IResponse<{ user: IUser, accessToken: string }>>;
    register: (params: IRegisterParams) => Promise<IResponse<{ user: IUser, accessToken: string }>>;
}

class AuthService implements IAuthService {

    private errorHandler = (error: unknown, defaultMessage: string = 'Unknown Error occurred'): never => {

        if (isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw new Error(defaultMessage);
    }


    login = async (params: ILoginParams): Promise<IResponse<{ user: IUser, accessToken: string }>> => {
        try {

            const result = await axiosClient.post(AUTH_PATHS.LOGIN, params);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);
        }
    };

    register = async (params: IRegisterParams): Promise<IResponse<{ user: IUser, accessToken: string }>> => {
        try {

            const result = await axiosClient.post(AUTH_PATHS.REGISTER, params);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);

        }
    };
}

export default new AuthService();

