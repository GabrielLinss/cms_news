import Image from '../models/Image';
import AWS from 'aws-sdk';

class ImageController {
    async store(req, res) {
        try {
            const data = req.files;
            let { post_id } = req.body;

            const images = [];

            for (const file of data) {
                let img = file;

                let image = await Image.create({
                    post_id,
                    legend: img.originalname,
                    size: img.size,
                    key: img.key,
                    url: img.location
                });

                images.push(image);
            }

            return res.status(201).json(images);
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }

    async destroy(req, res) {
        try {
            const image = await Image.findByPk(req.params.id);

            if (!image) return res.status(404).json([{ message: 'Image not found' }]);

            if (image.url && process.env.STORAGE_TYPE === 'S3') {
                const s3 = new AWS.S3();
                const params = {
                    Bucket: process.env.STORAGE_BUCKET,
                    Key: image.key
                };

                try {
                    await s3.headObject(params).promise();

                    try {
                        await s3.deleteObject(params).promise();
                    }
                    catch (error) {
                        return res.status(500).json([{ message: error }]);
                    }
                } catch (error) {
                    return res.status(500).json([{ message: error }]);
                }
            }

            await image.destroy();

            return res.status(204).send();
        } catch (error) {
          console.log(error);
          return res.status(500).json([{ message: 'Server error' }]);
        }
    }
}

export default ImageController;
