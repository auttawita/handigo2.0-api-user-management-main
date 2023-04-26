import { Msg } from 'nats';
export interface NatsListener {
  natsCallback(m: Msg, err?: any);
}
