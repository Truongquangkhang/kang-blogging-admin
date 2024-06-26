import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { setNotify } from '../../redux/reducers/notify';
import ApiComment from '../../apis/kang-blogging/comment';
import { MapErrorResponse } from '../../utils/map_data_response';
import { AxiosError } from 'axios';

interface Props {
  comment_id: string;
  openPopUp: boolean;
  closePopUp: any;
  changeStatusComment: any;
}

const PopupSetCommentAsToxic = ({
  comment_id,
  openPopUp,
  closePopUp,
  changeStatusComment,
}: Props) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [toxicIndexes, setToxicIndexes] = useState<number[]>([]);
  //   const [highlight, setHighlight] = useState(Array(words.length).fill(0));
  const handleButtonDissmis = () => {
    closePopUp();
  };

  const handleButtonSubmit = () => {
    ApiComment.setCommentAsToxic(comment_id, {
      content: content,
      toxic_indexes: toxicIndexes,
    })
      .then(() => {
        handleButtonDissmis();
        changeStatusComment(comment_id, toxicIndexes.includes(1));
      })
      .catch((error) => {
        const e = MapErrorResponse((error as AxiosError).response);
        dispatch(
          setNotify({
            title: 'an occurred error',
            description: e.message,
            mustShow: true,
          }),
        );
      });
  };

  useEffect(() => {
    if (openPopUp) {
      ApiComment.getComment(comment_id)
        .then((rs) => {
          if (rs.data.data.content_processed) {
            var w = rs.data.data.content_processed?.split(' ');
            setContent(rs.data.data.content_processed);
            setWords(w);
          } else {
            var w = rs.data.data.comment.content?.split(' ');
            setContent(rs.data.data.comment.content);
            setWords(w);
          }

          if (rs.data.data.predictions.length > 0) {
            setToxicIndexes(rs.data.data.predictions);
          } else {
            setToxicIndexes(
              Array(rs.data.data.comment.content.split(' ').length).fill(0),
            );
          }
        })
        .catch((error) => {
          const e = MapErrorResponse((error as AxiosError).response);
          dispatch(
            setNotify({
              title: 'an occurred error',
              description: e.message,
              mustShow: true,
            }),
          );
        });
    }
  }, [openPopUp]);

  const handleWordClick = (index: number) => {
    const newHighlight = [...toxicIndexes];
    newHighlight[index] = newHighlight[index] ? 0 : 1;
    setToxicIndexes(newHighlight);
  };
  if (openPopUp !== true) return null;

  return (
    <div className="fixed inset-0 z-99 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm">
      <div className="p-2 bg-white md:w-1/4 h-3/5 lg:1/2 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="flex flex-col w-full h-full p-3 justify-between">
          <h2 className="font-semibold py-3 text-center text-xl">
            Make a comment as toxic
          </h2>
          <div className="flex flex-wrap max-w-full">
            {words.map((word, index) => (
              <span
                key={index}
                onClick={() => handleWordClick(index)}
                style={{
                  marginRight: '5px',
                  cursor: 'pointer',
                  backgroundColor: toxicIndexes[index]
                    ? 'yellow'
                    : 'transparent',
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex space-x-3 mb-5 mt-10">
            <input
              type="button"
              onClick={() => {
                handleButtonDissmis();
              }}
              value="Dissmis"
              className="w-full cursor-pointer rounded-lg border  bg-slate-400 p-4 text-white transition hover:bg-opacity-90"
            />
            <input
              type="button"
              onClick={() => {
                handleButtonSubmit();
              }}
              value="Create"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupSetCommentAsToxic;
