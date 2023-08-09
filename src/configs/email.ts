import { Transporter, createTransport } from "nodemailer";
import configs from "@configs/index";
const {
  email: {
    host,
    port,
    auth: { user, pass },
    email_from,
  },
} = configs;
class MailService {
  static instance: MailService;
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }

  public async send(
    to: string,
    subject: string,
    text: string,
    html: string | null = null,
    attachments:
      | {
          filename: string;
          content: Buffer;
        }[]
      | null = null
  ): Promise<void> {
    const info: any = {
      to,
      subject,
      text,
      from: email_from,
    };
    if (html) {
      info.html = html;
    }
    if (attachments) {
      info.attachments = attachments;
    }
    await this.transporter.sendMail(info);
  }

  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }
}

export default MailService.getInstance();
