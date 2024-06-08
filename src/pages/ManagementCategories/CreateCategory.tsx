interface Props {
  openPopUp: boolean;
  closePopUp: any;
}

const CreateCategory = ({ openPopUp, closePopUp }: Props) => {
  const handleButtonDissmis = () => {
    closePopUp();
  };

  if (openPopUp !== true) return null;

  return (
    <div className="fixed inset-0 z-99 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm">
      <div className="p-2 bg-white md:w-1/4 h-3/5 lg:1/2 shadow-inner border-e-emerald-600 rounded-lg py-5">
        <div className="w-full p-3 justify-center items-center">
          <h2 className="font-semibold py-3 text-center text-xl">
            Create Category
          </h2>
          <form>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
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
                  type="text"
                  placeholder="Enter your password"
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
                onClick={() => {}}
                value="Create"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
          {/* <div className="flex justify-center items-center">
            <button
              className="mt-3 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleButtonContinue();
              }}
            >
              Continue
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
