
import axiosClientInstance from '../libs/axiosClient';

type TUploadToS3Params = {
    file: File;
    url: string;
}

interface IS3Service {
    uploadToS3: (params: TUploadToS3Params) => Promise<void>;
}

class S3Service implements IS3Service {

    uploadToS3 = async ({ file, url }: TUploadToS3Params): Promise<void> => {

        const result = await axiosClientInstance.put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
            transformRequest: [
                (data, headers) => {

                    // remove the Authorization header because it's not needed for S3
                    if (headers.Authorization)
                        delete headers.Authorization;

                    // if (headers?.common?.Authorization)
                    //     delete headers.common.Authorization;

                    return data;
                }
            ]
        });

        console.log('---uploadToS3---');
        console.log(result);



    }

};


export default new S3Service();

