import { IPostCategory } from "./post-category";
import { IPostComment } from "./post-comment";
import { IPostTag } from "./post-tag";
import { IUser } from "./user";

export interface IPost {
  id?: number;
  userId: number;
  title: string;
  metaTitle: string;
  slug: string; //unique
  description: string | null;
  content: string;
  thumb: string | null;
  published: boolean;
  publishedAt: Date | null;
  type: string; // default, event, news
  createdAt?: Date;
  updatedAt?: Date;
  postCategories?: IPostCategory[];
  postTags?: IPostTag[];
  comments?: IPostComment[];
  user?: IUser;
}
