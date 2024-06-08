import DefaultLayout from '../../layout/DefaultLayout';

const ManagementPolicy = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col">
        <p className="text-xl font-bold mb-10">Policy Management</p>
        <div className="">
          <div className="py-2 px-3">
            <nav className="flex justify-start">
              <a
                href="#"
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              >
                {' '}
                Account{' '}
              </a>

              <a
                href="#"
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              >
                {' '}
                Settings{' '}
              </a>

              <a
                href="#"
                className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out"
              >
                {' '}
                Orders{' '}
              </a>

              <a
                href="#"
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              >
                {' '}
                Sales{' '}
              </a>

              <a
                href="#"
                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
              >
                {' '}
                Suppliers{' '}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManagementPolicy;
