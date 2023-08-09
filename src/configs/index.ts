export default {
  app: {
    port: Number(process.env.PORT),
    env: String(process.env.NODE_ENV),
    secret: String(process.env.SECRET),
  },
  mongo: {
    enable: Boolean(process.env.MONGO_ENABLE),
    host: String(process.env.MONGO_HOST),
    port: Number(process.env.MONGO_PORT),
    name: String(process.env.MONGO_DATABASE),
    username: String(process.env.MONGO_USERNAME),
    password: String(process.env.MONGO_PASSWORD),
  },
  postgres: {
    enable: Boolean(process.env.POSTGRES_ENABLE),
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    name: String(process.env.POSTGRES_DATABASE),
    username: String(process.env.POSTGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
  },
  logger: {
    serviceName: String(process.env.SERVICE_NAME),
  },
  email: {
    enable: Boolean(process.env.EMAIL_ENABLE),
    host: String(process.env.EMAIL_HOST),
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: String(process.env.EMAIL_USERNAME),
      pass: String(process.env.EMAIL_PASSWORD),
    },
    email_from: String(process.env.EMAIL_FROM),
  },
  s3: {
    enable: Boolean(process.env.S3_ENABLE),
    bucket: String(process.env.BUCKET),
    region: String(process.env.REGION),
    aws_access_key: String(process.env.AWS_ACCESS_KEY),
    aws_secret_key: String(process.env.AWS_SECRET_KEY),
  },
  notification: {
    discord: {
      token: String(process.env.DISCORD_TOKEN),
      channelId: String(process.env.DISCORD_CHANNEL),
    },
    slack: {
      secret: String(process.env.SLACK_SIGNING_SECRET),
      token: String(process.env.SLACK_BOT_TOKEN),
      channel: String(process.env.SLACK_CHANNEL),
    },
  },
};
