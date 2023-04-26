export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 4002, // need to change port for particular services
  MICROSERVICE_PORT: parseInt(process.env.MICROSERVICE_PORT, 10) || 4200,
  HOST: '0.0.0.0',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  AUTH_PUBLIC_KEY: process.env.PUBLIC_KEY,
  AUTH_KEY: {
    [process.env.PUBLIC_KEY]: process.env.PRIVATE_KEY,
  },
  AWS_CREDENTIALS: {
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    default_region: process.env.AWS_DEFAULT_REGION,
  },
  S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
  NATS_SERVER: [
    {
      servers: process.env.NATS_HOST,
      maxReconnectAttempts: 10,
      user: process.env.NATS_USERNAME,
      pass: process.env.NATS_PASSWORD,
    },
  ],
  NATS: {
    NATS_SUBSCRIBE_SUBJECT: process.env.NATS_SUBSCRIBE_SUBJECT
  },
  PG_DB_CONFIG: {
    dbuser: process.env.DB_DBUSER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: process.env.DB_SSL !== 'false' ? true : false,
    raw: true,
    logging: process.env.DB_LOGGING !== 'false' ? console.log : undefined,
  },
});
