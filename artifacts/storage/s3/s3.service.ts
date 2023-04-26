import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from './core/s3.client';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client(this.getConfiguration());
  }

  getConfiguration(): string {
    return this.configService.get('AWS_CREDENTIALS');
  }

  getS3Client(): S3Client {
    return this.s3Client;
  }
}
