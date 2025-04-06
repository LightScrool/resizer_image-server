import { Op } from 'sequelize';

import { Preset, Image, CroppedImage } from '~/models';

type Params = {
    projectAlias: string;
    imageId: string;
    presetAlias: string;
};

export const getImageUrl = async ({
    projectAlias,
    imageId,
    presetAlias,
}: Params): Promise<string | null> => {
    if (presetAlias === 'original') {
        const image = await Image.findOne({
            where: { [Op.and]: { id: imageId, ProjectAlias: projectAlias } },
        });

        return image?.originalLink || null;
    }

    const preset = await Preset.findOne({
        where: {
            [Op.and]: { ProjectAlias: projectAlias, alias: presetAlias },
        },
    });

    if (!preset) {
        return null;
    }

    const image = await CroppedImage.findOne({
        where: {
            [Op.and]: { PresetId: preset.id, ImageId: imageId },
        },
    });

    return image?.link || null;
};
