export interface INavigation {
  id?: number;
  parentId: number | null;
  title: string;
  metaTitle: string;
  slug: string;
  redirectLink: string | null;
  enable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
