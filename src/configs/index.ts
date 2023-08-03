export default {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  mongo: {
    enable: process.env.MONGO_ENABLE,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  postgres: {
    enable: process.env.MONGO_ENABLE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
  },
  logger: {
    serviceName: process.env.SERVICE_NAME,
  },
  email: {
    enable: process.env.EMAIL_ENABLE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    email_from: process.env.EMAIL_FROM,
  },
  s3: {
    enable: process.env.S3_ENABLE,
    bucket: process.env.BUCKET,
    region: process.env.REGION,
    endpoint: process.env.ENDPOINT,
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_key: process.env.AWS_SECRET_KEY,
  },
  notification: {
    discord: {
      token: process.env.DISCORD_TOKEN,
      channelId: process.env.DISCORD_CHANNEL,
    },
    telegram: {},
  },
};
