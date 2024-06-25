import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';
import { setNotify } from '../../redux/reducers/notify';
import { NotifyType } from '../../interfaces/model/notify';
import ApiCategory from '../../apis/kang-blogging/category';

interface Props {
  openPopUp: boolean;
  closePopUp: any;
  categoryId: string;
  categoryName: string;
  editCategory: any;
}

const EditCategory = ({
  openPopUp,
  closePopUp,
  categoryId,
  categoryName,
  editCategory,
}: Props) => {
  const [name, setName] = useState(categoryName);
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const handleButtonDissmis = () => {
    closePopUp();
  };

  const handlerButtonCreate = () => {
    if (name == '' || description == '') {
      dispatch(
        setNotify({
          title: 'Missing required fields',
          description: '',
          mustShow: true,
          type: NotifyType.ERROR,
        }),
      );
    } else {
      ApiCategory.editCategory(categoryId, {
        name: name,
        description: description,
      })
        .then((rs) => {
          editCategory(rs.data.data.category);
          handleButtonDissmis();
        })
        .catch(() => {
          dispatch(
            setNotify({
              title: 'an occurred error',
              description: '',
              mustShow: true,
              type: NotifyType.ERROR,
            }),
          );
        });
    }
  };

  if (openPopUp !== true) return null;

  return (
    <div className="fixed inset-0 z-99 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm">
      <div className="p-2 bg-white md:w-1/4 h-3/5 lg:1/2 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="w-full p-3 justify-center items-center">
          <h2 className="font-semibold py-3 text-center text-xl">
            Edit Category
          </h2>
          <form>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Name
              </label>
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Description
              </label>
              <div className="relative">
                <input
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
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
                  handlerButtonCreate();
                }}
                value="Update"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
