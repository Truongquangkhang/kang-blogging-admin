import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ManagementBlog from './pages/ManagementBlog/ManagementBlog';
import ManagementUser from './pages/ManagementUser/ManagementUser';
import ManagementComment from './pages/ManagementComment/ManagementComment';
import ManagementCategory from './pages/ManagementCategories/ManagementCategories';
import { useAppSelector } from './hooks/useAppSelectorDitpatch';
import LogOut from './pages/Authentication/LogOut';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const authStates = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            authStates.isLogin ? (
              <>
                <PageTitle title="eCommerce Dashboard " />
                <ECommerce />
              </>
            ) : (
              <>
                <Navigate to={'/auth/signin'} />
              </>
            )
          }
        />
        <Route
          path="/manage-blog"
          element={
            authStates.isLogin ? (
              <>
                <PageTitle title="Blogs Management " />
                <ManagementBlog />
              </>
            ) : (
              <>
                <Navigate to={'/auth/signin'} />
              </>
            )
          }
        />
        <Route
          path="/manage-user"
          element={
            authStates.isLogin ? (
              <>
                <PageTitle title="Users Management" />
                <ManagementUser />
              </>
            ) : (
              <>
                <Navigate to={'/auth/signin'} />
              </>
            )
          }
        />
        <Route
          path="/manage-comment"
          element={
            authStates.isLogin ? (
              <>
                <PageTitle title="Comments Management" />
                <ManagementComment />
              </>
            ) : (
              <>
                <Navigate to={'/auth/signin'} />
              </>
            )
          }
        />
        <Route
          path="/manage-category"
          element={
            authStates.isLogin ? (
              <>
                <PageTitle title="Categories Management" />
                <ManagementCategory />
              </>
            ) : (
              <>
                <Navigate to={'/auth/signin'} />
              </>
            )
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/logout"
          element={
            <>
              <PageTitle title="Logout " />
              <LogOut />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
