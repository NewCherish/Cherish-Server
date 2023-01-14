require('dotenv').config();

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  sentryWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  sentryDsn: process.env.SENTRY_DSN,
});
