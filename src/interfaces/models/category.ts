import { IPostCategory } from "./post-category";

export interface ICategory {
  id?: number;
  parentId: number | null;
  title: string;
  metaTitle: string;
  slug: string;
  content: string | null;
  enable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  postCategories?: IPostCategory[];
}
