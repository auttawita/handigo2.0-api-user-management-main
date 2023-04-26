import { Logger } from '@nestjs/common';
import {
  connect,
  JSONCodec,
  NatsConnection,
  StringCodec,
  Subscription,
} from 'nats';
import { NatsListener } from './nats.listener';

export class NATSClient {
  private servers = [
    // { servers: 'localhost:4222' },
    // { servers: ['demo.nats.io:4442', 'demo.nats.io:4222'] },
    // { servers: 'demo.nats.io:4443' },
    // { port: 4222 },
    // { servers: 'localhost' },
  ];

  private nc: NatsConnection;
  private subscriptions: Map<string, Subscription>;
  private listeners: Map<string, NatsListener>;

  constructor(servers: []) {
    this.servers = servers;
    this.subscriptions = new Map<string, Subscription>();
    this.listeners = new Map<string, NatsListener>();
  }

  getNatsListener(key: string): NatsListener {
    return this.listeners.get(key);
  }

  setNatsListener(key: string, listener: NatsListener) {
    this.listeners.set(key, listener);
  }

  clearNatsListener() {
    this.listeners.clear();
  }

  /**
   * Connect to NATS server
   */
  async connect() {
    for (let i = 0; i < this.servers.length; i++) {
      try {
        this.nc = await connect(this.servers[i]);
        // console.log(`connected to ${this.nc.getServer()}`);

        // // this promise indicates the client closed
        // const done = nc.closed();

        // // do something with the connection
        // // close the connection
        // await nc.close();

        // // check if the close was OK
        // const err = await done;
        // if (err) {
        //   console.log(`error closing:`, err);
        // }
      } catch (err) {
        Logger.error(
          err,
          `error connecting to ${JSON.stringify(this.servers[i])}`,
          NATSClient.name,
        );
      }
    }
  }

  subscribe(subject: string, queue?: string, callback?: (t: any) => void) {
    let sub: Subscription;
    if (queue) {
      sub = this.nc.subscribe(subject, { queue: queue });
    } else {
      sub = this.nc.subscribe(subject);
    }
    this.subscriptions.set(subject, sub);

    // this.nc.subscribe(subject, {
    //   callback: (err, msg) => {
    //     console.log(`[${sub.getProcessed()}]: ${msg.data}`, msg);
    //     // console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    //     // console.log('xxx', JSONCodec().decode(m.data)['message']);
    //   },
    // });
    (async () => {
      for await (const m of sub) {
        // console.log(`[${sub.getProcessed()}]: ${sub.getSubject()}`);
        // console.log(`[${sub.getProcessed()}]: ${m.data}`);
        // this.getNATSCallback(sub.getSubject())(StringCodec().decode(m.data));
        this.getNatsListener(sub.getSubject())?.natsCallback(m);
        if (callback) {
          callback(m);
        }
        // console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
        // console.log('xxx', JSONCodec().decode(m.data)['message']);
      }
      console.log('subscription closed');
    })();
  }

  async drain(subject: string) {
    await this.subscriptions.get(subject).drain();
  }

  async unsubscribe(subject: string) {
    this.subscriptions.get(subject).unsubscribe();
  }

  async publish(subject: string, message: any) {
    let codec;
    if (message instanceof String) {
      codec = StringCodec();
    } else {
      codec = JSONCodec();
    }
    this.nc.publish(subject, codec.encode(message));
  }

  async request(
    subject: string,
    message: any,
    callback?: (t: any, e?: any) => void,
  ) {
    let codec;
    if (message instanceof String) {
      codec = StringCodec();
    } else {
      codec = JSONCodec();
    }
    await this.nc
      .request(subject, codec.encode(message), { timeout: 1000 })
      .then((m) => {
        // console.log(`got response: ${codec.decode(m.data)}`);
        this.getNatsListener(subject)?.natsCallback(m);
        if (callback) {
          callback(m);
        }
      })
      .catch((err) => {
        // console.log(`problem with request: ${err.message}`);
        this.getNatsListener(subject)?.natsCallback(null, err);
        if (callback) {
          callback(null, err);
        }
      });
  }
}
