import AWS from "aws-sdk";
import configs from "@configs/index";
import path from "path";
import mimeType from "mime-types";
import randomstring from "randomstring";
const { region, endpoint, aws_access_key, aws_secret_key } = configs.s3;
const BUCKET: string = configs.s3.bucket as string;

class Storage {
  static instance: Storage;
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: new AWS.Endpoint(String(endpoint)),
      credentials: {
        accessKeyId: String(aws_access_key),
        secretAccessKey: String(aws_secret_key),
      },
      region: String(region),
    });
  }

  public async listBuckets(): Promise<AWS.S3.ListBucketsOutput> {
    return await new Promise((resolve, reject) => {
      this.s3.listBuckets((err: AWS.AWSError, data: AWS.S3.ListBucketsOutput) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
  public async createBucket(bucketName: string): Promise<AWS.S3.CreateBucketOutput> {
    const bucketParams: AWS.S3.Types.CreateBucketRequest = {
      Bucket: bucketName,
    };

    return await new Promise((resolve, reject) => {
      this.s3.createBucket(bucketParams, (err: AWS.AWSError, data: AWS.S3.CreateBucketOutput) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  public async deleteBucket(bucketName: string): Promise<any> {
    const bucketParams: AWS.S3.Types.DeleteBucketRequest = {
      Bucket: bucketName,
    };

    return await new Promise((resolve, reject) => {
      this.s3.deleteBucket(bucketParams, (err: AWS.AWSError, data: {}) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  public async listObjects(bucketName: string = BUCKET): Promise<any> {
    const bucketParams: AWS.S3.Types.ListObjectsRequest = {
      Bucket: bucketName,
    };

    return await new Promise((resolve, reject) => {
      this.s3.listObjects(bucketParams, (err: AWS.AWSError, data: AWS.S3.ListObjectsOutput) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  private async uniqueFileName(
    mimetype: string,
    bucket: string = BUCKET,
    folder: string = "/"
  ): Promise<string> {
    const fileName: string = `${randomstring.generate(8)}.${mimeType.extension(mimetype)}`;
    try {
      await this.s3
        .headObject({
          Bucket: bucket,
          Key: path.join(folder, fileName).replace(/\\/g, "/"),
        })
        .promise();
    } catch (e: any) {
      if (e.name === "NotFound") {
        return fileName;
      }
      console.error(e);
      throw "Error from server";
    }

    return await this.uniqueFileName(folder, mimetype, bucket);
  }

  public async uploadObject(
    file: Express.Multer.File,
    bucket: string = BUCKET,
    folder: string = "/",
    ContentType?: string
  ): Promise<string> {
    const fileName: string = await this.uniqueFileName(file.mimetype, bucket, folder);
    await new Promise(async (resolve, reject) => {
      this.s3.putObject(
        {
          ContentType,
          Bucket: bucket,
          Key: fileName,
          Body: file.buffer,
        },
        (err: AWS.AWSError, data: AWS.S3.PutObjectOutput) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });

    return fileName;
  }
  public async deleteObject(
    fileName: string,
    bucket: string = BUCKET,
    folder: string = "/"
  ): Promise<AWS.S3.DeleteObjectOutput> {
    const key: string = path.join(folder, fileName).replace(/\\/g, "/");
    return await new Promise(async (resolve, reject) => {
      this.s3.deleteObject(
        {
          Bucket: bucket,
          Key: key,
        },
        (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  }

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
}

const s3Storage = Storage.getInstance();

export default s3Storage;
