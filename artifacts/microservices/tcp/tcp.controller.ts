import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MicroservicePayloadDTO } from '../common/dto/microservice-payload.dto';
import { EVENT_PATTERN, MESSAGE_PATTERN } from './tcp.constants';
import { TCPService } from './tcp.service';

@Injectable()
@Controller()
export class TCPController {
  constructor(private readonly tcpService: TCPService) {}

  @MessagePattern(MESSAGE_PATTERN)
  messageHandler(payload: MicroservicePayloadDTO) {
    console.log('messageHandler', payload);
    return this.tcpService.onTCPMessageHandler(payload);
  }

  @EventPattern(EVENT_PATTERN)
  async eventHandler1(payload: MicroservicePayloadDTO) {
    console.log('eventHandler1', payload);
    return this.tcpService.onTCPMessageHandler(payload);
  }

  @EventPattern(EVENT_PATTERN)
  async eventHandler2(payload: MicroservicePayloadDTO) {
    console.log('eventHandler2', payload);
    return this.tcpService.onTCPMessageHandler(payload);
  }
}
