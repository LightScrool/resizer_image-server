import { S3_BUCKET_NAME, S3_ENDPOINT_URL } from '~/config';

type Params = {
    projectAlias: string;
    imageId: string;
    presetAlias: string;
};

export const getImageUrl = ({
    projectAlias,
    imageId,
    presetAlias,
}: Params): string => {
    return [S3_ENDPOINT_URL, S3_BUCKET_NAME, projectAlias, imageId, presetAlias]
        .map((str) => (str.endsWith('/') ? str.slice(0, -1) : str))
        .join('/');
};
