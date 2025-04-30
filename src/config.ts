import dotenv from 'dotenv';

dotenv.config();

const ENV_S3_ENDPOINT_URL = process.env.S3_ENDPOINT_URL;
const ENV_S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

if (!ENV_S3_ENDPOINT_URL) {
    throw new Error('"S3_ENDPOINT_URL" enviroment variable not specified');
}

if (!ENV_S3_BUCKET_NAME) {
    throw new Error('"S3_BUCKET_NAME" enviroment variable not specified');
}

export const S3_ENDPOINT_URL = ENV_S3_ENDPOINT_URL;
export const S3_BUCKET_NAME = ENV_S3_BUCKET_NAME;
