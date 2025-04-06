import request from 'request';

import { ApiError } from '~/errors/api-error';
import { withTryCatch } from '~/helpers/with-try-catch';
import { getImageUrl } from './helpers/get-image-url';

class ImageController {
    getImage = withTryCatch(async (req, res, _next) => {
        const { projectAlias, imageId, presetAlias } = req.params;

        const url = await getImageUrl({ projectAlias, imageId, presetAlias });

        if (!url) {
            throw ApiError.notFound('Image not found');
        }

        request(url).pipe(res);
    });
}

export const imageController = new ImageController();
