import DefaultLayout from '../../layout/DefaultLayout';
import ActiveComment from './ActiveComment';
import { useSearchParams } from 'react-router-dom';
import InactiveComment from './InactiveComment';

const ManagementComment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  var tab = searchParams.get('tab');
  if (!tab) {
    tab = 'active';
  }
  return (
    <DefaultLayout>
      <p className="text-2xl text-left font-bold">Comments</p>
      <div className="mt=3">
        <div className="py-2 px-3">
          <nav className="flex justify-start space-x-3">
            <a
              onClick={() => {
                searchParams.set('tab', 'active');
                setSearchParams();
              }}
              className={`${tab == 'active' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              Active{' '}
            </a>

            <a
              onClick={() => {
                searchParams.set('tab', 'inactive');
                setSearchParams();
              }}
              className={`${tab == 'inactive' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              Inactive{' '}
            </a>
          </nav>
        </div>
      </div>
      {renderComponentByTab(tab)}
    </DefaultLayout>
  );
};

const renderComponentByTab = (tab: string) => {
  if (tab == 'inactive') {
    return <InactiveComment />;
  } else {
    return <ActiveComment />;
  }
};

export default ManagementComment;
