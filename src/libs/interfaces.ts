export interface IUser {
   password: string;
    id: string;
    email: string;
    fullName: string;
    avatarS3FileName: string | null;
    avatarS3Folder: string | null;
    createdAt: Date;
    updatedAt: Date;
};



export type optionsType = {
    [key: string]: unknown;
};

export interface IResponse<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;

}