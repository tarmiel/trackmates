import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "node:stream";

import { type Config } from "../config/config.js";
import { type S3 } from "./libs/types/types.js";

class BaseS3 implements S3 {
	accessKeyId: string;
	bucket: string;
	region: string;
	secretAccessKey: string;

	constructor(config: Config) {
		this.accessKeyId = config.ENV.AWS_S3.AWS_ACCESS_KEY_ID;
		this.bucket = config.ENV.AWS_S3.S3_BUCKET;
		this.region = config.ENV.AWS_S3.S3_REGION;
		this.secretAccessKey = config.ENV.AWS_S3.AWS_SECRET_ACCESS_KEY;
	}

	async upload(file: Readable, fileName: string): Promise<null | string> {
		return await new Upload({
			client: new S3Client({
				credentials: {
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
				},
				region: this.region,
			}),
			params: {
				ACL: "public-read",
				Body: file,
				Bucket: this.bucket,
				Key: `${Date.now().toString()}-${fileName}`,
			},
		})
			.done()
			.then((result) => result.Location ?? null);
	}
}

export { BaseS3 };
