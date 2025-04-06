import { Op } from 'sequelize';
import { ApiError } from '~/errors/api-error';
import { withTryCatch } from '~/helpers/with-try-catch';
import { Preset, Image, CroppedImage } from '~/models';

class ImageController {
    getImage = withTryCatch(async (req, res, _next) => {
        const { projectAlias, imageId, presetAlias } = req.params;

        if (presetAlias === 'original') {
            const image = await Image.findOne({ where: { id: imageId } });

            if (!image) {
                throw ApiError.notFound('Image not found');
            }

            res.json({ url: image.originalLink });
        }

        const preset = await Preset.findOne({
            where: {
                [Op.and]: { ProjectAlias: projectAlias, alias: presetAlias },
            },
        });

        if (!preset) {
            throw ApiError.notFound('Preset not found');
        }

        const image = await CroppedImage.findOne({
            where: {
                [Op.and]: { PresetId: preset.id, ImageId: imageId },
            },
        });

        if (!image) {
            throw ApiError.notFound('Image not found');
        }

        res.json({ url: image.link });
    });
}

export const imageController = new ImageController();
