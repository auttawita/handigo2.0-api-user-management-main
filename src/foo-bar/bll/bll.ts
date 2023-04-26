import { Injectable } from '@nestjs/common';
import { FooBarService } from '../service';

@Injectable()
export class FooBarBLL {
  constructor(private readonly fooBarService: FooBarService) {}
}
