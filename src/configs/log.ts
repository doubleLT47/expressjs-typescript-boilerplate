import configs from "@configs/index";
import { App } from "@slack/bolt";
const { secret, token, channel } = configs.notification.slack;

class SlackLogging {
  static instance: SlackLogging;
  private app: App;

  constructor() {
    this.app = new App({
      signingSecret: secret,
      token: token,
    });
  }

  public async send(message: string, blocks?: any) {
    return await this.app.client.chat.postMessage({
      token: token,
      channel: channel,
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

export default SlackLogging.getInstance();
