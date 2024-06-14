import { useSearchParams } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import Policies from './Policies';

const ManagementPolicy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  var tab = searchParams.get('tab');
  if (!tab) {
    tab = 'policies';
  }
  return (
    <DefaultLayout>
      <p className="text-2xl text-left font-bold">Policy</p>
      <div className="mt=3">
        <div className="py-2 px-3">
          <nav className="flex justify-start space-x-3">
            <a
              onClick={() => {
                searchParams.set('tab', 'policies');
                setSearchParams();
              }}
              className={`${tab == 'policies' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              All{' '}
            </a>

            <a
              onClick={() => {
                searchParams.set('tab', 'violations');
                setSearchParams();
              }}
              className={`${tab == 'violation' ? 'border-b-purple-600 text-purple-600' : 'hover:border-b-purple-600 hover:text-purple-600'} text-center inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-semibold  transition-all duration-200 ease-in-out cursor-pointer`}
            >
              {' '}
              Violations{' '}
            </a>
          </nav>
        </div>
      </div>
      {renderComponentByTab(tab)}
    </DefaultLayout>
  );
};

const renderComponentByTab = (tab: string = 'all') => {
  if (tab == 'violations') {
    return <div></div>;
  } else {
    return <Policies />;
  }
};

export default ManagementPolicy;
