import Sequelize from "sequelize";
import user, { UserAssociated } from "./user";
import category, { CategoryAssociated } from "./category";
import navigation from "./navigation";
import postCategory, { PostCategoryAssociated } from "./post-category";
import postComment, { PostCommentAssociated } from "./post-comment";
import postTag, { PostTagAssociated } from "./post-tag";
import post, { PostAssociated } from "./post";
import role from "./role";
import tag, { TagAssociated } from "./tag";

export default (sequelize: Sequelize.Sequelize): void => {
  user(sequelize);
  category(sequelize);
  role(sequelize);
  tag(sequelize);
  navigation(sequelize);
  post(sequelize);
  postCategory(sequelize);
  postTag(sequelize);
  postComment(sequelize);

  UserAssociated();
  CategoryAssociated();
  TagAssociated();
  PostAssociated();
  PostTagAssociated();
  PostCategoryAssociated();
  PostCommentAssociated();
};
