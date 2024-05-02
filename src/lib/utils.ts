import { File } from "buffer";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import AWS from "aws-sdk";

export const uploadToS3 = (
  bucketName: string,
  fileName: string,
  buffer: any
) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
    };

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3();

    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({
        ...data,
        object_url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
      });
    });
  });
};
