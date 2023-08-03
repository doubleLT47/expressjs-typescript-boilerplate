import { IPost } from "./post";
import { IUser } from "./user";

export interface IPostComment {
  id?: number;
  postId: number;
  userId: number;
  parentId: number | null;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  post?: IPost;
  user?: IUser;
}
