import DefaultLayout from '../../layout/DefaultLayout';
import { useSearchParams } from 'react-router-dom';
import DeprecatedBlogs from './DeprecatedBlogs';
import AllBlogs from './AllBlogs';

const ManagementBlog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  var tab = searchParams.get('tab');
  if (!tab) {
    tab = 'all';
  }
  return (
    <DefaultLayout>
      <p className="text-2xl text-left font-bold">Blog</p>
      <div className="mt=3">
        <div className="py-2 px-3">
          <nav className="flex justify-start space-x-3">
            <a
              onClick={() => {
                searchParams.set('tab', 'all');
                setSearchParams();
              }}
              className={`${tab == 'all' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              All{' '}
            </a>

            <a
              onClick={() => {
                searchParams.set('tab', 'deprecated');
                setSearchParams();
              }}
              className={`${tab == 'deprecated' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              Deprecated{' '}
            </a>
          </nav>
        </div>
      </div>
      {renderComponentByTab(tab)}
    </DefaultLayout>
  );
};

export default ManagementBlog;

const renderComponentByTab = (tab: string) => {
  if (tab == 'deprecated') {
    return <DeprecatedBlogs />;
  } else {
    return <AllBlogs />;
  }
};
