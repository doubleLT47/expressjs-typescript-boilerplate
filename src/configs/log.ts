import configs from "@configs/index";
import Slack from "@slack/bolt";
const { secret, token, channel } = configs.notification.slack;

class SlackLogging {
  static instance: SlackLogging;
  private app: Slack.App;

  constructor() {
    this.app = new Slack.App({
      signingSecret: secret,
      token: token,
    });
  }

  public async send(message: string, blocks: any) {
    return await this.app.client.chat.postMessage({
      token: String(token),
      channel: String(channel),
      text: message,
      blocks,
    });
  }

  static getInstance() {
    if (!SlackLogging.instance) {
      SlackLogging.instance = new SlackLogging();
    }
    return SlackLogging.instance;
  }
}

const slackInstance = SlackLogging.getInstance();

export default slackInstance;
