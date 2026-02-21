
import { isAxiosError } from 'axios';
import type { IResponse, IUser } from '../libs/interfaces';
import axiosClient from '../libs/axiosClient';

const USER_PATHS = {
    GET_PROFILE_AVATAR: '/api/user/get-profile-avatar',
    GET_PROFILE: '/api/user/get-profile',
    GET_ALL_USERS: '/api/user/all',
    GET_AVATAR_PRESIGNED_URL: '/api/user/avatar/presigned-url',
};


interface IUserService {
    getProfileAvatar: () => Promise<IResponse<{ signedUrl: string }>>;
    getProfile: () => Promise<IResponse<IUser>>;
    getAllUsers: () => Promise<IResponse<IUser[]>>;
    getAvatarPresignedUrl: (params: { fileName: string; contentType: string }) => Promise<IResponse<{ uploadUrl: string; key: string }>>;
}

class UserService implements IUserService {

    private errorHandler = (error: unknown, defaultMessage: string = 'Unknown Error occurred'): never => {

        if (isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw new Error(defaultMessage);
    };


    getProfileAvatar = async (): Promise<IResponse<{ signedUrl: string }>> => {
        try {

            const result = await axiosClient.get(USER_PATHS.GET_PROFILE_AVATAR);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);
        }
    };

    getProfile = async (): Promise<IResponse<IUser>> => {
        try {

            const result = await axiosClient.get(USER_PATHS.GET_PROFILE);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);
        }
    };

    getAllUsers = async (): Promise<IResponse<IUser[]>> => {
        try {

            const result = await axiosClient.get(USER_PATHS.GET_ALL_USERS);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);
        }
    };

    getAvatarPresignedUrl = async (params: { fileName: string; contentType: string }): Promise<IResponse<{ uploadUrl: string; key: string }>> => {
        try {

            const result = await axiosClient.post(USER_PATHS.GET_AVATAR_PRESIGNED_URL, params);

            return result.data;

        } catch (error) {
            return this.errorHandler(error);
        }
    };
}

export default new UserService();
