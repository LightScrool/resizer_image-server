import request from 'request';

import { withTryCatch } from '~/helpers/with-try-catch';
import { getImageUrl } from './helpers/get-image-url';

class ImageController {
    getImage = withTryCatch(async (req, res, _next) => {
        const { projectAlias, imageId, presetAlias } = req.params;

        const url = getImageUrl({ projectAlias, imageId, presetAlias });

        request(url).pipe(res);
    });
}

export const imageController = new ImageController();
