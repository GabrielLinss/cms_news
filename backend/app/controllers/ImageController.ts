import Image from '../models/Image';
import { Request, Response } from 'express';
import { config } from 'dotenv';
import AWS from 'aws-sdk';

config();

interface IImage extends Image {
    post_id?: number;
    url?: string;
    key?: string;
}

interface File {
    originalname: string;
    size: number;
    key: string;
    location: string;
}

interface IReq extends Request {
    files: [];
}

class ImageController {
    public async store(req: IReq, res: Response): Promise<Response> {
        try {
            const data = req.files;
            let { post_id }: IImage = req.body;

            const images = [];

            for (const file of data) {
                let img: File = file;

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
            return res.status(500).json([{ message: error }]);
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        try {
            const image: IImage = await Image.findByPk(req.params.id);

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
            return res.status(500).json([{ message: error }]);
        }
    }
}

export default ImageController;
