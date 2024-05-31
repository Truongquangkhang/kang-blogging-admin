import { IComment } from '../../interfaces/model/comment';
import CommentDetail from './CommentDetail';

interface Prop {
  comments: IComment[];
}

const ListComment = (prop: Prop) => {
  return (
    <div className="flex flex-col space-y-3 w-full justify-center">
      {prop.comments.map((comment) => {
        return <CommentDetail key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default ListComment;
