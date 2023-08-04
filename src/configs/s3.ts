import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteBucketCommandOutput,
  ListObjectsCommand,
  HeadObjectCommand,
  PutObjectCommand,
  DeleteObjectOutput,
  ListBucketsOutput,
  CreateBucketOutput,
  ListObjectsOutput,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import configs from "@configs/index";
import path from "path";
import mimeType from "mime-types";
import randomstring from "randomstring";
const { region, endpoint, aws_access_key, aws_secret_key } = configs.s3;
const BUCKET: string = configs.s3.bucket as string;

class Storage {
  static instance: Storage;
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: String(aws_access_key),
        secretAccessKey: String(aws_secret_key),
      },
      region: String(region),
    });
  }

  public listBuckets(): Promise<ListBucketsOutput> {
    return this.s3.send(new ListBucketsCommand({}));
  }
  public createBucket(bucketName: string): Promise<CreateBucketOutput> {
    return this.s3.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      })
    );
  }

  public deleteBucket(bucketName: string): Promise<DeleteBucketCommandOutput> {
    return this.s3.send(
      new DeleteBucketCommand({
        Bucket: bucketName,
      })
    );
  }

  public listObjects(bucketName: string = BUCKET): Promise<ListObjectsOutput> {
    return this.s3.send(
      new ListObjectsCommand({
        Bucket: bucketName,
      })
    );
  }

  private async uniqueFileName(
    mimetype: string,
    bucket: string = BUCKET,
    folder: string = "/"
  ): Promise<string> {
    const fileName: string = `${randomstring.generate(8)}.${mimeType.extension(mimetype)}`;
    try {
      await this.s3.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: path.join(folder, fileName).replace(/\\/g, "/"),
        })
      );
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
    await this.s3.send(
      new PutObjectCommand({
        ContentType,
        Bucket: bucket,
        Key: fileName,
        Body: file.buffer,
      })
    );
    return fileName;
  }
  public deleteObject(
    fileName: string,
    bucket: string = BUCKET,
    folder: string = "/"
  ): Promise<DeleteObjectOutput> {
    const key: string = path.join(folder, fileName).replace(/\\/g, "/");
    return this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
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
