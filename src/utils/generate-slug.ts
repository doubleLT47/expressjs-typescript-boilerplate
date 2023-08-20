import randomString from "randomstring";
import slugify from "slugify";

export default function (text: string): string {
  return slugify(text) + "-" + randomString.generate(16);
}
