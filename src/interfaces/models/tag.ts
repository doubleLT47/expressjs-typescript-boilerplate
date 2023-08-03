import { IPostTag } from "./post-tag";

export interface ITag {
  id?: number;
  title?: string;
  metaTitle?: string;
  slug: string;
  content: string | null;
  enable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  postTags?: IPostTag[];
}
