import { DynamicModule, Global, Module } from '@nestjs/common';
import { HTTPModule } from './http/http.module';
import { NATSModule } from './nats/nats.module';
import { TCPModule } from './tcp/tcp.module';

@Global()
@Module({
  // imports: [TCPModule, HTTPModule.forRoot()],
  // controllers: [],
  // providers: [],
  // exports: [TCPModule, HTTPModule.forRoot()],
})
export class MicroservicesModule {
  static forRoot(): DynamicModule {
    const httpModule = HTTPModule.forRoot();
    return {
      module: MicroservicesModule,
      imports: [TCPModule, httpModule, NATSModule],
      exports: [TCPModule, httpModule, NATSModule],
    };
  }
}
