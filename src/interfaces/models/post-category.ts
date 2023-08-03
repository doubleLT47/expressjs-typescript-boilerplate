import { ICategory } from "./category";
import { IPost } from "./post";

export interface IPostCategory {
  postId: number;
  categoryId: number;
  post?: IPost;
  category?: ICategory;
}
