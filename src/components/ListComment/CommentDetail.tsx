import { useNavigate } from 'react-router-dom';
import { IComment } from '../../interfaces/model/comment';
import { FormatRelativeTime } from '../../utils/convert';
import { truncateString } from '../../utils/string';

interface Prop {
  comment: IComment;
}

const CommentDetail = (prop: Prop) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start rounded-md  bg-white px-4 py-3">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
            src={prop.comment.user.avatar}
            alt="Simon Lewis"
          />
          <strong
            onClick={() => {
              navigate(`/user/${prop.comment.user.id}`);
            }}
            className="ml-3 block text-xs font-medium cursor-pointer hover:text-blue-900"
          >
            @{prop.comment.user.displayName}
          </strong>
        </div>
        <div className="flex-col space-y-1">
          <div></div>
          <p className="text-xs">
            {FormatRelativeTime(prop.comment.createdAt)}
          </p>
        </div>
      </div>
      <div className="p-2 ml-10 text-left">
        <strong>{truncateString(prop.comment.content, 180)}</strong>
      </div>
    </div>
  );
};

export default CommentDetail;
