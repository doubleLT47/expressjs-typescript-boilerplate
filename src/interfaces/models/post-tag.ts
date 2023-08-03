import { IPost } from "./post";
import { ITag } from "./tag";

export interface IPostTag {
  postId: number;
  tagId: number;
  post?: IPost;
  tag?: ITag;
}
