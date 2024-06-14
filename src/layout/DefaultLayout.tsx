import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useAppSelector } from '../hooks/useAppSelectorDitpatch';
import { Alert } from '../components/Alert';
import { IUSerMetadata } from '../interfaces/model/user_metadata';

const userDefault: IUSerMetadata = {
  id: '',
  name: '',
  displayName: '',
  totalBlogs: 0,
};

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userStates = useAppSelector((state) => state.user);
  const notiStates = useAppSelector((state) => state.notify);
  const authStates = useAppSelector((state) => state.auth);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {authStates.isLogin ? (
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isLogin={false}
              user={userStates.user ?? userDefault}
            />
          ) : (
            <></>
          )}

          <Alert notify={notiStates} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
