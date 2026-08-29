export interface TopComment extends CommentCreator {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment?: any;
  likes: any[];
  createdAt: string;
}
export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
